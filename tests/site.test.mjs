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
  const targets = tags('a').map((t) => attr(t, 'href')).filter((h) => h?.startsWith('#'));
  assert.ok(targets.length > 0);
  for (const href of targets) assert.ok(ids.has(href.slice(1)), `âncora quebrada: ${href}`);
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
  assert.doesNotMatch(text, /98459|@pfc/i);
});

test('ícones de contato levam ao WhatsApp e ao Instagram', () => {
  const hrefs = tags('a').map((t) => attr(t, 'href') ?? '');
  assert.ok(hrefs.some((h) => h.startsWith('https://wa.me/5511984597523')));
  assert.ok(hrefs.some((h) => h.startsWith('https://www.instagram.com/pfc.solucoes')));
});
