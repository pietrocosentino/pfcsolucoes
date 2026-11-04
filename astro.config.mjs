import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Endereço público usado nas metatags (og:image, canonical).
export default defineConfig({
  site: 'https://pfcsolucoes.com.br',
  // URLs sem barra no fim (/sobre), iguais aos links internos e ao canonical.
  trailingSlash: 'never',
  // Mapa do site para o Google; a página 404 fica de fora.
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  // O site é estático; só /api/chat roda como função na Vercel.
  adapter: vercel(),
  build: { inlineStylesheets: 'always' },
  env: {
    schema: {
      // Chave da API da Anthropic, configurada nas variáveis de ambiente da Vercel.
      // Sem ela o site funciona e o chat oferece o WhatsApp.
      ANTHROPIC_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
