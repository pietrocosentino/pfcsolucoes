# PFC Soluções em Tecnologia

Site institucional da PFC Soluções: agente de IA no WhatsApp, agendamento online, controle financeiro e sites profissionais para autônomos e pequenas empresas.

Feito com [Astro](https://astro.build): as páginas são HTML estático e só o atendente de IA (`/api/chat`) roda como função na Vercel. Publica na Vercel a cada push na `main`.

## marcIA, a atendente de IA

Os botões "Falar com a marcIA" abrem um chat com a marcIA, atendente de primeiro contato (Claude), que entende o negócio do visitante, indica a solução e, quando ele quer fechar, abre o WhatsApp do Pietro com um resumo pronto. Não há banco de dados: a conversa fica no navegador do visitante e é apagada depois de 5 minutos sem atividade.

- Conhecimento: o mesmo `src/data/site.ts` do site, então o atendente nunca diz algo diferente do que está publicado.
- Contexto da empresa, lógica de trabalho, detalhes de cada solução, regras de negócio e respostas a objeções: `src/lib/assistant/knowledge.ts`. Ao mudar uma regra comercial, atualize esse arquivo.
- Montagem das instruções: `src/lib/assistant/prompt.ts`.
- Ativação: crie a variável `ANTHROPIC_API_KEY` em Vercel → Settings → Environment Variables (Production e Preview) e faça um novo deploy. Sem a chave, o chat avisa que está fora do ar e oferece o WhatsApp.
- Custo: defina um limite mensal de gastos no console da Anthropic. O endpoint também limita tamanho de mensagem, número de turnos e mensagens por aparelho.

## Comandos

```sh
npm install      # instala as dependências (Node 22+)
npm run dev      # servidor local em http://localhost:4321
npm run build    # gera o site em dist/
npm run check    # verificação de tipos
npm test         # build + testes do HTML e do atendente
```

## Onde mexer

| Quero mudar… | Arquivo |
|---|---|
| Textos, serviços, perguntas, menu e rodapé | `src/data/site.ts` |
| Quem somos e Política de privacidade | `src/data/institutional.ts` |
| Cores, fontes e espaçamentos | `src/styles/tokens.css` |
| Ordem das seções | `src/pages/index.astro` |
| Metatags e prévia de compartilhamento | `src/layouts/BaseLayout.astro` |
| Domínio do site | `astro.config.mjs` (`site`) |
| O que a marcIA sabe e as regras dela | `src/lib/assistant/knowledge.ts` |

## Estrutura

```
src/
  data/site.ts            todo o conteúdo do site
  styles/                 tokens (claro e escuro) e estilos globais
  layouts/BaseLayout      <head>, metatags, link "pular para o conteúdo"
  layouts/SiteLayout      cabeçalho, rodapé e marcIA em todas as páginas
  components/
    Logo                  monograma PFC em SVG
    Button                link com cara de botão (primary, secondary, inverse)
    Section               seção padrão com sobrancelha, título e texto
    SiteHeader, SiteFooter
    Hero                  primeira dobra: problema, resultado, próximo passo e "hoje × com a PFC"
    WarningSigns          o que faz o cliente ir para a concorrência (dados com fonte)
    Solutions, SolutionCard
    ProcessSteps          4 etapas com entregas, participação do cliente e compromissos
    SocialLinks           ícone do Instagram no rodapé (o WhatsApp fica com a marcIA)
    PageIntro             abertura das páginas internas
    ChatWidget            janela do atendente de IA
    About, Faq, ContactCta
  lib/assistant/         marcIA: conhecimento, instruções, chamada ao Claude, resumo do WhatsApp
  pages/index.astro       página inicial
  pages/sobre.astro       Quem somos
  pages/privacidade.astro Política de privacidade (LGPD)
  pages/api/chat.ts       endpoint do atendente (função na Vercel)
public/                   favicon, ícone do celular, imagem de prévia e logo
tests/                    testes do HTML gerado e do atendente (node:test)
```

## Identidade visual

| Elemento | Cor |
|---|---|
| P (letra grande) | Azul-marinho `#1B2A4A` |
| F (letra média) | Coral `#F2542D` |
| C (letra pequena) | Azul claro `#5674AE` |
| Fundo | Sálvia `#E4EBE2` |

Fonte: Inter. O coral puro é usado no logo e no contorno de foco; em textos e botões ele é escurecido (`#B5391A` / `#C8401D`) para atingir o contraste mínimo de leitura (WCAG AA).

## Pendências

- Domínio `pfcsolucoes.com.br` já cadastrado no projeto da Vercel (o `www` redireciona para ele). Falta configurar o DNS no Registro.br: dois registros A na raiz (`216.198.79.1` e `64.29.17.1`) e um CNAME `www` → `4bf2da81ffced067.vercel-dns-017.com.`.
- Depois que o domínio responder: trocar `site` em `astro.config.mjs` para `https://pfcsolucoes.com.br` e atualizar o link da bio do Instagram.
- E-mail de contato com o domínio próprio, quando for criado.
