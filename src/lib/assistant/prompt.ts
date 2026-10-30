// Instruções da marcIA. O que também está no site (soluções, etapas, dúvidas e
// dados) vem de src/data/site.ts; o contexto da empresa e as regras de negócio
// vêm de knowledge.ts.
import { about, assistant, brand, faq, process, solutions, warningSigns } from '../../data/site.ts';
import { aboutPage } from '../../data/institutional.ts';
import { company, conversationRules, howWeWork, solutionDetails } from './knowledge.ts';
import { oferta } from '../../data/barbearias.ts';

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
  const pilotText = `A PFC está abrindo ${p.vagas} vagas de clientes fundadores da ${oferta.nome}, para ${oferta.publico}. Fundadores têm valor abaixo do preço cheio e mensalidade travada por ${p.mesesTravados} meses; os valores não são publicados e só saem na proposta, então nunca informe números. Em troca, o cliente aceita ${p.contrapartida}. O que está incluso: ${oferta.inclui.join('; ')}. Prazo para entrar no ar: até ${oferta.prazoDias} dias depois da conversa de levantamento. Escopo, condições de cancelamento e custos do WhatsApp ficam escritos na proposta; não invente essas condições. Existe uma barbearia de demonstração para o visitante testar como cliente; ela está no botão da página Barbearias e salões (não escreva o endereço). Só fale do piloto quando o caso do visitante se encaixar nele.`;
  const faqText = faq.items.map((item) => `P: ${item.question}\nR: ${item.answer}`).join('\n\n');

  return `Você é a ${assistant.name}, ${assistant.role} da ${brand.fullName}, no chat do site da empresa.

# Seu objetivo
Entender o negócio e o problema do visitante, mostrar qual solução resolve e, quando ele quiser seguir, passar a conversa para o ${about.name.split(' ')[0]} pelo WhatsApp com um resumo pronto. Ninguém sai da conversa sem resposta.
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
      contexto: {
        type: 'string',
        description:
          'Detalhes úteis para o Pietro, em primeira pessoa: desde quando acontece, como resolve hoje, o que já tentou, o impacto. Use só o que a pessoa contou; não inclua dúvidas, suposições nem perguntas que ela não respondeu. Ex.: "Hoje respondo tudo à mão no WhatsApp e perco umas 3 clientes por semana."',
      },
    },
    required: ['necessidade'],
  },
} as const;
