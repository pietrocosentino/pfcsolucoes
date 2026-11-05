// Todo o texto do site fica aqui. Para mudar um título, um serviço ou uma
// pergunta, edite este arquivo; os componentes só cuidam da apresentação.

export const brand = {
  name: 'PFC Soluções',
  fullName: 'PFC Soluções em Tecnologia',
  tagline: 'Sistemas para pequenos negócios',
  // Título da página inicial no Google: o que fazemos, para quem, e a marca.
  seoTitle: 'Sistemas sob medida para pequenas empresas | PFC Soluções',
  cnpj: '44.404.492/0001-56',
  // Dados públicos do cartão CNPJ (Receita Federal). "PFC Soluções em Tecnologia"
  // é o nome comercial; quem confere o CNPJ encontra a razão social abaixo.
  legalName: 'Pietro F. Cosentino Desenvolvimento de Software Ltda',
  foundingDate: '2021-11-29',
  foundingLabel: 'novembro de 2021',
  city: 'São Paulo',
  state: 'SP',
  // Data da última revisão do conteúdo. Atualize ao mudar textos importantes.
  updatedAt: '2026-11-05',
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
  ctaLabel: 'Falar com a atendente virtual',
};

// Atendente de IA do site (primeiro contato). Instruções em src/lib/assistant/.
export const assistant = {
  name: 'marcIA',
  role: 'atendente de primeiro contato',
  status: 'Atendente da PFC Soluções',
  greeting:
    'Olá! Eu sou a marcIA, atendente virtual da PFC Soluções. O que mais está dando trabalho no seu negócio hoje?',
  launcher: 'Falar com a atendente virtual',
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
        { href: '/condicoes', label: 'Condições do site' },
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
  title: 'Sistemas sob medida para pequenos negócios',
  lead: 'Atendimento no WhatsApp, agenda e finanças para barbearias, salões, clínicas de estética, personal trainers e prestadores de serviço. Cada sistema parte da rotina do seu negócio, não de um modelo pronto, e você usa tudo pelo celular.',
  primaryCta: 'Falar com a atendente virtual',
  secondaryCta: { href: '#solucoes', label: 'Ver exemplos' },
  // Print real da marcIA (conversa de teste no site em produção).
  shotCaption: 'Conversa de teste com a marcIA, o agente de IA que a PFC criou para atender neste site.',
  note: 'A marcIA é a nossa atendente com inteligência artificial e responde na hora.',
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
};

