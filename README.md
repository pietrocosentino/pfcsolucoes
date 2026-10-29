# PFC Soluções em Tecnologia

Site institucional da PFC Soluções: agente de IA no WhatsApp, agendamento online, controle financeiro e sites profissionais para autônomos e pequenas empresas.

Feito com [Astro](https://astro.build): as páginas são HTML estático e só o atendente de IA (`/api/chat`) roda como função na Vercel. Publica na Vercel a cada push na `main`.

## marcIA, a atendente de IA

Os botões "Falar com a marcIA" abrem um chat com a marcIA, atendente de primeiro contato (Claude), que entende o negócio do visitante, indica a solução e, quando ele quer fechar, abre o WhatsApp do Pietro com um resumo pronto. Não há banco de dados: a conversa fica no navegador do visitante.

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
| Textos, serviços, perguntas, link de contato | `src/data/site.ts` |
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
  components/
    Logo                  monograma PFC em SVG
    Button                link com cara de botão (primary, secondary, inverse)
    Section               seção padrão com sobrancelha, título e texto
    SiteHeader, SiteFooter
    Hero, ChatMock        abertura com exemplo de conversa do agente
    WarningSigns          4 sinais de que o negócio perde dinheiro
    Solutions, SolutionCard
    ProcessSteps          levantamento, análise, processo, solução
    SocialLinks           ícones de WhatsApp e Instagram (número e @ só no link)
    ChatWidget            janela do atendente de IA
    About, Faq, ContactCta
  lib/assistant/         marcIA: conhecimento, instruções, chamada ao Claude, resumo do WhatsApp
  pages/index.astro       monta a página
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

- E-mail de contato entra quando o domínio próprio for registrado.
- Trocar `site` em `astro.config.mjs` quando o domínio próprio for registrado.
