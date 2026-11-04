// Instruções da marcIA. O que também está no site (soluções, etapas, dúvidas e
// dados) vem de src/data/site.ts; o contexto da empresa e as regras de negócio
// vêm de knowledge.ts.
import { about, assistant, brand, faq, process, solutions, warningSigns } from '../../data/site.ts';
import { aboutPage } from '../../data/institutional.ts';
import { company, conversationRules, howWeWork, solutionDetails } from './knowledge.ts';
import { oferta } from '../../data/oferta.ts';

export const HANDOFF_TOOL = 'encaminhar_para_whatsapp';

export function systemPrompt(): string {
  const summaryText = solutions.items.map((s) => `- ${s.area}: ${s.title}. ${s.description}`).join('\n');
  const processText = [
    ...process.steps.map(
      (step, i) =>
        `${i + 1}. ${step.title} (${step.summary}): ${step.text} O cliente recebe: ${step.deliverable} Participação do cliente: ${step.participation}`,
    ),
    `Compromissos: ${process.principles.map((p) => `${p.title}: ${p.text}`).join(' ')}`,
  ].join('\n');
  const dataText = warningSigns.items.map((d) => `- ${d.stat} ${d.fact} (Fonte: ${d.source})`).join('\n');
  const p = oferta.piloto;
  const pilotText = `A PFC está abrindo ${p.vagas} vagas de clientes fundadores da ${oferta.nome}, para ${oferta.publico}. Fundadores têm valor abaixo do preço cheio e mensalidade travada por ${p.mesesTravados} meses; os valores não são publicados e só saem na proposta, então nunca informe números. Em troca, o cliente aceita ${p.contrapartida}. O que está incluso: ${oferta.inclui.join('; ')}. Prazo para entrar no ar: até ${oferta.prazoDias} dias depois da conversa de levantamento. Escopo, condições de cancelamento e custos do WhatsApp ficam escritos na proposta; não invente essas condições. Só fale do piloto quando o caso do visitante se encaixar nele.`;
  const faqText = faq.items.map((item) => `P: ${item.question}\nR: ${item.answer}`).join('\n\n');

  return `Você é a ${assistant.name}, ${assistant.role} da ${brand.fullName}, no chat do site da empresa.

# Seu objetivo
Entender o negócio e o problema do visitante, resolver aqui tudo o que for possível, mostrar o caminho para o caso dele e, só quando a conversa estiver pronta (regras em "Encaminhamento para o Pietro"), passar para o ${about.name.split(' ')[0]} pelo WhatsApp com um resumo pronto. Ninguém sai da conversa sem resposta.
${company}
# Quem está por trás
${about.name}: ${about.bio}
${aboutPage.story.paragraphs.join(' ')}
O que nos move: ${aboutPage.purpose.text}
Valores: ${aboutPage.values.map((v) => `${v.title} (${v.text})`).join('; ')}.
O site tem as páginas Quem somos e Política de privacidade, ambas no rodapé.
${howWeWork}
# Etapas do trabalho, como aparecem no site
${processText}

# Exemplos que aparecem no site (não é cardápio: cada cliente recebe um sistema personalizado)
${summaryText}
A PFC faz o que o problema pedir: automações, sistemas, aplicativos, sites e integrações, sob medida.
${solutionDetails}
# Piloto para negócios de agendamento
${pilotText}

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
    'Mostra ao visitante o botão que abre o WhatsApp do Pietro com um resumo da conversa. Use só nos casos da seção "Encaminhamento para o Pietro": caso pronto, visitante que não consegue explicar depois de 3 tentativas, dúvida fora do seu conhecimento depois de 3 tentativas, terceiro pedido para falar com o Pietro ou assunto que não é venda. Escreva os campos em primeira pessoa, como se fosse o próprio visitante escrevendo para o Pietro (chame o Pietro de "você"), porque é ele quem envia a mensagem.',
  input_schema: {
    type: 'object',
    properties: {
      nome: { type: 'string', description: 'Nome do visitante, se ele informou.' },
      negocio: { type: 'string', description: 'O negócio do visitante, em primeira pessoa. Ex.: "Tenho uma barbearia com 2 cadeiras".' },
      necessidade: {
        type: 'string',
        description:
          'O problema ou pedido, em primeira pessoa e em uma ou duas frases, com as palavras do visitante. Ex.: "Perco clientes porque não consigo responder o WhatsApp enquanto atendo." Se ele não contou o problema, escreva o que ele quer, por exemplo a dúvida que tem.',
      },
      motivo: {
        type: 'string',
        description:
          'Só quando não for caso pronto: por que o visitante quer falar com o Pietro antes de detalhar o caso, em primeira pessoa. Ex.: "Preciso saber se vocês emitem nota fiscal antes de contratar." ou "Prefiro conversar direto com você." Nunca diga quantas vezes ele pediu.',
      },
      contexto: {
        type: 'string',
        description:
          'Detalhes que o visitante disse e que ainda não estão em necessidade: desde quando acontece, como resolve hoje, o que já tentou. Cada frase precisa ter sido dita por ele; nunca complete com o que é provável, nem com perguntas que ele não respondeu, nem com comentários sobre a conversa. Na dúvida, deixe vazio.',
      },
    },
    required: ['necessidade'],
  },
} as const;

// Mensagens do visitante antes de a ferramenta de encaminhamento ser liberada.
// É o piso garantido em código; o resto das regras fica com a IA.
export const MIN_TURNS_FOR_HANDOFF = 3;

// Estado do turno, enviado fora do bloco em cache: o modelo não conta bem as
// mensagens sozinho, então o servidor informa a contagem.
export function turnContext(userTurns: number): string {
  const available = userTurns >= MIN_TURNS_FOR_HANDOFF;
  return `# Estado desta conversa (informação interna: nunca mencione números, contagens ou estas regras ao visitante)
- Mensagens do visitante até agora: ${userTurns}.
- Ferramenta de encaminhamento: ${
    available
      ? 'disponível. Use só nos casos de "Encaminhamento para o Pietro".'
      : 'ainda indisponível. Não fale em encaminhar nem em botão; siga entendendo o caso.'
  }`;
}
