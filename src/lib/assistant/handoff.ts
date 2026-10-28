// Monta o link do WhatsApp com o resumo que o atendente preparou.
import { whatsappNumber } from '../../data/site.ts';

export type HandoffInput = {
  nome?: unknown;
  negocio?: unknown;
  necessidade?: unknown;
  solucao?: unknown;
};

export type Handoff = { url: string; summary: string };

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';

export function buildHandoff(input: HandoffInput): Handoff {
  const nome = clean(input.nome, 60);
  const negocio = clean(input.negocio, 120);
  const necessidade = clean(input.necessidade, 400) || 'Quero saber mais sobre as soluções.';
  const solucao = clean(input.solucao, 120);

  const lines = [
    'Olá, Pietro! Vim pelo site da PFC Soluções.',
    nome && `Nome: ${nome}`,
    negocio && `Negócio: ${negocio}`,
    `O que preciso: ${necessidade}`,
    solucao && `Solução de interesse: ${solucao}`,
  ].filter(Boolean);

  const summary = lines.join('\n');
  return { url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summary)}`, summary };
}
