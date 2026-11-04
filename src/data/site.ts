// Todo o texto do site fica aqui. Para mudar um título, um serviço ou uma
// pergunta, edite este arquivo; os componentes só cuidam da apresentação.

export const brand = {
  name: 'PFC Soluções',
  fullName: 'PFC Soluções em Tecnologia',
  tagline: 'Sistemas para pequenos negócios',
  // Título da página inicial no Google: o que fazemos, para quem, e a marca.
  seoTitle: 'Sistemas sob medida para pequenas empresas | PFC Soluções',
  cnpj: '44.404.492/0001-56',
  // Data da última revisão do conteúdo. Atualize ao mudar textos importantes.
  updatedAt: '2026-11-04',
  updatedLabel: '4 de novembro de 2026',
  // Frase que define a empresa: é o trecho que buscadores e IAs citam sobre a PFC.
  definition:
    'A PFC Soluções em Tecnologia é uma empresa brasileira, fundada por Pietro Cosentino, que cria sistemas sob medida para autônomos e pequenas empresas: agente de IA no WhatsApp, agenda online, controle financeiro e sites. O atendimento é online, para todo o Brasil.',
  // Texto do Google para a página inicial: benefício e chamada para ação (até 155 caracteres).
  // A descrição neutra (description) segue nos dados estruturados.
  seoDescription:
    'Pare de perder clientes: IA no WhatsApp, agenda online e controle financeiro feitos para o seu negócio. Proposta clara e sem compromisso. Fale com a gente!',
  description:
    'Sistemas sob medida para autônomos e pequenas empresas: agente de IA no WhatsApp, agendamento online, controle financeiro e sites. Atendimento em todo o Brasil.',
  shareText: 'Seu negócio perde clientes e dinheiro onde você não vê. A gente encontra e resolve.',
};

// O número e o @ ficam só nos links; não aparecem no texto do site.
export const whatsappNumber = '5511984597523';
const whatsappMessage = 'Olá! Vim pelo site da PFC Soluções e quero saber mais.';

export const contact = {
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  instagramProfile: 'https://www.instagram.com/pfc.solucoes/',
  email: 'contato@pfcsolucoes.com.br',
  ctaLabel: 'Contar meu problema para a marcIA',
};

// Atendente de IA do site (primeiro contato). Instruções em src/lib/assistant/.
export const assistant = {
  name: 'marcIA',
  role: 'atendente de primeiro contato',
  status: 'Atendente da PFC Soluções',
  greeting:
    'Oi, que bom ter você por aqui! Eu sou a marcIA, da PFC Soluções. Me conta: o que mais está te dando trabalho no seu negócio hoje?',
  // Respostas prontas mostradas antes da primeira mensagem do visitante.
  suggestions: ['Perco clientes no WhatsApp', 'Meus clientes faltam ou desmarcam', 'Não sei quanto sobra no mês', 'Quero um site profissional'],
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
  // O começo do resumo vira link para a página inicial (texto âncora).
  summaryLink: 'Sistemas sob medida para autônomos e pequenas empresas',
  summary: 'Sistemas sob medida para autônomos e pequenas empresas. Atendimento online para todo o Brasil.',
  columns: [
    {
      title: 'Institucional',
      links: [
        { href: '/sobre', label: 'Quem somos' },
        { href: '/#como-funciona', label: 'Como funciona' },
        { href: '/#duvidas', label: 'Perguntas frequentes' },
      ],
    },
    {
      title: 'Soluções',
      links: [
        { href: '/#solucao-atendimento', label: 'Atendimento com IA' },
        { href: '/#solucao-agenda', label: 'Agenda online' },
        { href: '/#solucao-financas', label: 'Finanças' },
        { href: '/#solucao-presenca-online', label: 'Sites profissionais' },
      ],
    },
  ],
};

// Primeira dobra: o visitante decide aqui se continua. Segue o teste de clareza
// (o que oferecemos, como melhora a vida dele, o que fazer agora).

