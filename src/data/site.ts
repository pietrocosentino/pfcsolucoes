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
export const whatsappNumber = '5511984597523';
const whatsappMessage = 'Olá! Vim pelo site da PFC Soluções e quero saber mais.';

export const contact = {
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  instagramProfile: 'https://www.instagram.com/pfc.solucoes/',
  ctaLabel: 'Falar com a marcIA',
};

// Atendente de IA do site (primeiro contato). Instruções em src/lib/assistant/.
export const assistant = {
  name: 'marcIA',
  role: 'atendente de primeiro contato',
  status: 'Atendente da PFC Soluções',
  greeting:
    'Oi! Eu sou a marcIA, atendente da PFC Soluções. Me conta: qual é o seu negócio e o que mais toma o seu tempo hoje?',
  launcher: 'Fale com a marcIA',
};

// Links com "/" na frente funcionam em qualquer página do site.
export const navigation = [
  { href: '/#solucoes', label: 'Soluções' },
  { href: '/#como-funciona', label: 'Como funciona' },
  { href: '/sobre', label: 'Quem somos' },
  { href: '/#duvidas', label: 'Dúvidas' },
];

export const footer = {
  summary: 'Sistemas sob medida para autônomos e pequenas empresas. Atendimento online para todo o Brasil.',
  columns: [
    {
      title: 'Institucional',
      links: [
        { href: '/sobre', label: 'Quem somos' },
        { href: '/#como-funciona', label: 'Como funciona' },
        { href: '/#duvidas', label: 'Perguntas frequentes' },
        { href: '/privacidade', label: 'Política de privacidade' },
      ],
    },
    {
      title: 'Soluções',
      links: [
        { href: '/#solucoes', label: 'Atendimento com IA' },
        { href: '/#solucoes', label: 'Agenda online' },
        { href: '/#solucoes', label: 'Finanças' },
        { href: '/#solucoes', label: 'Sites profissionais' },
      ],
    },
  ],
};

