// Verificações rápidas no HTML gerado. Rode com `npm test` (faz o build antes).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync(new URL('../dist/client/index.html', import.meta.url), 'utf8');
const tags = (name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];

test('idioma da página é pt-BR', () => {
  assert.match(html, /<html[^>]*lang="pt-BR"/);
});

test('existe exatamente um h1', () => {
  assert.equal(tags('h1').length, 1);
});

test('toda âncora interna aponta para um id existente', () => {
  const ids = new Set(tags('[a-z0-9]+').map((t) => attr(t, 'id')).filter(Boolean));
  const targets = tags('a').map((t) => attr(t, 'href')).filter((h) => h?.startsWith('#') || h?.startsWith('/#'));
  assert.ok(targets.length > 0);
  for (const href of targets) assert.ok(ids.has(href.split('#')[1]), `âncora quebrada: ${href}`);
});

test('links para páginas internas levam a páginas que existem', () => {
  const pages = tags('a').map((t) => attr(t, 'href')).filter((h) => /^\/[a-z]/.test(h ?? ''));
  assert.ok(pages.includes('/sobre') && pages.includes('/privacidade'));
  for (const href of new Set(pages)) {
    assert.ok(existsSync(new URL(`../dist/client${href}/index.html`, import.meta.url)), `página inexistente: ${href}`);
  }
});

test('páginas institucionais têm um h1 e o rodapé completo', () => {
  for (const page of ['sobre', 'privacidade']) {
    const doc = readFileSync(new URL(`../dist/client/${page}/index.html`, import.meta.url), 'utf8');
    assert.equal((doc.match(/<h1\b/g) ?? []).length, 1, page);
    assert.match(doc, /Política de privacidade/);
    assert.match(doc, /id="chat-panel"/, `${page} sem a marcIA`);
  }
});

test('links que abrem nova aba usam rel noopener', () => {
  for (const tag of tags('a').filter((t) => attr(t, 'target') === '_blank')) {
    assert.match(attr(tag, 'rel') ?? '', /noopener/, tag);
  }
});

test('imagens têm texto alternativo', () => {
  for (const tag of tags('img')) assert.notEqual(attr(tag, 'alt'), undefined, tag);
});

test('og:image é endereço absoluto e o arquivo existe', () => {
  const og = tags('meta').find((t) => attr(t, 'property') === 'og:image');
  const url = attr(og, 'content');
  assert.match(url, /^https:\/\//);
  assert.ok(existsSync(new URL(`../dist/client${new URL(url).pathname}`, import.meta.url)));
});

test('nenhum estilo inline sobrou no HTML', () => {
  assert.equal(tags('[a-z]+').filter((t) => /\sstyle="/i.test(t)).length, 0);
});

test('número do WhatsApp e @ do Instagram não aparecem como texto', () => {
  const body = html.slice(html.indexOf('<body'));
  const text = body.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
  assert.doesNotMatch(text, /98459|@pfc\.solucoes/i);
});

test('rodapé leva ao Instagram e não mostra o WhatsApp', () => {
  const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));
  assert.match(footer, /https:\/\/www\.instagram\.com\/pfc\.solucoes/);
  assert.doesNotMatch(footer, /wa\.me/);
});

test('poucos botões de conversa: topo e contato, além do botão flutuante e do link no rodapé', () => {
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const ctas = main.match(/<a\b[^>]*data-chat-open[^>]*>/g) ?? [];
  assert.equal(ctas.length, 2);
});

test('robots.txt libera o site e aponta o sitemap', () => {
  const robots = readFileSync(new URL('../dist/client/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/pfcsolucoes\.com\.br\/sitemap-index\.xml/);
});

test('sitemap lista as páginas sem barra no fim e sem a 404', () => {
  const sitemap = readFileSync(new URL('../dist/client/sitemap-0.xml', import.meta.url), 'utf8');
  for (const url of ['https://pfcsolucoes.com.br/</loc>', '/sobre</loc>', '/privacidade</loc>']) assert.ok(sitemap.includes(url), url);
  assert.doesNotMatch(sitemap, /404/);
  assert.doesNotMatch(sitemap, /\/sobre\/</);
});

test('canonical sem barra no fim, igual aos links internos', () => {
  const doc = readFileSync(new URL('../dist/client/sobre/index.html', import.meta.url), 'utf8');
  assert.match(doc, /<link rel="canonical" href="https:\/\/pfcsolucoes\.com\.br\/sobre">/);
});

test('título da home tem os termos de busca e o h1 diz o que a empresa faz', () => {
  assert.match(html, /<title>Sistemas sob medida para pequenas empresas \| PFC Soluções<\/title>/);
  const h1 = html.match(/<h1\b[\s\S]*?<\/h1>/)[0];
  assert.match(h1, /Sistemas sob medida para autônomos e pequenas empresas/);
});

test('dados estruturados da empresa são JSON válido', () => {
  const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const data = JSON.parse(raw);
  const org = data['@graph'].find((n) => n['@type'] === 'Organization');
  assert.equal(org.email, 'contato@pfcsolucoes.com.br');
  assert.equal(org.url, 'https://pfcsolucoes.com.br/');
});

test('página 404 existe, tem um h1 e não é indexada', () => {
  const doc = readFileSync(new URL('../dist/client/404.html', import.meta.url), 'utf8');
  assert.equal((doc.match(/<h1\b/g) ?? []).length, 1);
  assert.match(doc, /<meta name="robots" content="noindex">/);
  assert.doesNotMatch(doc, /rel="canonical"/);
});

test('fonte servida pelo próprio site, sem Google Fonts', () => {
  assert.doesNotMatch(html, /fonts\.googleapis|fonts\.gstatic/);
  assert.match(html, /@font-face/);
});

test('CNPJ aparece no rodapé e nos dados estruturados', () => {
  const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));
  assert.match(footer, /CNPJ 44\.404\.492\/0001-56/);
  assert.match(html, /"taxID":"44\.404\.492\/0001-56"/);
});
