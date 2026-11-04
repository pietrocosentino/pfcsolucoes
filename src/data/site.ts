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
// Antes, depois e ponte: a dor na voz do cliente, como fica a vida dele e o que a PFC entrega.
type Transformation = { pain: string; gain: string; solution: string };

export const hero = {
  eyebrow: 'Sistemas sob medida para autônomos e pequenas empresas',
  title: 'Seu negócio perde clientes e dinheiro onde você não vê.',
  highlight: 'A gente encontra e resolve.',
  lead: 'Analisamos a sua rotina e criamos o sistema que fecha cada brecha: atendimento, agenda, cobrança, finanças e site. Sob medida, simples de usar no celular, sem você precisar entender de tecnologia.',
  primaryCta: 'Descobrir onde estou perdendo',
  secondaryCta: { href: '#como-funciona', label: 'Ver como funciona' },
  note: 'Conversa sem compromisso com a marcIA, nossa atendente. Atendimento online para todo o Brasil.',
  transformation: {
    title: 'Você se reconhece?',
    subtitle: 'O que donos de pequenos negócios vivem hoje, e como fica depois.',
    items: [
      {
        pain: 'Você vê a mensagem do cliente só no fim do dia. Quando responde, ele já marcou em outro lugar.',
        gain: 'Cada cliente é respondido na hora, até de madrugada, e sai com o horário marcado.',
        solution: 'Agente de IA no WhatsApp',
      },
      {
        pain: 'O cliente marca, esquece e não aparece. O horário fica vazio e o dinheiro não volta.',
        gain: 'O cliente recebe lembrete e confirma. Se alguém desmarca, a vaga é oferecida para outro.',
        solution: 'Agenda online com lembretes',
      },
      {
        pain: 'Você trabalha o mês inteiro e não sabe dizer quanto sobrou.',
        gain: 'Você abre o celular e vê quanto entrou, quanto saiu e quanto sobra.',
        solution: 'App de finanças',
      },
      {
        pain: 'Quem te procura acha só um perfil no Instagram e fica na dúvida se o negócio é sério.',
        gain: 'Quem procura encontra um site profissional e fala com você em um toque.',
        solution: 'Site profissional',
      },
    ] satisfies Transformation[],
  },
};

type WarningSign = { stat: string; fact: string; cost: string; source: string; url: string };

// Dados de pesquisas públicas (fontes no fim de cada item). Ao trocar um número,
// confira a fonte: o atendente de IA também usa estes dados.
export const warningSigns = {
  eyebrow: 'Por que o cliente vai embora',
  title: 'O que faz o cliente da pequena empresa ir para a concorrência',
  lead: 'Pequenas empresas perdem clientes principalmente por demora para responder, dificuldade para agendar e falta de confiança, e não só pelo preço. Estes dados mostram o tamanho de cada problema.',
  items: [
    {
      stat: '7x',
      fact: 'mais chance de avançar a venda quando a resposta vem em até 1 hora.',
      cost: 'Demorou para responder? Ele já está falando com outro.',
      source: 'Harvard Business Review, The Short Life of Online Sales Leads',
      url: 'https://scholarsarchive.byu.edu/facpub/9711',
    },
    {
      stat: '49%',
      fact: 'dos clientes na América Latina deixam uma marca depois de uma única experiência ruim.',
      cost: 'Não existe segunda chance para um atendimento ruim.',
      source: 'PwC, Experience is everything',
      url: 'https://www.pwc.com/cb/en/services/consulting/pdf/customer-experience-placemat.pdf',
    },
    {
      stat: '81%',
      fact: 'dos clientes frequentes de salão precisam marcar ou mudar horário fora do expediente.',
      cost: 'Agenda só no horário comercial deixa a cadeira vazia.',
      source: 'Zenoti, pesquisa de 2025',
      url: 'https://www.zenoti.com/en-uk/thecheckin/salon-spa-booking-communication-trends',
    },
  ] satisfies WarningSign[],
  closing: 'Cada um desses problemas tem solução.',
};

export type Solution = {
  area: string;
  title: string;
  description: string;
  features: string[];
  project: string;
};