export const hero = {
  eyebrow: 'Tecnologia para autônomos e pequenas empresas',
  title: 'Seu negócio atende, agenda e cobra',
  highlight: 'mesmo quando você está ocupado.',
  lead: 'Criamos sistemas sob medida que cuidam do trabalho repetitivo: atendimento no WhatsApp, agenda, finanças e site. Você fica livre para se dedicar aos seus clientes.',
  note: 'Atendimento na hora, sem compromisso.',
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

export type WarningSign = { stat: string; fact: string; cost: string; source: string };

// Dados de pesquisas públicas (fontes no fim de cada item). Ao trocar um número,
// confira a fonte: o atendente de IA também usa estes dados.
export const warningSigns = {
  eyebrow: 'Por que o cliente vai embora',
  title: 'O que faz o cliente ir para a concorrência',
  lead: 'Nem sempre é o preço. Muitas vezes é demora, dificuldade para agendar ou falta de confiança.',
  items: [
    {
      stat: '7x',
      fact: 'mais chance de avançar a venda quando a resposta vem em até 1 hora.',
      cost: 'Demorou para responder? Ele já está falando com outro.',
      source: 'Harvard Business Review',
    },
    {
      stat: '49%',
      fact: 'dos clientes na América Latina deixam uma marca depois de uma única experiência ruim.',
      cost: 'Não existe segunda chance para um atendimento ruim.',
      source: 'PwC, Experience is everything',
    },
    {
      stat: '81%',
      fact: 'dos clientes de salão precisam marcar ou mudar horário fora do expediente.',
      cost: 'Agenda só no horário comercial deixa a cadeira vazia.',
      source: 'Zenoti, 2025',
    },
    {
      stat: '53%',
      fact: 'saem de um site no celular que demora mais de 3 segundos para abrir.',
      cost: 'Metade dos visitantes vai embora antes de ver o seu trabalho.',
      source: 'Google, The Need for Mobile Speed',
    },
    {
      stat: '63%',
      fact: 'confiam pouco em empresas que não têm site e só usam rede social.',
      cost: 'Sem site, o cliente escolhe quem parece mais profissional.',
      source: 'IEDR, pesquisa com 1.000 consumidores',
    },
    {
      stat: '88%',
      fact: 'abandonam aplicativos que apresentam erros e falhas.',
      cost: 'O cliente culpa a sua empresa, não o sistema.',
      source: 'QualiTest com Google Consumer Surveys',
    },
  ] satisfies WarningSign[],
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

export type ProcessStep = {
  title: string;
  summary: string;
  text: string;
  deliverable: string;
  participation: string;
};

// Método de trabalho. A marcIA também usa este texto, então ele precisa
// refletir o que a PFC realmente faz em cada etapa.
export const process = {
  eyebrow: 'Como funciona',
  title: 'Do seu problema à solução funcionando',
  lead: 'Entender antes de construir, validar antes de entregar e acompanhar depois. Em cada etapa você sabe o que fazemos, o que recebe e como participa.',
  steps: [
    {
      title: 'Levantamento',
      summary: 'Entendemos a sua rotina',
      text: 'Uma conversa sobre como você atende, agenda, cobra e controla as contas hoje, e onde sente que perde clientes, tempo ou dinheiro.',
      deliverable: 'Um retrato do seu cenário e uma resposta honesta: se a tecnologia resolve o seu problema e por onde vale começar.',
      participation: 'Uma conversa online, sem compromisso.',
    },
    {
      title: 'Análise',
      summary: 'Encontramos as perdas e definimos o escopo',
      text: 'Organizamos o que foi levantado, medimos o impacto de cada problema e priorizamos o que traz retorno primeiro.',
      deliverable: 'Uma proposta clara, com escopo, prazo e investimento definidos antes de começar. Sem surpresas.',
      participation: 'Você aprova, pede ajustes ou decide não seguir.',
    },
    {
      title: 'Processo',
      summary: 'Desenhamos e construímos sob medida',
      text: 'Desenhamos o fluxo ideal para o seu negócio, de como o cliente chega até como ele agenda, paga e é lembrado, e construímos em partes.',
      deliverable: 'Telas e fluxos para validar antes da versão final, já com os seus serviços, preços e horários.',
      participation: 'Você testa durante a construção e diz o que ajustar.',
    },
    {
      title: 'Solução',
      summary: 'Entregamos funcionando e acompanhamos',
      text: 'Colocamos no ar, configuramos com os dados do seu negócio e mostramos como usar no dia a dia, no celular.',
      deliverable: 'O sistema funcionando, explicação simples de uso e acompanhamento para ajustar o que for preciso.',
      participation: 'Você usa na rotina e conta o que pode melhorar.',
    },
  ] satisfies ProcessStep[],
  principles: [
    { title: 'Nada de pacote pronto', text: 'Cada solução nasce da sua rotina, não de um modelo genérico.' },
    { title: 'Sem surpresas', text: 'Escopo, prazo e investimento combinados antes de começar.' },
    { title: 'Você acompanha tudo', text: 'Valida cada etapa e vê o sistema antes da entrega final.' },
    { title: 'Feito para o celular', text: 'Para você e para os seus clientes usarem onde estiverem.' },
  ],
};

export const about = {
  eyebrow: 'Quem está por trás',
  name: 'Pietro Cosentino',
  bio: 'Analista de requisitos, de sistemas e funcional sênior, com experiência em educação, pagamentos e sistemas corporativos. A PFC Soluções leva esse olhar de negócio para quem não tem um time de tecnologia.',
  portfolio: { href: 'https://www.pietrocosentino.com.br/', label: 'Ver trajetória completa' },
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
      question: 'Quem é a marcIA?',
      answer: 'É a nossa atendente virtual, com inteligência artificial. Ela tira as suas dúvidas na hora e, quando você quiser, passa a conversa para o Pietro pelo WhatsApp com um resumo pronto.',
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
  lead: 'Conte para a marcIA, nossa atendente, o que mais toma o seu tempo hoje. Ela entende o seu caso na hora e, quando você quiser, já te passa para o Pietro com tudo resumido.',
};
