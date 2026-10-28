import { defineConfig } from 'astro/config';

// Endereço público usado nas metatags (prévia de links no WhatsApp e redes sociais).
// Troque pelo domínio próprio quando ele for registrado.
export default defineConfig({
  site: 'https://pfcsolucoes.vercel.app',
  build: { inlineStylesheets: 'always' },
});
