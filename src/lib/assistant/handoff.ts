// Monta o link do WhatsApp com o resumo que o atendente preparou.
import { whatsappNumber } from '../../data/site.ts';

export type HandoffInput = {
  nome?: unknown;
  negocio?: unknown;
  necessidade?: unknown;
  contexto?: unknown;
  motivo?: unknown;
};

export type Handoff = { url: string; summary: string };

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';

// Garante ponto final, para o resumo ler como mensagem escrita pelo visitante.
const sentence = (text: string) => (/[.!?]$/.test(text) ? text : `${text}.`);

export function buildHandoff(input: HandoffInput): Handoff {
  const nome = clean(input.nome, 60);
  const negocio = clean(input.negocio, 120);
  const necessidade = clean(input.necessidade, 400) || 'Quero saber mais sobre as soluções.';
  const contexto = clean(input.contexto, 400);
  const motivo = clean(input.motivo, 200);

  // Um campo que só repete o que já foi dito não entra no resumo.
  const seen: string[] = [];
  const fresh = (text: string) => {
    const key = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
    if (!key || seen.some((s) => s.includes(key))) return '';
    seen.push(key);
    return sentence(text);
  };

  const lines = [
    'Olá, Pietro! Vim pelo site da PFC Soluções e conversei com a marcIA.',
    nome && `Meu nome é ${nome}.`,
    negocio && fresh(negocio),
    fresh(necessidade),
    contexto && fresh(contexto),
    motivo && fresh(motivo),
  ].filter(Boolean);

  const summary = lines.join('\n');
  return { url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summary)}`, summary };
}
