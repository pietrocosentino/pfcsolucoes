import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// Endereço público usado nas metatags (og:image, canonical).
// Troque pelo domínio próprio quando ele for registrado.
export default defineConfig({
  site: 'https://pfcsolucoes.vercel.app',
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
