// Endpoint do atendente de IA. Roda como função na Vercel; o resto do site é estático.
import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { ChatError, parseMessages, runTurn } from '../../lib/assistant/chat.ts';
import { allowRequest } from '../../lib/assistant/rate-limit.ts';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const POST: APIRoute = async ({ request, url, clientAddress }) => {
  // Só aceita chamadas do próprio site.
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== url.host) return json({ error: 'Origem não permitida.' }, 403);

  const apiKey = getSecret('ANTHROPIC_API_KEY');
  if (!apiKey) return json({ error: 'O atendente ainda não foi ativado.', offline: true }, 503);

  if (!allowRequest(clientAddress || 'desconhecido')) {
    return json({ error: 'Muitas mensagens seguidas. Espere alguns minutos ou continue pelo WhatsApp.' }, 429);
  }

  try {
    const body = await request.json().catch(() => null);
    const messages = parseMessages(body);
    return json(await runTurn(messages, { apiKey }));
  } catch (error) {
    if (error instanceof ChatError) return json({ error: error.message }, error.status);
    console.error('chat_failed', error instanceof Error ? error.name : 'unknown');
    return json({ error: 'O atendente está indisponível agora.' }, 500);
  }
};
