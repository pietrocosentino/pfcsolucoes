# PFC Soluções em Tecnologia

Site institucional da PFC Soluções: agente de IA no WhatsApp, agendamento online, controle financeiro e sites profissionais para autônomos e pequenas empresas.

Feito com [Astro](https://astro.build): o resultado é HTML estático, sem JavaScript no navegador. Publica na Vercel a cada push na `main`.

## Comandos

```sh
npm install      # instala as dependências (Node 22+)
npm run dev      # servidor local em http://localhost:4321
npm run build    # gera o site em dist/
npm run check    # verificação de tipos
npm test         # build + testes do HTML gerado
```

## Onde mexer

| Quero mudar… | Arquivo |
|---|---|
| Textos, serviços, perguntas, link de contato | `src/data/site.ts` |
| Cores, fontes e espaçamentos | `src/styles/tokens.css` |
| Ordem das seções | `src/pages/index.astro` |
| Metatags e prévia de compartilhamento | `src/layouts/BaseLayout.astro` |
| Domínio do site | `astro.config.mjs` (`site`) |

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
    About, Faq, ContactCta
  pages/index.astro       monta a página
public/                   favicon, ícone do celular, imagem de prévia e logo
tests/                    testes do HTML gerado (node:test)
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
