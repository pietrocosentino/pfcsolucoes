// Testes do atendente com a API do Claude simulada (não precisa de chave nem de rede).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ChatError, isSameOrigin, parseMessages, runTurn, toApiMessages } from '../src/lib/assistant/chat.ts';
import { buildHandoff } from '../src/lib/assistant/handoff.ts';
import { systemPrompt } from '../src/lib/assistant/prompt.ts';
import { allowRequest } from '../src/lib/assistant/rate-limit.ts';

// Três mensagens do visitante: a partir daqui o encaminhamento pode ser liberado.
const threeTurns = [
  { role: 'user' as const, text: 'Tenho um salão' },
  { role: 'assistant' as const, text: 'Que legal! O que mais te toma tempo hoje?' },
  { role: 'user' as const, text: 'Minhas clientes faltam muito' },
  { role: 'assistant' as const, text: 'Entendi. Quer que eu prepare isso para o Pietro?' },
];

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
  const out = await runTurn([...threeTurns, { role: 'user', text: 'Tenho uma barbearia' }], { apiKey: 'teste', fetchImpl });
  assert.deepEqual(out, { reply: 'Legal! Quantos clientes por dia?' });
  assert.equal(calls[0].tools[0].name, 'encaminhar_para_whatsapp');
  assert.match(calls[0].system[0].text, /Nunca invente preço/);
  assert.match(calls[0].system[1].text, /Mensagens do visitante até agora: 3/);
});

test('quando o Claude encaminha, devolve o link do WhatsApp com o resumo', async () => {
  const { fetchImpl } = fakeClaude([
    { type: 'text', text: 'Toque no botão abaixo.' },
    { type: 'tool_use', id: 't1', name: 'encaminhar_para_whatsapp', input: { nome: 'Ana', negocio: 'Tenho um salão', necessidade: 'Minhas clientes faltam muito', contexto: 'Hoje anoto tudo num caderno' } },
  ]);
  const out = await runTurn([...threeTurns, { role: 'user', text: 'Quero fechar' }], { apiKey: 'teste', fetchImpl });
  assert.equal(out.reply, 'Toque no botão abaixo.');
  assert.ok(out.handoff?.url.startsWith('https://wa.me/5511984597523?text='));
  assert.match(decodeURIComponent(out.handoff!.url), /conversei com a marcIA\.\nMeu nome é Ana\.\nTenho um salão\.\nMinhas clientes faltam muito\.\nHoje anoto tudo num caderno\./);
});

test('erro da API vira mensagem amigável', async () => {
  const { fetchImpl } = fakeClaude([], 529);
  await assert.rejects(runTurn([{ role: 'user', text: 'oi' }], { apiKey: 'teste', fetchImpl }), (e: ChatError) => e.status === 502);
});

test('resumo do WhatsApp ignora campos vazios e corta textos longos', () => {
  const { summary } = buildHandoff({ necessidade: 'x'.repeat(900), nome: 42 });
  assert.doesNotMatch(summary, /Meu nome/);
  assert.ok(summary.length < 500);
});