export const hero = {
  eyebrow: 'Sistemas sob medida para autônomos e pequenas empresas',
  title: 'Atendimento por IA no WhatsApp',
  highlight: 'e agenda online para pequenos negócios.',
  lead: 'Primeiro entendemos como o seu negócio funciona hoje. Depois construímos só o que resolve o seu maior problema, e você usa pelo celular.',
  primaryCta: 'Conversar com a marcIA',
  secondaryCta: { href: '#solucoes', label: 'Ver o que já entregamos' },
  // Print real da marcIA (conversa de teste no site em produção).
  shotCaption: 'A marcIA, atendente com IA deste site, numa conversa de teste.',
  note: 'A marcIA é a nossa atendente virtual. A conversa é sem compromisso.',
};

// Tipos de negócio atendidos: faixa logo abaixo do topo.
export const segments = {
  label: 'Para',
  items: ['barbearias', 'salões de beleza', 'clínicas de estética', 'personal trainers', 'prestadores de serviço'],
};

type WarningSign = { stat: string; fact: string; source: string; url: string };

// Dados de pesquisas públicas (fontes no fim de cada item). Ao trocar um número,
// confira a fonte: o atendente de IA também usa estes dados.
export const warningSigns = {
  title: 'O que faz o cliente da pequena empresa ir para a concorrência',
  lead: 'Na maioria das vezes, o cliente não vai embora pelo preço. Vai porque esperou demais pela resposta ou não conseguiu marcar.',
  items: [
    {
      stat: '7x',
      fact: 'mais chance de avançar a venda quando a resposta vem em até 1 hora.',
      source: 'Harvard Business Review, The Short Life of Online Sales Leads',
      url: 'https://scholarsarchive.byu.edu/facpub/9711',
    },
    {
      stat: '49%',
      fact: 'dos clientes na América Latina deixam uma marca depois de uma única experiência ruim.',
      source: 'PwC, Experience is everything',
      url: 'https://www.pwc.com/cb/en/services/consulting/pdf/customer-experience-placemat.pdf',
    },
    {
      stat: '81%',
      fact: 'dos clientes frequentes de salão precisam marcar ou mudar horário fora do expediente.',
      source: 'Zenoti, pesquisa de 2025',
      url: 'https://www.zenoti.com/en-uk/thecheckin/salon-spa-booking-communication-trends',
    },
  ] satisfies WarningSign[],
};

export type Solution = {
  area: string;
  // Print da solução (arquivo em src/assets/prints) e a legenda dele.
  shot?: { file: 'painel-hoje'; alt: string; caption: string };
  title: string;
  description: string;
  features: string[];
  project: string;
};

export const solutions = {
  title: 'Sistemas sob medida que já construímos para pequenos negócios',
  lead: 'Estes são os sistemas que já entregamos. O seu parte do mesmo ponto: do problema que você tem hoje, não de uma lista.',
  closing: 'Seu caso não está aqui? Já fizemos de agenda de barbearia a app de finanças.',
  more: 'Conte qual é para a marcIA',
  items: [
    {
      area: 'Atendimento',
      title: 'Agente de IA no WhatsApp: responde e marca horário quando você não pode',
      description: 'Conversa com o seu cliente em linguagem natural, inclusive à noite e no fim de semana, e cuida da agenda por você.',
      features: [
        'Entende pedidos como "amanhã depois das 18" e marca, remarca ou cancela na agenda real',
        'Manda o Pix do sinal na própria conversa',
        'Lembra o cliente na véspera, com botão para confirmar',
        'Quando alguém desmarca, oferece o horário para quem está na fila de espera',
        'Você acompanha agenda e conversas por um painel no celular',
      ],
      project: 'Agente de IA no WhatsApp com painel para o dono',
      shot: {
        file: 'painel-hoje',
        alt: 'Tela Hoje do painel no celular: três atendimentos do dia com horário, cliente, serviço e botões Concluído, Faltou e Cancelar',
        caption: 'Painel do dono no celular, com dados de demonstração.',
      },
    },
    {
      area: 'Agenda',
      title: 'Agenda online: o cliente marca sozinho pelo celular',
      description: 'Uma página de agendamento só sua, com os seus serviços e horários.',
      features: [
        'Mostra só os horários em que o atendimento inteiro cabe',
        'Reconhece quem já agendou naquele celular',
        'Você recebe o aviso no WhatsApp, com a mensagem pronta',
        'Horário cancelado volta a ficar livre na hora',
      ],
      project: 'Agenda online para barbearia',
    },
    {
      area: 'Finanças',
      title: 'App de controle financeiro: entradas, saídas e contas fixas no celular',
      description: 'Para Android e iPhone, sem planilha complicada.',
      features: [
        'Lembrete das contas que se repetem todo mês',
        'Importa lançamentos de uma planilha do Excel',
      ],
      project: 'App de finanças para Android e iPhone',
    },
    {
      area: 'Presença online',
      title: 'Site profissional: abre rápido e leva direto para o seu WhatsApp',
      description: 'Este site, por exemplo, tira mais de 90 de 100 em velocidade no celular no teste do Google (Lighthouse).',
      features: ['Serviços, planos e depoimentos', 'Botão para o WhatsApp com mensagem pronta'],
      project: 'Site de consultoria para personal trainer',
    },
  ] satisfies Solution[],
};

