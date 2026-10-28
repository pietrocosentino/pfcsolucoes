// Todo o texto do site fica aqui. Para mudar um título, um serviço ou uma
// pergunta, edite este arquivo; os componentes só cuidam da apresentação.

export const brand = {
  name: 'PFC Soluções',
  fullName: 'PFC Soluções em Tecnologia',
  tagline: 'Soluções em Tecnologia',
  description:
    'Sistemas sob medida para autônomos e pequenas empresas: agente de IA no WhatsApp, agendamento online, controle financeiro e sites profissionais.',
  shareText: 'Seu negócio atende, agenda e cobra mesmo quando você está ocupado.',
};

// O número e o @ ficam só nos links; não aparecem no texto do site.
const whatsappNumber = '5511984597523';
const whatsappMessage = 'Olá! Vim pelo site da PFC Soluções e quero saber mais.';

export const contact = {
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  instagramProfile: 'https://www.instagram.com/pfc.solucoes/',
  instagramDirect: 'https://ig.me/m/pfc.solucoes',
  ctaLabel: 'Chamar no direct',
};

export const navigation = [
  { href: '#solucoes', label: 'Soluções' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#duvidas', label: 'Dúvidas' },
];

export const hero = {
  eyebrow: 'Tecnologia para autônomos e pequenas empresas',
  title: 'Seu negócio atende, agenda e cobra',
  highlight: 'mesmo quando você está ocupado.',
  lead: 'Criamos sistemas sob medida que cuidam do trabalho repetitivo: atendimento no WhatsApp, agenda, finanças e site. Você fica livre para se dedicar aos seus clientes.',
  note: 'Conversa inicial sem compromisso.',
};

export type ChatMessage = { from: 'cliente' | 'agente'; text: string; tag?: string };

export const chat = {
  title: 'Agente de IA',
  status: 'responde na hora',
  time: 'Terça, 23:14',
  note: 'Exemplo de conversa com dados fictícios',
  summary:
    'Exemplo de conversa: às 23h14, um cliente pede horário pelo WhatsApp e o agente de IA agenda, envia o Pix do sinal e avisa que vai lembrar o cliente.',
  messages: [
    { from: 'cliente', text: 'Oi! Dá pra amanhã depois das 18?' },
    { from: 'agente', text: 'Tenho 18h30 ou 19h15 para corte e barba. Qual fica melhor?' },
    { from: 'cliente', text: '18h30' },
    {
      from: 'agente',
      text: 'Pronto, reservado para amanhã às 18h30. Para confirmar, é só pagar o sinal pelo Pix.',
      tag: 'Pix copia e cola enviado',
    },
    { from: 'agente', text: 'Te lembro amanhã, duas horas antes.' },
  ] satisfies ChatMessage[],
};

export const warningSigns = {
  eyebrow: 'Sinais de alerta',
  title: '4 sinais de que o seu negócio está perdendo dinheiro',
  lead: 'Quantos você reconhece?',
  items: [
    { sign: 'Cliente fica sem resposta depois do expediente.', cost: 'Ele fecha com o concorrente.' },
    { sign: 'Agenda no caderno e cliente que esquece o horário.', cost: 'Cada horário vazio é dinheiro que não volta.' },
    { sign: 'No fim do mês, você não sabe quanto sobrou.', cost: 'Você decide no escuro.' },
    { sign: 'Seu negócio não aparece quando alguém procura.', cost: 'O cliente nem chega até você.' },
  ],
  closing: 'Reconheceu algum? Tem solução.',
};

export type Solution = {
  area: string;
  title: string;
  description: string;
  features: string[];
  project: string;
};

export const solutions = {
  eyebrow: 'Soluções e projetos',
  title: 'Um sistema para cada problema',
  lead: 'Cada solução nasceu de um problema real de quem trabalha sozinho ou tem uma equipe pequena.',
  closing: 'E o que mais o seu negócio precisar.',
  items: [
    {
      area: 'Atendimento',
      title: 'Nenhum cliente fica sem resposta',
      description: 'Um agente de IA no WhatsApp que entende o cliente em linguagem natural e cuida da agenda por você.',
      features: [
        'Marca, remarca e cancela na agenda real',
        'Envia o Pix do sinal e lembra o cliente antes do horário',
        'Oferece encaixes quando alguém desmarca',
      ],
      project: 'Agente de IA que atende e agenda pelo WhatsApp',
    },
    {
      area: 'Agenda',
      title: 'Sua agenda se preenche sozinha',
      description: 'Uma página de agendamento só sua, onde o cliente escolhe serviço e horário pelo celular.',
      features: [
        'Mostra só os horários em que o atendimento inteiro cabe',
        'Nunca deixa dois clientes no mesmo horário',
        'Avisa você pelo WhatsApp com mensagem pronta',
      ],
      project: 'Agenda online para barbearia',
    },
    {
      area: 'Finanças',
      title: 'Você sabe quanto sobra no mês',
      description: 'Um aplicativo para Android e iPhone que organiza entradas e saídas sem planilha complicada.',
      features: [
        'Contas recorrentes com lembrete',
        'Importação de lançamentos a partir de planilha Excel',
        'Entradas previstas e despesas com confirmação',
      ],
      project: 'App de finanças para Android e iPhone',
    },
    {
      area: 'Presença online',
      title: 'Quem procura, encontra você',
      description: 'Um site rápido, que funciona bem no celular e leva o visitante direto até o seu contato.',
      features: [
        'Serviços, planos e depoimentos',
        'Botões de contato com mensagem pronta',
        'Conteúdo fácil de atualizar',
      ],
      project: 'Site de consultoria para personal trainer',
    },
  ] satisfies Solution[],
};

export const process = {
  eyebrow: 'Como funciona',
  title: 'Do seu problema à solução funcionando',
  lead: 'Antes de escrever qualquer linha de código, entendemos como o seu negócio funciona hoje.',
  steps: [
    { title: 'Levantamento', text: 'Ouvimos o seu problema e entendemos a sua rotina.' },
    { title: 'Análise', text: 'Encontramos onde estão as perdas e o que pode ser automatizado.' },
    { title: 'Processo', text: 'Desenhamos o fluxo ideal para o seu negócio. Nada de pacote pronto.' },
    { title: 'Solução', text: 'Entregamos o sistema funcionando e acompanhamos o uso.' },
  ],
};

export const about = {
  eyebrow: 'Quem está por trás',
  name: 'Pietro Cosentino',
  bio: 'Analista de requisitos, de sistemas e funcional sênior, com experiência em educação, pagamentos e sistemas corporativos. A PFC Soluções leva esse olhar de negócio para quem não tem um time de tecnologia.',
  portfolio: { href: 'https://www.pietrocosentino.com.br/', label: 'Ver trajetória completa' },
  facts: [
    { label: 'Atendimento', value: 'Online, para todo o Brasil' },
    { label: 'Foco', value: 'Autônomos e pequenas empresas' },
    { label: 'Entregas', value: 'WhatsApp, aplicativos e sites' },
  ],
};

export const faq = {
  eyebrow: 'Dúvidas',
  title: 'Perguntas frequentes',
  items: [
    {
      question: 'Preciso entender de tecnologia?',
      answer: 'Não. A gente cuida da parte técnica e entrega tudo funcionando, com uma explicação simples de como usar.',
    },
    {
      question: 'Quanto custa?',
      answer: 'Depende do que o seu negócio precisa. Depois do levantamento, você recebe uma proposta clara, sem compromisso de contratar.',
    },
    {
      question: 'Funciona no celular?',
      answer: 'Sim. Tudo é pensado para ser usado no celular, por você e pelos seus clientes.',
    },
    {
      question: 'Vocês atendem só a minha cidade?',
      answer: 'Não. O atendimento é online, para todo o Brasil.',
    },
    {
      question: 'E se eu precisar de algo que não está na lista?',
      answer: 'Conte o seu problema. As soluções do site são exemplos: cada projeto é feito sob medida.',
    },
  ],
};

export const contactSection = {
  eyebrow: 'Contato',
  title: 'Vamos simplificar o seu negócio?',
  lead: 'Conte o que mais toma o seu tempo hoje. A gente responde com uma proposta, sem compromisso.',
};
