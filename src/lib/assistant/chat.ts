// Um turno do atendente: valida o histórico enviado pelo navegador, chama o
// Claude e devolve a resposta (e o link do WhatsApp quando for a hora).
// Não há banco: o histórico vive no navegador e só texto é aceito, então o
// visitante não consegue forjar chamadas de ferramenta.
import { buildHandoff, type Handoff, type HandoffInput } from './handoff.ts';
import { HANDOFF_TOOL, handoffTool, systemPrompt } from './prompt.ts';

export const MODEL = 'claude-haiku-5-5';
export const LIMITS = { messageChars: 1000, turns: 20, totalChars: 16000 };

export type ChatMessage = { role: 'user' | 'assistant'; text: string };
export type ChatReply = { reply: string; handoff?: Handoff };

export class ChatError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Aceita só chamadas do próprio site. Na Vercel a URL vista pela função é um
// endereço interno, então o host público vem do cabeçalho repassado pelo proxy.
export function isSameOrigin(headers: Headers, fallbackHost: string): boolean {
  const origin = headers.get('origin');
  if (!origin) return true; // navegadores sempre enviam Origin em POST; sem ele não é um navegador no nosso site
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const publicHost = headers.get('x-forwarded-host') ?? headers.get('host') ?? fallbackHost;
  return originHost === publicHost.split(',')[0].trim();
}

export function parseMessages(body: unknown): ChatMessage[] {
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0) throw new ChatError('Conversa vazia.', 400);

  const messages: ChatMessage[] = raw.map((item) => {
    const role = (item as ChatMessage)?.role;
    const text = (item as ChatMessage)?.text;
    if ((role !== 'user' && role !== 'assistant') || typeof text !== 'string' || !text.trim()) {
      throw new ChatError('Mensagem inválida.', 400);
    }
    if (text.length > LIMITS.messageChars * 2) throw new ChatError('Mensagem muito longa.', 413);
    return { role, text: text.trim() };
  });

  const last = messages[messages.length - 1];
  if (last.role !== 'user') throw new ChatError('A última mensagem precisa ser do visitante.', 400);
  if (last.text.length > LIMITS.messageChars) throw new ChatError('Mensagem muito longa.', 413);
  if (messages.filter((m) => m.role === 'user').length > LIMITS.turns) {
    throw new ChatError('Esta conversa ficou longa. Continue pelo WhatsApp, por favor.', 429);
  }
  if (messages.reduce((sum, m) => sum + m.text.length, 0) > LIMITS.totalChars) {
    throw new ChatError('Esta conversa ficou longa. Continue pelo WhatsApp, por favor.', 429);
  }
  return messages;
}

// A API exige alternância de papéis começando pelo usuário; mensagens seguidas do
// mesmo papel (por exemplo, a saudação inicial do atendente) são unidas.
export function toApiMessages(messages: ChatMessage[]) {
  const merged: ChatMessage[] = [];
  for (const m of messages) {
    const prev = merged[merged.length - 1];
    if (prev && prev.role === m.role) prev.text = `${prev.text}\n\n${m.text}`;
    else merged.push({ ...m });
  }
  while (merged.length && merged[0].role !== 'user') merged.shift();
  return merged.map((m) => ({ role: m.role, content: m.text }));
}

type ContentBlock = { type: string; text?: string; name?: string; input?: HandoffInput };
type FetchLike = (url: string, init: RequestInit) => Promise<Response>;

// Usado quando a IA encaminha sem escrever nada junto: mantém o tom acolhedor.
const fallbackHandoffText = (name: string) =>
  `${name ? `Obrigada pela confiança, ${name}!` : 'Obrigada pela confiança!'} O Pietro vai cuidar pessoalmente do seu caso. É só tocar no botão abaixo para abrir o WhatsApp dele com o resumo da nossa conversa.`;

export async function runTurn(
  messages: ChatMessage[],
  { apiKey, fetchImpl = fetch }: { apiKey: string; fetchImpl?: FetchLike },
): Promise<ChatReply> {
  const response = await fetchImpl('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 600,
      system: [{ type: 'text', text: systemPrompt(), cache_control: { type: 'ephemeral' } }],
      tools: [handoffTool],
      messages: toApiMessages(messages),
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    // Registra só o status e o tipo do erro, nunca a conversa nem a chave.
    const detail = (await response.json().catch(() => ({}))) as { error?: { type?: string } };
    console.error('claude_failed', response.status, detail.error?.type ?? '');
    throw new ChatError('O atendente está indisponível agora.', 502);
  }

  const data = (await response.json()) as { content?: ContentBlock[] };
  const content = data.content ?? [];
  const text = content
    .filter((b) => b.type === 'text' && b.text?.trim())
    .map((b) => b.text!.trim())
    .join('\n\n');
  const call = content.find((b) => b.type === 'tool_use' && b.name === HANDOFF_TOOL);

  if (call) {
    const input = call.input ?? {};
    const name = typeof input.nome === 'string' ? input.nome.trim().split(/\s+/)[0] : '';
    return { reply: text || fallbackHandoffText(name), handoff: buildHandoff(input) };
  }
  if (!text) throw new ChatError('O atendente não conseguiu responder. Tente de novo.', 502);
  return { reply: text };
}