type ProcessStep = {
  title: string;
  summary: string;
  text: string;
  deliverable: string;
  participation: string;
};

// Método de trabalho. A marcIA também usa este texto, então ele precisa
// refletir o que a PFC realmente faz em cada etapa.
export const process = {
  title: 'Como trabalhamos, em 4 etapas',
  lead: 'Você só decide se contrata na segunda etapa, depois de ver a proposta.',
  steps: [
    {
      title: 'Levantamento',
      summary: 'Entendemos a sua rotina',
      text: 'Uma conversa sobre como o seu negócio funciona hoje e onde você sente que está perdendo cliente.',
      deliverable: 'O que vale resolver primeiro, e se um sistema resolve mesmo o seu problema.',
      participation: 'Uma conversa online, sem compromisso.',
    },
    {
      title: 'Análise',
      summary: 'Encontramos as perdas e definimos o escopo',
      text: 'Medimos quanto cada problema custa para você e começamos pelo que dá retorno mais rápido.',
      deliverable: 'Uma proposta escrita com escopo, prazo e valor, antes de começar.',
      participation: 'Você aprova, pede ajustes ou decide não seguir.',
    },
    {
      title: 'Construção',
      summary: 'Desenhamos e construímos em partes',
      text: 'Desenhamos o caminho do seu cliente, do primeiro contato ao pagamento, e construímos em partes.',
      deliverable: 'Telas para testar antes da versão final, já com os seus serviços e preços.',
      participation: 'Você testa durante a construção e diz o que ajustar.',
    },
    {
      title: 'Entrega e acompanhamento',
      summary: 'Entregamos funcionando e acompanhamos',
      text: 'Colocamos no ar com os dados do seu negócio e mostramos como usar no dia a dia.',
      deliverable: 'O sistema funcionando e acompanhamento para ajustar o que aparecer no uso.',
      participation: 'Você usa na rotina e conta o que pode melhorar.',
    },
  ] satisfies ProcessStep[],
};

export const about = {
  name: 'Pietro Cosentino',
  role: 'Fundador da PFC Soluções',
  bio: 'Pietro tem 9 anos de experiência em tecnologia, como Product Owner e analista de requisitos, de sistemas e funcional sênior, em projetos de educação, pagamentos e sistemas corporativos. Está cursando MBA em Inteligência Artificial para Negócios. A PFC Soluções leva esse olhar de negócio para quem não tem um time de tecnologia.',
  linkedin: 'https://www.linkedin.com/in/pietro-cosentino',
  portfolio: { href: 'https://www.pietrocosentino.com.br/', label: 'Ver trajetória completa' },
};

