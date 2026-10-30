// Página do nicho de entrada: barbearias, salões e quem vive de agenda.
// Preços e vagas do piloto ficam em `oferta`; a marcIA lê este mesmo arquivo,
// então mudar um valor aqui muda o que ela responde. Confira antes de publicar.

export const demoUrl = 'https://secretaria-virtual-ten.vercel.app/a/demo';

export const oferta = {
  nome: 'Secretária marcIA',
  publico: 'barbearias, salões, estúdios de estética e personal trainers',
  // Valores do piloto de clientes fundadores. Revise com os custos reais
  // (WhatsApp, IA e hospedagem) e as horas de implantação antes do merge.
  piloto: {
    vagas: 5,
    implantacao: 497,
    implantacaoCheia: 697,
    mensalidade: 197,
    mensalidadeCheia: 247,
    mesesTravados: 6,
    contrapartida:
      'autorizar o uso dos números do relatório de 30 dias e, se estiver satisfeito, dar um depoimento',
  },
  prazoDias: 7,
  inclui: [
    'Atendimento por IA no WhatsApp, com o nome e o tom que você escolher',
    'Agenda online que só mostra horários em que o serviço inteiro cabe',
    'Marca, remarca e cancela na agenda real, sem dois clientes no mesmo horário',
    'Pix do sinal enviado na conversa',
    'Lembrete na véspera e horas antes, com botão para confirmar',
    'Encaixe oferecido à fila de espera quando alguém desmarca',
    'Relatório mensal: mensagens atendidas, agendamentos fora do horário, faltas e encaixes',
    'Até 2 ajustes por mês em serviços, preços, horários e respostas',
  ],
};

export const reais = (valor: number) => `R$ ${valor.toLocaleString('pt-BR')}`;

export const nichoPage = {
  meta: {
    title: 'Secretária marcIA para barbearias e salões | PFC Soluções',
    description:
      'Atendimento com IA no WhatsApp para barbearias e salões: responde na hora, marca na sua agenda, cobra o sinal por Pix e lembra o cliente.',
  },
  intro: {
    eyebrow: 'Para barbearias, salões e quem vive de agenda',
    title: 'Sua barbearia atendendo e agendando no WhatsApp, até de madrugada.',
    lead: 'A marcIA responde na hora, marca na sua agenda, cobra o sinal por Pix e lembra o cliente. Você cuida do corte.',
    demoCta: 'Testar como se eu fosse cliente',
    demoNote: 'Abre uma barbearia de demonstração, com horários de verdade. Peça um corte para amanhã.',
  },
  perdas: {
    eyebrow: 'Onde o dinheiro escapa',
    title: 'Três perdas que você já conhece',
    items: [
      {
        titulo: 'A mensagem respondida tarde',
        texto: 'Você está com a máquina na mão, o cliente chama, ninguém responde. Quando você vê, ele já marcou em outro lugar.',
      },
      {
        titulo: 'A cadeira vazia',
        texto: 'O cliente marca, esquece e não aparece. O horário não volta e ninguém foi avisado da vaga.',
      },
      {
        titulo: 'O pedido fora do horário',
        texto: 'Muita gente decide cortar o cabelo à noite ou no domingo. Se a agenda só funciona quando você responde, esse cliente fica para depois.',
      },
    ],
  },
  passos: {
    eyebrow: 'Como funciona',
    title: 'Em funcionamento em até 7 dias',
    items: [
      'Conversa de 20 minutos sobre a sua rotina: serviços, horários, regra de sinal e como você gosta de falar com o cliente.',
      'Configuramos com os seus serviços, preços e horários.',
      'Você e três clientes de confiança testam antes de divulgar para todos.',
      'Entra no ar com texto pronto para o seu status e acompanhamento no primeiro mês.',
    ],
  },
  incluso: {
    eyebrow: 'O que está incluso',
    title: 'Tudo o que a secretária faz por você',
  },
  piloto: {
    eyebrow: 'Clientes fundadores',
    title: 'Piloto com valor de fundador',
    lead: 'Estamos abrindo poucas vagas porque cada implantação é feita pessoalmente pelo Pietro.',
    cta: 'Quero uma vaga de fundador',
  },
  faq: [
    {
      question: 'Funciona com o meu número de WhatsApp?',
      answer:
        'Sim, a secretária atende no número do seu negócio. No levantamento, o Pietro explica o que precisa para conectar o seu número.',
    },
    {
      question: 'Meus clientes vão perceber que é IA?',
      answer:
        'Ela se apresenta como atendimento automático e conversa em linguagem natural. Quando o cliente pede algo que ela não resolve, ela passa para você com o resumo da conversa.',
    },
    {
      question: 'E se a IA responder algo errado?',
      answer:
        'Ela só responde com as informações do seu negócio e segue as regras que você definir. No check-in da primeira semana, ajustamos qualquer resposta que você não tenha gostado.',
    },
    {
      question: 'Posso cancelar?',
      answer:
        'Sim. A mensalidade cobre o funcionamento e os ajustes do mês. As condições de cancelamento ficam escritas na proposta antes de você decidir.',
    },
    {
      question: 'Tem custo do WhatsApp à parte?',
      answer:
        'O que estiver incluso e o que não estiver fica claro na proposta, antes de começar. Sem surpresa na fatura.',
    },
    {
      question: 'Não é barbearia. Serve para mim?',
      answer:
        'Se o seu negócio vive de horário marcado (salão, manicure, estética, personal trainer), serve. Se o seu caso for diferente, a PFC desenha um sistema sob medida.',
    },
  ],
};
