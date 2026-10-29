// Instruções da marcIA. O que também está no site (soluções, etapas, dúvidas e
// dados) vem de src/data/site.ts; o contexto da empresa e as regras de negócio
// vêm de knowledge.ts.
import { about, assistant, brand, faq, process, solutions, warningSigns } from '../../data/site.ts';
import { company, conversationRules, howWeWork, solutionDetails } from './knowledge.ts';

export const HANDOFF_TOOL = 'encaminhar_para_whatsapp';

export function systemPrompt(): string {
  const summaryText = solutions.items.map((s) => `- ${s.area}: ${s.title}. ${s.description}`).join('\n');
  const processText = process.steps.map((step, i) => `${i + 1}. ${step.title}: ${step.text}`).join('\n');
  const dataText = warningSigns.items.map((d) => `- ${d.stat} ${d.fact} (Fonte: ${d.source})`).join('\n');
  const faqText = faq.items.map((item) => `P: ${item.question}\nR: ${item.answer}`).join('\n\n');

  return `Você é a ${assistant.name}, ${assistant.role} da ${brand.fullName}, no chat do site da empresa.

# Seu objetivo
Entender o negócio e o problema do visitante, mostrar qual solução resolve e, quando ele quiser seguir, passar a conversa para o ${about.name.split(' ')[0]} pelo WhatsApp com um resumo pronto. Ninguém sai da conversa sem resposta.
${company}
# Quem está por trás
${about.name}: ${about.bio}
${howWeWork}
# Etapas, como aparecem no site
${processText}

# Soluções, como aparecem no site
${summaryText}
E o que mais o negócio precisar: cada projeto é feito sob medida.
${solutionDetails}
# Dados que você pode citar
Só estes números, no máximo um por mensagem, sempre com a fonte.
${dataText}

# Perguntas frequentes do site
${faqText}
${conversationRules}`;
}

export const handoffTool = {
  name: HANDOFF_TOOL,
  description:
    'Mostra ao visitante o botão que abre o WhatsApp do Pietro com um resumo da conversa. Use quando o visitante quiser fechar, pedir proposta, falar com uma pessoa ou tiver uma dúvida que você não pode responder. Escreva os campos em primeira pessoa, como se fosse o próprio visitante escrevendo, porque é ele quem envia a mensagem.',
  input_schema: {
    type: 'object',
    properties: {
      nome: { type: 'string', description: 'Nome do visitante, se ele informou.' },
      negocio: { type: 'string', description: 'O negócio do visitante, em primeira pessoa. Ex.: "Tenho uma barbearia com 2 cadeiras".' },
      necessidade: {
        type: 'string',
        description: 'O problema ou pedido, em primeira pessoa e em uma ou duas frases. Ex.: "Perco clientes porque não consigo responder o WhatsApp enquanto atendo."',
      },
      solucao: { type: 'string', description: 'Solução da PFC que mais combina, em poucas palavras. Ex.: "Agente de IA no WhatsApp".' },
    },
    required: ['necessidade'],
  },
} as const;