// Seção que ajuda a decidir entre sistema sob medida e aplicativo pronto.
export const comparison = {
  title: 'Sistema sob medida ou aplicativo pronto: qual vale mais para o seu negócio?',
  lead: 'Um aplicativo pronto serve quando a sua rotina é igual à da maioria. Um sistema sob medida vale quando o aplicativo obriga você a manter planilha ou caderno do lado.',
  columns: ['Aplicativo pronto', 'Sistema sob medida'],
  rows: [
    { label: 'Para começar', ready: 'Rápido: você assina e configura', custom: 'Começa com um levantamento da sua rotina' },
    { label: 'Quem se adapta', ready: 'Você se adapta ao aplicativo', custom: 'O sistema se adapta ao seu jeito de trabalhar' },
    { label: 'Partes do negócio', ready: 'Costuma cobrir uma parte; o resto fica em planilha, papel ou WhatsApp', custom: 'Atendimento, agenda, cobrança e finanças juntos, sem digitar duas vezes' },
    { label: 'WhatsApp', ready: 'Depende do aplicativo e do plano', custom: 'Agente de IA que atende e agenda pelo WhatsApp, quando fizer sentido' },
    { label: 'Ajustes', ready: 'Pelo suporte, quando o recurso existe', custom: 'Você fala direto com quem construiu o sistema' },
    { label: 'Valor', ready: 'Mensalidade por plano', custom: 'Definido na proposta, antes de você decidir' },
  ],
  closing: 'Não sabe qual é o seu caso? É isso que a primeira conversa responde.',
  more: 'Descobrir o que funciona para o meu negócio',
};

export const faq = {
  title: 'Perguntas frequentes',
  items: [
    {
      question: 'O que é um sistema sob medida?',
      answer: 'É um sistema criado a partir da rotina do seu negócio, em vez de um aplicativo genérico. Ele faz o que você precisa, do jeito que você trabalha, e junta atendimento, agenda, cobrança e finanças num lugar só.',
    },
    {
      question: 'Preciso entender de tecnologia?',
      answer: 'Não. A gente cuida da parte técnica e entrega tudo funcionando, com uma explicação simples de como usar.',
    },
    {
      question: 'Quanto custa um sistema sob medida para pequena empresa?',
      answer: 'O valor depende do escopo: quantos serviços e canais o sistema atende, se integra com WhatsApp e pagamento por Pix, e quanto acompanhamento você quer depois da entrega. Ele sai na proposta, depois do levantamento, sem compromisso de contratar.',
    },
    {
      question: 'Quanto tempo leva para ficar pronto?',
      answer: 'Depende do que o seu negócio precisa. O prazo é definido depois do levantamento, antes de você decidir contratar.',
    },
    {
      question: 'Vale mais que um aplicativo pronto?',
      answer: 'Vale quando o aplicativo pronto obriga você a usar planilha ou papel junto, ou quando não conversa com o seu WhatsApp. No levantamento, a gente entende a sua rotina antes de propor qualquer coisa.',
    },
    {
      question: 'Serve para MEI e autônomo?',
      answer: 'Sim. A PFC atende principalmente quem trabalha sozinho ou com uma equipe pequena: barbearias, salões, clínicas, consultórios, personal trainers e prestadores de serviço.',
    },
    {
      question: 'Funciona junto com o WhatsApp que eu já uso?',
      answer: 'O agente de IA atende os seus clientes pelo WhatsApp. Como fica o número e os custos do WhatsApp vêm descritos na proposta.',
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
      answer: 'É a nossa atendente virtual, com inteligência artificial. Ela tira as suas dúvidas na hora, entende o seu caso e, quando ele estiver claro, o Pietro recebe tudo resumido para cuidar pessoalmente.',
    },
    {
      question: 'E se eu precisar de algo que não está na lista?',
      answer: 'Conte o seu problema. As soluções do site são exemplos: cada projeto parte do caso de quem contrata.',
    },
  ],
};

export const contactSection = {
  title: 'Vamos criar o sistema do seu negócio?',
  lead: 'Conte para a marcIA, nossa atendente, o que mais toma o seu tempo hoje. Ela entende o seu caso na hora e prepara tudo para o Pietro chegar já sabendo do que você precisa.',
};
