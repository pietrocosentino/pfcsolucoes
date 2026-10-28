// Testes do atendente com a API do Claude simulada (não precisa de chave nem de rede).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ChatError, isSameOrigin, parseMessages, runTurn, toApiMessages } from '../src/lib/assistant/chat.ts';
import { buildHandoff } from '../src/lib/assistant/handoff.ts';
import { systemPrompt } from '../src/lib/assistant/prompt.ts';
import { allowRequest } from '../src/lib/assistant/rate-limit.ts';

const fakeClaude = (content: unknown[], status = 200) => {
  const calls: any[] = [];
  const fetchImpl = async (_url: string, init: RequestInit) => {
    calls.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify(status === 200 ? { content } : { error: { type: 'overloaded_error' } }), { status });
  };
  return { calls, fetchImpl };
};

test('aceita só texto e exige que a última mensagem seja do visitante', () => {
  assert.throws(() => parseMessages({ messages: [] }), ChatError);
  assert.throws(() => parseMessages({ messages: [{ role: 'assistant', text: 'oi' }] }), /última mensagem/);
  assert.throws(() => parseMessages({ messages: [{ role: 'system', text: 'x' }] }), /inválida/);
  assert.throws(() => parseMessages({ messages: [{ role: 'user', text: 'a'.repeat(1001) }] }), /longa/);
  assert.deepEqual(parseMessages({ messages: [{ role: 'user', text: ' oi ' }] }), [{ role: 'user', text: 'oi' }]);
});

test('limita o tamanho da conversa', () => {
  const many = Array.from({ length: 41 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', text: 'oi' }));
  assert.throws(() => parseMessages({ messages: many }), (e: ChatError) => e.status === 429);
});

test('a saudação inicial do atendente não quebra a alternância exigida pela API', () => {
  const api = toApiMessages([
    { role: 'assistant', text: 'Oi! Qual é o seu negócio?' },
    { role: 'user', text: 'Tenho uma barbearia' },
  ]);
  assert.deepEqual(api, [{ role: 'user', content: 'Tenho uma barbearia' }]);
});

test('responde com o texto do Claude e envia instruções e ferramenta', async () => {
  const { calls, fetchImpl } = fakeClaude([{ type: 'text', text: 'Legal! Quantos clientes por dia?' }]);
  const out = await runTurn([{ role: 'user', text: 'Tenho uma barbearia' }], { apiKey: 'teste', fetchImpl });
  assert.deepEqual(out, { reply: 'Legal! Quantos clientes por dia?' });
  assert.equal(calls[0].tools[0].name, 'encaminhar_para_whatsapp');
  assert.match(calls[0].system[0].text, /Nunca invente preço/);
});

test('quando o Claude encaminha, devolve o link do WhatsApp com o resumo', async () => {
  const { fetchImpl } = fakeClaude([
    { type: 'text', text: 'Toque no botão abaixo.' },
    { type: 'tool_use', id: 't1', name: 'encaminhar_para_whatsapp', input: { nome: 'Ana', negocio: 'Salão', necessidade: 'Agenda online' } },
  ]);
  const out = await runTurn([{ role: 'user', text: 'Quero fechar' }], { apiKey: 'teste', fetchImpl });
  assert.equal(out.reply, 'Toque no botão abaixo.');
  assert.ok(out.handoff?.url.startsWith('https://wa.me/5511984597523?text='));
  assert.match(decodeURIComponent(out.handoff!.url), /Nome: Ana\nNegócio: Salão\nO que preciso: Agenda online/);
});

test('erro da API vira mensagem amigável', async () => {
  const { fetchImpl } = fakeClaude([], 529);
  await assert.rejects(runTurn([{ role: 'user', text: 'oi' }], { apiKey: 'teste', fetchImpl }), (e: ChatError) => e.status === 502);
});

test('resumo do WhatsApp ignora campos vazios e corta textos longos', () => {
  const { summary } = buildHandoff({ necessidade: 'x'.repeat(900), nome: 42 });
  assert.doesNotMatch(summary, /Nome:/);
  assert.ok(summary.length < 500);
});

test('instruções trazem todas as soluções do site', () => {
  const prompt = systemPrompt();
  for (const area of ['Atendimento', 'Agenda', 'Finanças', 'Presença online']) assert.match(prompt, new RegExp(area));
  assert.match(prompt, /Harvard Business Review/);
});

test('limite por aparelho bloqueia excesso de mensagens', () => {
  const now = 1_000_000;
  for (let i = 0; i < 30; i++) assert.equal(allowRequest('ip-teste', now), true);
  assert.equal(allowRequest('ip-teste', now), false);
  assert.equal(allowRequest('ip-teste', now + 11 * 60 * 1000), true);
});

test('aceita o próprio site atrás do proxy da Vercel e recusa outros sites', () => {
  const site = new Headers({ origin: 'https://pfcsolucoes.vercel.app', 'x-forwarded-host': 'pfcsolucoes.vercel.app' });
  assert.equal(isSameOrigin(site, 'localhost'), true); // host interno diferente não importa
  const other = new Headers({ origin: 'https://outro-site.com', 'x-forwarded-host': 'pfcsolucoes.vercel.app' });
  assert.equal(isSameOrigin(other, 'localhost'), false);
  assert.equal(isSameOrigin(new Headers({ origin: 'lixo' }), 'localhost'), false);
});
