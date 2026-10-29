// Conteúdo das páginas institucionais (Quem somos e Política de privacidade).
// A marcIA também usa o "Quem somos", então ele precisa refletir a realidade.

export const aboutPage = {
  title: 'Quem somos',
  lead: 'A PFC Soluções em Tecnologia cria sistemas sob medida para autônomos e pequenas empresas. O objetivo é simples: tirar do dono o trabalho repetitivo para ele se dedicar aos clientes.',
  story: {
    title: 'De onde vem o nome',
    paragraphs: [
      'PFC são as iniciais do fundador, Pietro Cosentino. A empresa nasceu da experiência dele como analista de requisitos, de sistemas e funcional, em projetos de educação, pagamentos e sistemas corporativos.',
      'Nesses projetos, tudo começa entendendo o negócio antes de escrever código. A PFC leva esse mesmo cuidado para quem não tem um time de tecnologia: o barbeiro, a manicure, o personal trainer, o consultório, o prestador de serviço.',
    ],
  },
  purpose: {
    title: 'O que nos move',
    text: 'Quem trabalha sozinho ou com uma equipe pequena perde cliente por não conseguir responder a tempo, perde horário por esquecimento e perde dinheiro por não saber quanto sobra no mês. A tecnologia que resolve isso existe, mas costuma ser cara, genérica ou complicada. Nosso trabalho é torná-la sob medida, simples e acessível.',
  },
  values: [
    { title: 'Problema primeiro', text: 'Entendemos a sua rotina antes de propor qualquer sistema.' },
    { title: 'Sem surpresas', text: 'Escopo, prazo e investimento combinados antes de começar.' },
    { title: 'Simples de usar', text: 'Tudo pensado para quem não é da área de tecnologia.' },
    { title: 'Perto de você', text: 'Você fala direto com quem constrói o seu sistema.' },
  ],
  built: {
    title: 'O que já construímos',
    items: [
      'Agente de IA que atende e agenda pelo WhatsApp',
      'Agenda online para barbearia',
      'App de finanças para Android e iPhone',
      'Site de consultoria para personal trainer',
      'Este site, com a marcIA no atendimento',
    ],
  },
};

export const privacyPage = {
  title: 'Política de privacidade',
  updatedAt: '28 de outubro de 2026',
  lead: 'Explicamos aqui, de forma direta, quais dados pessoais este site trata, para quê e quais são os seus direitos, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
  sections: [
    {
      title: 'Quem é o responsável',
      paragraphs: [
        'O responsável pelos dados tratados neste site é a PFC Soluções em Tecnologia, representada por Pietro Cosentino. Para qualquer assunto sobre os seus dados, use os canais indicados em "Como falar com a gente".',
      ],
    },
    {
      title: 'Quais dados tratamos e para quê',
      items: [
        'Conversa com a marcIA: o texto das mensagens que você escreve no chat. Usamos para responder às suas dúvidas e, se você quiser, preparar o resumo que vai para o WhatsApp. Não pedimos dados sensíveis, como CPF, dados bancários ou de saúde; evite enviá-los.',
        'Encaminhamento para o WhatsApp: só acontece se você tocar no botão. A mensagem com o resumo é enviada por você, pelo seu WhatsApp, e passa a seguir também as regras do WhatsApp. Usamos o seu nome, o seu negócio e a sua necessidade para responder e preparar a proposta.',
        'Dados técnicos de acesso: como em qualquer site, a hospedagem registra informações como endereço IP, data e hora e tipo de navegador, para manter o site funcionando e seguro. O endereço IP também é usado por alguns minutos para limitar excesso de mensagens no chat.',
      ],
    },
    {
      title: 'Com quem os dados são compartilhados',
      items: [
        'Anthropic, empresa que fornece a inteligência artificial da marcIA: recebe o texto da conversa para gerar as respostas. O processamento acontece em servidores fora do Brasil.',
        'Vercel, empresa que hospeda o site: processa os dados técnicos de acesso. Também fica fora do Brasil.',
        'Google Fonts: o site carrega a fonte de texto a partir dos servidores do Google, que recebem o endereço IP do seu acesso.',
        'Meta (WhatsApp e Instagram): somente quando você escolhe falar com a gente por esses aplicativos.',
        'Não vendemos nem cedemos seus dados para publicidade.',
      ],
    },
    {
      title: 'Por quanto tempo guardamos',
      items: [
        'A conversa com a marcIA não é guardada em banco de dados da PFC. Ela fica salva só no seu navegador e é apagada depois de 5 minutos sem atividade ou quando você fecha a aba. O provedor de IA trata o texto conforme as políticas dele.',
        'As conversas pelo WhatsApp ficam guardadas enquanto forem necessárias para o atendimento, a proposta e a relação comercial, ou pelo prazo exigido por lei.',
        'Os dados técnicos de acesso seguem os prazos da hospedagem.',
      ],
    },
    {
      title: 'Por que podemos tratar esses dados',
      paragraphs: [
        'Tratamos os dados da conversa e do encaminhamento para atender ao seu pedido de informações e de proposta, ou seja, para procedimentos anteriores a um contrato feitos a seu pedido (art. 7º, V, da LGPD). Os dados técnicos de acesso são tratados pelo nosso legítimo interesse em manter o site seguro e funcionando (art. 7º, IX).',
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        'Este site não usa cookies de publicidade nem ferramentas de rastreamento. O chat guarda a conversa apenas no armazenamento da sessão do seu navegador, para ela não se perder se você recarregar a página.',
      ],
    },
    {
      title: 'Seus direitos',
      paragraphs: [
        'Você pode pedir a confirmação de que tratamos seus dados, o acesso, a correção, a exclusão, a portabilidade e informações sobre o compartilhamento, além de se opor a um tratamento (art. 18 da LGPD). Respondemos o mais breve possível, dentro dos prazos da lei. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).',
      ],
    },
    {
      title: 'Como falar com a gente',
      paragraphs: [
        'Peça para a marcIA falar com o Pietro (é só abrir o chat) ou mande uma mensagem no direct do Instagram @pfc.solucoes.',
      ],
    },
    {
      title: 'Mudanças nesta política',
      paragraphs: [
        'Se mudarmos a forma de tratar dados, atualizamos esta página e a data no topo.',
      ],
    },
  ],
};