export const solutions = {
  eyebrow: 'Exemplos do que já construímos',
  title: 'Sistemas sob medida que já construímos para pequenos negócios',
  lead: 'A PFC desenvolve quatro tipos de sistema para pequenos negócios: agente de IA no WhatsApp, agenda online, app de controle financeiro e site profissional. Os exemplos abaixo nasceram de problemas reais; o seu sistema personalizado será desenhado a partir da sua rotina, não escolhido de uma lista.',
  closing: 'Automações, sistemas, aplicativos, sites: o que o seu problema pedir.',
  more: 'Não achou o seu caso? Conte o seu problema para a marcIA',
  items: [
    {
      area: 'Atendimento',
      title: 'Agente de IA no WhatsApp: nenhum cliente fica sem resposta',
      description: 'Um agente de IA no WhatsApp que entende o cliente em linguagem natural e cuida da agenda por você.',
      features: [
        'Marca, remarca e cancela na agenda real',
        'Envia o Pix do sinal e lembra o cliente antes do horário',
        'Oferece encaixes quando alguém desmarca',
      ],
      project: 'Agente de IA no WhatsApp com painel para o dono acompanhar tudo no celular',
    },
    {
      area: 'Agenda',
      title: 'Agenda online: sua agenda se preenche sozinha',
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
      title: 'App de controle financeiro: você sabe quanto sobra no mês',
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
      title: 'Site profissional: quem procura, encontra você',
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
  eyebrow: 'Como funciona',
  title: 'Como desenvolvemos o seu sistema sob medida, em 4 etapas',
  lead: 'O desenvolvimento tem 4 etapas: levantamento, análise, construção e entrega com acompanhamento. Você só decide se contrata na etapa 2, e em cada etapa sabe o que fazemos, o que recebe e como participa.',
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
      title: 'Construção',
      summary: 'Desenhamos e construímos sob medida',
      text: 'Desenhamos o fluxo ideal para o seu negócio, de como o cliente chega até como ele agenda, paga e é lembrado, e construímos em partes.',
      deliverable: 'Telas e fluxos para validar antes da versão final, já com os seus serviços, preços e horários.',
      participation: 'Você testa durante a construção e diz o que ajustar.',
    },
    {
      title: 'Entrega e acompanhamento',
      summary: 'Entregamos funcionando e acompanhamos',
      text: 'Colocamos no ar, configuramos com os dados do seu negócio e mostramos como usar no dia a dia, no celular.',
      deliverable: 'O sistema funcionando, explicação simples de uso e acompanhamento para ajustar o que for preciso.',
      participation: 'Você usa na rotina e conta o que pode melhorar.',
    },
  ] satisfies ProcessStep[],
  principles: [
    { title: 'Nada de pacote pronto', text: 'Cada solução nasce da sua rotina, não de um modelo genérico.' },
    { title: 'Você acompanha tudo', text: 'Valida cada etapa e vê o sistema antes da entrega final.' },
    { title: 'Feito para o celular', text: 'Para você e para os seus clientes usarem onde estiverem.' },
  ],
};

export const about = {
  eyebrow: 'Quem está por trás',
  name: 'Pietro Cosentino',
  role: 'Fundador da PFC Soluções',
  bio: 'Pietro tem 9 anos de experiência em tecnologia, como Product Owner e analista de requisitos, de sistemas e funcional sênior, em projetos de educação, pagamentos e sistemas corporativos. Está cursando MBA em Inteligência Artificial para Negócios. A PFC Soluções leva esse olhar de negócio para quem não tem um time de tecnologia.',
  linkedin: 'https://www.linkedin.com/in/pietro-cosentino',
  portfolio: { href: 'https://www.pietrocosentino.com.br/', label: 'Ver trajetória completa' },
};

// Seção que ajuda a decidir entre sistema sob medida e aplicativo pronto.
export const comparison = {
  eyebrow: 'Sob medida ou pronto?',
  title: 'Sistema sob medida ou aplicativo pronto: qual vale mais para o seu negócio?',
  lead: 'Um aplicativo pronto serve quando a sua rotina é igual à da maioria. Um sistema sob medida vale quando você precisa juntar atendimento, agenda, cobrança e finanças sem planilha ou papel paralelo.',
  columns: ['Aplicativo pronto', 'Sistema sob medida'],
  rows: [
    { label: 'Para começar', ready: 'Rápido: você assina e configura', custom: 'Começa com um levantamento da sua rotina' },
    { label: 'Quem se adapta', ready: 'Você se adapta ao aplicativo', custom: 'O sistema se adapta ao seu jeito de trabalhar' },
    { label: 'Partes do negócio', ready: 'Costuma cobrir uma parte; o resto fica em planilha, papel ou WhatsApp', custom: 'Atendimento, agenda, cobrança e finanças juntos, sem digitar duas vezes' },
    { label: 'WhatsApp', ready: 'Depende do aplicativo e do plano', custom: 'Agente de IA que atende e agenda pelo WhatsApp, quando fizer sentido' },
    { label: 'Ajustes', ready: 'Pelo suporte, quando o recurso existe', custom: 'Você fala direto com quem construiu o sistema' },
    { label: 'Valor', ready: 'Mensalidade por plano', custom: 'Definido na proposta, antes de você decidir' },
  ],
  closing: 'Não sabe qual é o seu caso? No levantamento, a gente entende a sua rotina e diz com honestidade se a tecnologia resolve o seu problema e por onde vale começar.',
  more: 'Descobrir o que funciona para o meu negócio',
};

export const faq = {
  eyebrow: 'Dúvidas',
  title: 'Perguntas frequentes sobre sistemas sob medida',
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
      answer: 'Conte o seu problema. As soluções do site são exemplos: cada projeto é feito sob medida.',
    },
  ],
};

export const contactSection = {
  eyebrow: 'Contato',
  title: 'Vamos criar o sistema sob medida do seu negócio?',
  lead: 'Conte para a marcIA, nossa atendente, o que mais toma o seu tempo hoje. Ela entende o seu caso na hora e prepara tudo para o Pietro chegar já sabendo do que você precisa.',
};