export const solutions = {
  title: 'Exemplos do que já construímos',
  lead: 'Projetos de demonstração construídos pela PFC, para mostrar como cada solução funciona. O seu sistema parte da necessidade do seu negócio, não de um pacote pronto.',
  closing: 'Precisa de outra coisa?',
  more: 'Fale com a atendente virtual',
  items: [
    {
      area: 'Atendimento',
      title: 'Agente de IA no WhatsApp',
      description: 'Responde, marca, remarca e cancela na agenda real, a qualquer hora.',
      features: ['Envia o Pix do sinal na conversa', 'Lembra o cliente na véspera', 'Oferece o horário vago para a fila de espera'],
      shot: {
        file: 'painel-hoje',
        alt: 'Tela Hoje do painel no celular: três atendimentos do dia com horário, cliente, serviço e botões Concluído, Faltou e Cancelar',
        caption: 'Painel do dono no celular, com dados de demonstração.',
      },
    },
    {
      area: 'Agenda',
      title: 'Agenda online',
      description: 'O cliente marca pelo celular, sem precisar te chamar.',
      features: ['Escolhe o serviço e o horário', 'Só aparecem horários em que o atendimento inteiro cabe'],
    },
    {
      area: 'Finanças',
      title: 'App de finanças',
      description: 'O que entra e o que sai do negócio, no Android e no iPhone.',
      features: ['Entradas, saídas e contas fixas', 'Importa planilhas do Excel'],
    },
    {
      area: 'Presença online',
      title: 'Site profissional',
      description: 'Feito para o celular, com botão direto para o seu WhatsApp.',
      features: ['Domínio próprio configurado', 'No ar em até 10 dias depois da sua aprovação'],
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
  title: 'Como funciona',
  lead: 'Você decide se contrata na etapa 2, com a proposta em mãos.',
  steps: [
    {
      title: 'Levantamento',
      summary: 'Entendemos a sua rotina',
      text: 'Conversa online sobre a sua rotina e onde você perde clientes.',
      deliverable: 'O que vale resolver primeiro, e se um sistema resolve mesmo o seu problema.',
      participation: 'Uma conversa online, sem compromisso.',
    },
    {
      title: 'Proposta',
      summary: 'Encontramos as perdas e definimos o escopo',
      text: 'Escopo, prazo e valor por escrito. Você aprova, ajusta ou desiste.',
      deliverable: 'Uma proposta escrita com escopo, prazo e valor, antes de começar.',
      participation: 'Você aprova, pede ajustes ou decide não seguir.',
    },
    {
      title: 'Construção',
      summary: 'Desenhamos e construímos em partes',
      text: 'Construímos em partes. Você testa as telas com os seus serviços e preços.',
      deliverable: 'Telas para testar antes da versão final, já com os seus serviços e preços.',
      participation: 'Você testa durante a construção e diz o que ajustar.',
    },
    {
      title: 'Entrega',
      summary: 'Entregamos funcionando e acompanhamos',
      text: 'Sistema no ar com os dados do seu negócio e acompanhamento depois da entrega.',
      deliverable: 'O sistema funcionando e acompanhamento para ajustar o que aparecer no uso.',
      participation: 'Você usa na rotina e conta o que pode melhorar.',
    },
  ] satisfies ProcessStep[],
};

export const about = {
  name: 'Pietro Cosentino',
  role: 'Fundador da PFC Soluções',
  // Texto curto da página inicial (a bio completa segue para a marcIA e o Google).
  short:
    'A PFC Soluções em Tecnologia foi fundada por Pietro Cosentino: 9 anos em tecnologia como Product Owner e analista de requisitos, em educação, pagamentos e sistemas corporativos. Você fala com ele do levantamento à entrega.',
  bio: 'Pietro tem 9 anos de experiência em tecnologia, como Product Owner e analista de requisitos, de sistemas e funcional sênior, em projetos de educação, pagamentos e sistemas corporativos. Está cursando MBA em Inteligência Artificial para Negócios. A PFC Soluções leva esse olhar de negócio para quem não tem um time de tecnologia.',
  linkedin: 'https://www.linkedin.com/in/pietro-cosentino',
  portfolio: { href: 'https://www.pietrocosentino.com.br/', label: 'Ver trajetória completa' },
};

// Seção que ajuda a decidir entre sistema sob medida e aplicativo pronto.
export const comparison = {
  title: 'Sob medida ou aplicativo pronto?',
  columns: ['Aplicativo pronto', 'Sistema sob medida'],
  rows: [
    { label: 'Para começar', ready: 'Você assina e configura', custom: 'Começa com um levantamento da sua rotina' },
    { label: 'Partes do negócio', ready: 'Costuma cobrir uma; o resto fica em planilha', custom: 'Atendimento, agenda, cobrança e finanças juntos' },
    { label: 'Ajustes', ready: 'Pelo suporte, quando o recurso existe', custom: 'Direto com quem construiu' },
    { label: 'Valor', ready: 'Mensalidade por plano', custom: 'Definido na proposta' },
  ],
};

export const faq = {
  title: 'Perguntas frequentes',
  items: [
    {
      question: 'O que é um sistema sob medida?',
      answer: 'É um sistema feito de acordo com a necessidade de cada cliente, nada genérico. Ele segue o jeito como o seu negócio já funciona, em vez de obrigar você a se adaptar a um aplicativo pronto.',
    },
    {
      question: 'Quanto custa?',
      answer: 'Site profissional a partir de R$ 700, entregue com o seu domínio configurado. A manutenção custa R$ 200 por mês, em assinatura anual, com a hospedagem incluída. Agentes de IA, agendas e outros sistemas dependem do que você precisa, e o valor fechado está na proposta.',
      link: { href: '/condicoes', label: 'Ver as condições do site profissional' },
    },
    {
      question: 'Quanto tempo leva?',
      answer: 'Um site simples entra no ar em até 10 dias depois que você aprova a versão final. Um agente de IA entra no ar a partir de 15 dias depois que você valida o que ele vai fazer. Para os outros sistemas, o prazo depende do escopo e está na proposta.',
    },
    {
      question: 'Preciso entender de tecnologia?',
      answer: 'Não. Você recebe o sistema funcionando e uma explicação de uso.',
    },
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer: 'O agente atende pelo WhatsApp. Número e custos do WhatsApp estão descritos na proposta.',
    },
    {
      question: 'Vocês atendem a minha cidade?',
      answer: 'O atendimento é online, para todo o Brasil.',
    },
  ],
};

export const contactSection = {
  title: 'Conte o que está dando trabalho',
  lead: 'A marcIA faz as primeiras perguntas e o Pietro recebe o resumo.',
};