test('instruções trazem todas as soluções do site', () => {
  const prompt = systemPrompt();
  for (const area of ['Atendimento', 'Agenda', 'Finanças', 'Presença online']) assert.match(prompt, new RegExp(area));
  assert.match(prompt, /Harvard Business Review/);
  assert.match(prompt, /Você é a marcIA/);
  for (const rule of ['Nunca deixe o visitante sem resposta', 'Nunca cite nomes de clientes', 'Quanto custa?', 'Nome cedo', 'Valide a dor', 'NÃO é um cardápio', 'Escute antes de propor', 'Nunca liste opções']) {
    assert.ok(prompt.includes(rule), rule);
  }
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

test('encaminhamento sem texto da IA usa mensagem calorosa com o nome', async () => {
  const { fetchImpl } = fakeClaude([
    { type: 'tool_use', id: 't1', name: 'encaminhar_para_whatsapp', input: { nome: 'Roberto Silva', necessidade: 'Organizar a oficina' } },
  ]);
  const out = await runTurn([...threeTurns, { role: 'user', text: 'Pode passar pro Pietro' }], { apiKey: 'teste', fetchImpl });
  assert.match(out.reply, /^Obrigada pela confiança, Roberto!/);
  assert.match(out.reply, /cuidar pessoalmente/);
});

test('a marcIA conhece o piloto, mas não informa valores', () => {
  const text = systemPrompt();
  assert.match(text, /Piloto para negócios de agendamento/);
  assert.match(text, /nunca informe números/);
  // O único valor público é o do site simples; nenhum outro preço aparece nas instruções.
  const prices = text.match(/R\$\s?\d{1,3}(?:\.\d{3})*(?:,\d{2})?/g) ?? [];
  assert.ok(prices.length > 0 && prices.every((p) => p === 'R$ 1.500'), prices.join(', '));
  assert.match(text, /Nunca invente preço/);
});

test('nas duas primeiras mensagens não há como encaminhar, nem se a IA tentar', async () => {
  const { calls, fetchImpl } = fakeClaude([
    { type: 'text', text: 'Entendo! Me conta rapidinho qual é o seu negócio?' },
    { type: 'tool_use', id: 't1', name: 'encaminhar_para_whatsapp', input: { necessidade: 'Falar com o Pietro' } },
  ]);
  const out = await runTurn([{ role: 'user', text: 'Quero falar com uma pessoa' }], { apiKey: 'teste', fetchImpl });
  assert.equal(calls[0].tools, undefined);
  assert.match(calls[0].system[1].text, /ainda indisponível/);
  assert.equal(out.handoff, undefined);
  assert.equal(out.reply, 'Entendo! Me conta rapidinho qual é o seu negócio?');
});

test('regras de encaminhamento: só depois de 3 tentativas e sem oferecer o Pietro cedo', () => {
  const prompt = systemPrompt();
  for (const rule of [
    'Encaminhamento para o Pietro',
    'pelo menos 3 tentativas',
    'pelo menos 3 vezes',
    'Nunca ofereça falar com o Pietro por iniciativa sua',
    'Perguntas que você não tem como responder',
  ]) {
    assert.ok(prompt.includes(rule), rule);
  }
  assert.doesNotMatch(prompt, /encaminhe na hora/);
  assert.doesNotMatch(prompt, /quando o cliente quiser/);
});

test('o motivo do encaminhamento entra no resumo do WhatsApp', () => {
  const { summary } = buildHandoff({ nome: 'Carla', necessidade: 'Quero saber se vocês emitem nota fiscal', motivo: 'Sem nota não consigo contratar' });
  assert.match(summary, /Quero saber se vocês emitem nota fiscal\.\nSem nota não consigo contratar\./);
});

test('estado do turno avisa que a contagem é interna', async () => {
  const { calls, fetchImpl } = fakeClaude([{ type: 'text', text: 'Oi!' }]);
  await runTurn([{ role: 'user', text: 'oi' }], { apiKey: 'teste', fetchImpl });
  assert.match(calls[0].system[1].text, /nunca mencione/);
});

test('resposta vazia da IA é tentada de novo antes de virar erro', async () => {
  let n = 0;
  const fetchImpl = async () => {
    n++;
    const content = n === 1 ? [] : [{ type: 'text', text: 'Oi! Como posso te chamar?' }];
    return new Response(JSON.stringify({ content, stop_reason: 'end_turn' }), { status: 200 });
  };
  const out = await runTurn([{ role: 'user', text: 'oi' }], { apiKey: 'teste', fetchImpl });
  assert.equal(n, 2);
  assert.equal(out.reply, 'Oi! Como posso te chamar?');
});

test('duas respostas vazias seguidas viram erro amigável', async () => {
  const { fetchImpl } = fakeClaude([]);
  await assert.rejects(runTurn([{ role: 'user', text: 'oi' }], { apiKey: 'teste', fetchImpl }), (e: ChatError) => e.status === 502);
});

test('encaminhamento sem pedido pede o resumo de novo, obrigando a ferramenta', async () => {
  const replies = [
    [{ type: 'tool_use', id: 't1', name: 'encaminhar_para_whatsapp', input: { nome: 'Carla' } }],
    [{ type: 'tool_use', id: 't2', name: 'encaminhar_para_whatsapp', input: { nome: 'Carla', necessidade: 'Preciso saber se vocês emitem nota fiscal' } }],
  ];
  const bodies: any[] = [];
  const fetchImpl = async (_u: string, init: RequestInit) => {
    bodies.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify({ content: replies[bodies.length - 1], stop_reason: 'tool_use' }), { status: 200 });
  };
  const out = await runTurn([...threeTurns, { role: 'user', text: 'Sem nota não consigo contratar' }], { apiKey: 'teste', fetchImpl });
  assert.deepEqual(bodies[1].tool_choice, { type: 'tool', name: 'encaminhar_para_whatsapp' });
  assert.match(out.handoff!.summary, /Meu nome é Carla\.\nPreciso saber se vocês emitem nota fiscal\./);
});

test('se nem a segunda chamada preencher o pedido, usa as palavras do visitante', async () => {
  const { fetchImpl } = fakeClaude([{ type: 'tool_use', id: 't1', name: 'encaminhar_para_whatsapp', input: { nome: 'Carla' } }]);
  const out = await runTurn([...threeTurns, { role: 'user', text: 'Sem nota fiscal não consigo contratar' }], { apiKey: 'teste', fetchImpl });
  assert.match(out.handoff!.summary, /Sem nota fiscal não consigo contratar\./);
  assert.doesNotMatch(out.handoff!.summary, /Quero saber mais sobre as soluções/);
});

test('resposta cortada no meio é tentada de novo', async () => {
  let n = 0;
  const fetchImpl = async () => {
    n++;
    const body = n === 1 ? { content: [{ type: 'text', text: 'Car' }], stop_reason: 'max_tokens' } : { content: [{ type: 'text', text: 'Carla, me conta mais?' }], stop_reason: 'end_turn' };
    return new Response(JSON.stringify(body), { status: 200 });
  };
  const out = await runTurn([{ role: 'user', text: 'oi' }], { apiKey: 'teste', fetchImpl });
  assert.equal(out.reply, 'Carla, me conta mais?');
});

test('resumo não repete o mesmo texto em dois campos', () => {
  const { summary } = buildHandoff({
    necessidade: 'Preciso saber se vocês emitem nota fiscal antes de contratar',
    motivo: 'Preciso saber se vocês emitem nota fiscal antes de contratar.',
  });
  assert.equal(summary.match(/nota fiscal/g)?.length, 1);
});
