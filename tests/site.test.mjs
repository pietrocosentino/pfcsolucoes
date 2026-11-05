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
  const pages = tags('a').map((t) => attr(t, 'href')?.split('#')[0]).filter((h) => /^\/[a-z]/.test(h ?? ''));
  assert.ok(pages.includes('/sobre') && pages.includes('/privacidade'));
  for (const href of new Set(pages)) {
    assert.ok(existsSync(new URL(`../dist/client${href}/index.html`, import.meta.url)), `página inexistente: ${href}`);
  }
});

test('páginas institucionais têm um h1 e o rodapé completo', () => {
  for (const page of ['sobre', 'privacidade', 'condicoes']) {
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

test('chamadas para a marcIA: topo e contato', () => {
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const ctas = main.match(/<a\b[^>]*data-chat-open[^>]*>/g) ?? [];
  assert.ok(ctas.length >= 2);
  for (const tag of ctas) assert.match(tag, /href="https:\/\/wa\.me\//, 'sem JavaScript, o link leva ao WhatsApp');
});

test('home não promete prazo nem indicar solução pronta', () => {
  assert.doesNotMatch(html, /7 dias/);
  assert.doesNotMatch(html, /solução pronta já resolve/);
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
  assert.match(h1, /Sistemas sob medida para pequenos negócios/);
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

test('títulos e descrições cabem no limite do Google', () => {
  for (const page of ['index.html', 'sobre/index.html', 'privacidade/index.html']) {
    const doc = readFileSync(new URL(`../dist/client/${page}`, import.meta.url), 'utf8');
    const title = doc.match(/<title>(.*?)<\/title>/)[1];
    const desc = doc.match(/<meta name="description" content="([^"]*)"/)[1];
    assert.ok(title.length <= 60, `${page}: título com ${title.length}`);
    assert.ok(desc.length <= 155, `${page}: descrição com ${desc.length}`);
  }
  assert.match(html, /content="Pare de perder clientes/);
});

const ldBlocks = (doc) =>
  [...doc.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

test('perguntas frequentes da home viram FAQPage igual ao texto da tela', () => {
  const faqLd = ldBlocks(html).find((b) => b['@type'] === 'FAQPage');
  assert.ok(faqLd, 'sem FAQPage');
  assert.ok(faqLd.mainEntity.length >= 6);
  for (const q of faqLd.mainEntity) {
    assert.ok(html.includes(q.name), `pergunta fora da tela: ${q.name}`);
    assert.ok(html.includes(q.acceptedAnswer.text), `resposta fora da tela: ${q.name}`);
  }
});

test('páginas internas têm navegação estruturada (breadcrumb)', () => {
  for (const [page, name, url] of [['sobre', 'Quem somos', 'https://pfcsolucoes.com.br/sobre'], ['privacidade', 'Política de privacidade', 'https://pfcsolucoes.com.br/privacidade']]) {
    const doc = readFileSync(new URL(`../dist/client/${page}/index.html`, import.meta.url), 'utf8');
    const crumb = ldBlocks(doc).find((b) => b['@type'] === 'BreadcrumbList');
    assert.ok(crumb, page);
    assert.deepEqual(crumb.itemListElement.map((i) => i.name), ['Início', name]);
    assert.equal(crumb.itemListElement[1].item, url);
  }
  assert.ok(!ldBlocks(html).some((b) => b['@type'] === 'BreadcrumbList'), 'home não precisa de breadcrumb');
});

test('fontes pré-carregadas são as mesmas que o CSS usa', () => {
  const preloads = [...html.matchAll(/<link rel="preload" href="([^"]+\.woff2)"/g)].map((m) => m[1]);
  assert.equal(preloads.length, 2);
  for (const href of preloads) assert.ok(html.includes(`url(${href})`), `preload sem @font-face: ${href}`);
  assert.doesNotMatch(html, /inter-latin-500/);
});

test('arquivos com hash ficam em cache por um ano na Vercel', () => {
  const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  const rule = vercel.headers.find((h) => h.source === '/_astro/(.*)');
  assert.match(rule.headers[0].value, /max-age=31536000, immutable/);
});

test('logo do topo tem o mesmo nome visível e leva à página inicial fora dela', () => {
  const header = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
  assert.doesNotMatch(header.match(/<a class="brand"[^>]*>/)[0], /aria-label/);
  const sobre = readFileSync(new URL('../dist/client/sobre/index.html', import.meta.url), 'utf8');
  assert.match(sobre, /<a class="brand" href="\/"/);
});

test('títulos das seções usam a palavra-chave e sinônimos', () => {
  const h2 = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, ''));
  assert.ok(h2.some((t) => /sob medida/i.test(t)), h2.join(' | '));
  assert.ok(h2.some((t) => /aplicativo pronto/i.test(t)));
  const h3 = [...html.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => m[1]);
  assert.ok(h3.includes('Agente de IA no WhatsApp'));
  assert.ok(h3.includes('O que é um sistema sob medida?'));
});

test('Quem somos linka para a página inicial com a palavra-chave', () => {
  const sobre = readFileSync(new URL('../dist/client/sobre/index.html', import.meta.url), 'utf8');
  assert.match(sobre, /<a href="\/"[^>]*>sistemas sob medida para autônomos e pequenas empresas<\/a>/);
});

test('frase que define a empresa aparece na página inicial', () => {
  assert.match(html, /A PFC Soluções em Tecnologia foi fundada por Pietro Cosentino/);
});


test('comparação em tabela com cabeçalhos de linha e coluna', () => {
  const table = html.match(/<table[\s\S]*?<\/table>/)[0];
  assert.equal((table.match(/<th scope="col"/g) ?? []).length, 2);
  assert.ok((table.match(/<th scope="row"/g) ?? []).length >= 4);
});

test('dados estruturados trazem o fundador e a data da página', () => {
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const person = graph.find((n) => n['@type'] === 'Person');
  assert.ok(person.sameAs.includes('https://www.linkedin.com/in/pietro-cosentino'));
  const page = graph.find((n) => n['@type'] === 'WebPage');
  assert.match(page.dateModified, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(graph.find((n) => n['@type'] === 'Organization').founder['@id'], person['@id']);
});

test('rodapé sem data de atualização visível (a data fica nos dados estruturados)', () => {
  assert.doesNotMatch(html, /Atualizado em/);
  assert.match(html, /"dateModified":"\d{4}-\d{2}-\d{2}"/);
});

test('llms.txt e chave do IndexNow são publicados', () => {
  const llms = readFileSync(new URL('../dist/client/llms.txt', import.meta.url), 'utf8');
  assert.match(llms, /^# PFC Soluções em Tecnologia/);
  const wf = readFileSync(new URL('../.github/workflows/indexnow.yml', import.meta.url), 'utf8');
  const key = wf.match(/"key\\":\\"([0-9a-f]{32})/)?.[1] ?? wf.match(/public\/([0-9a-f]{32})\.txt/)[1];
  assert.equal(readFileSync(new URL(`../dist/client/${key}.txt`, import.meta.url), 'utf8'), key);
});

test('topo sem aspas de depoimento e sem pílulas', () => {
  const hero = html.slice(html.indexOf('id="inicio"'), html.indexOf('id="solucoes"'));
  assert.doesNotMatch(hero, /[“”]/);
  assert.doesNotMatch(hero, /class="proof"/);
});


test('chat começa com pergunta aberta, sem respostas prontas', () => {
  assert.doesNotMatch(html, /data-suggestions|class="suggestion"/);
});

test('"escopo, prazo" aparece uma vez só na página inicial', () => {
  const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ').toLowerCase();
  assert.equal(text.split('escopo, prazo').length - 1, 1);
});

test('sem a linha laranja nas seções (só no topo) e sem repetir "sob medida"', () => {
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  assert.equal((main.match(/class="eyebrow"/g) ?? []).length, 0);
  const text = main.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ').toLowerCase();
  assert.ok(text.split('sob medida').length - 1 <= 10);
});

test('agente de IA em destaque e listas sem ícone repetido', () => {
  assert.match(html, /class="card featured"/);
  assert.doesNotMatch(html, /class="principles"/);
});

test('página inicial sem dados de terceiros e com faixa dos tipos de negócio', () => {
  assert.doesNotMatch(html, /id="sinais"/);
  assert.match(html, /barbearias, salões, clínicas de estética, personal trainers e prestadores de serviço/);
});

test('topo mostra o print real da marcIA, com texto alternativo e prioridade', () => {
  const hero = html.slice(html.indexOf('id="inicio"'), html.indexOf('</section>', html.indexOf('id="inicio"')));
  const img = hero.match(/<img\b[^>]*>/)[0];
  assert.match(img, /alt="Conversa no chat/);
  assert.match(img, /fetchpriority="high"/);
});

test('soluções têm print real e o site não mostra foto do fundador', () => {
  assert.ok((html.match(/<figure class="shot/g) ?? []).length >= 2);
  assert.doesNotMatch(html, /pietro-cosentino\./);
});

test('preço e prazo do site aparecem nas perguntas frequentes', () => {
  assert.match(html, /Site profissional a partir de R\$ 700/);
  assert.match(html, /R\$ 200 por mês/);
  assert.doesNotMatch(html, /R\$ 150/);
  assert.doesNotMatch(html, /R\$ 1\.500/);
  assert.match(html, /em até 10 dias depois que você aprova a versão final/);
  assert.match(html, /a partir de 15 dias depois que você valida/);
  assert.doesNotMatch(html, /PREENCHER/);
});

test('site do personal trainer não aparece enquanto o cliente não autorizar', () => {
  const sobre = readFileSync(new URL('../dist/client/sobre/index.html', import.meta.url), 'utf8');
  for (const page of [html, sobre]) assert.doesNotMatch(page, /consultoria para personal trainer/i);
});

test('botão principal diz que é atendimento virtual', () => {
  assert.match(html, />\s*Falar com a atendente virtual\s*</);
});

test('razão social e CNPJ em Quem somos; rodapé com CNPJ e link para os dados da empresa', () => {
  assert.match(html, /href="\/sobre#empresa"/);
  const sobre = readFileSync(new URL('../dist/client/sobre/index.html', import.meta.url), 'utf8');
  for (const page of [html, sobre]) {
    assert.match(page, /Pietro F\. Cosentino Desenvolvimento de Software Ltda/);
    assert.match(page, /44\.404\.492\/0001-56/);
  }
  assert.match(html, /"legalName":"Pietro F\. Cosentino Desenvolvimento de Software Ltda"/);
});

test('cabeçalhos de segurança configurados', () => {
  const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  const keys = vercel.headers.flatMap((h) => h.headers.map((x) => x.key));
  for (const k of ['Content-Security-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'X-Frame-Options']) assert.ok(keys.includes(k), k);
});

test('Quem somos traz a trajetória no próprio site, sem mandar para o site pessoal', () => {
  const sobre = readFileSync(new URL('../dist/client/sobre/index.html', import.meta.url), 'utf8');
  assert.match(sobre, /class="trajectory"/);
  assert.doesNotMatch(sobre, /<a[^>]+href="https:\/\/www\.pietrocosentino\.com\.br\/"/);
});

test('condições do site ficam em página própria, fora do FAQ de venda', () => {
  const cond = readFileSync(new URL('../dist/client/condicoes/index.html', import.meta.url), 'utf8');
  for (const t of [/R\$ 700/, /R\$ 200 por mês/, /CPF ou CNPJ/, /de autoria da PFC/, /o site sai do ar/]) assert.match(cond, t);
  assert.doesNotMatch(html, /Recebo o código do site\?/);
  assert.match(html, /href="\/condicoes"/);
});

test('logo usa só cores da paleta e soluções se apresentam como demonstração', () => {
  const favicon = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');
  assert.doesNotMatch(favicon + html, /#5674AE|#F2542D/i);
  assert.match(html, /projetos de demonstração construídos pela PFC/i);
});

test('rodapé e dados estruturados levam à página da empresa no LinkedIn', () => {
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/company\/pfc-solucoes\/"/);
  assert.match(html, /"sameAs":\["https:\/\/www\.instagram\.com\/pfc\.solucoes\/","https:\/\/www\.linkedin\.com\/company\/pfc-solucoes\/"\]/);
});

test('agendar conversa no topo, no contato e no rodapé, abrindo em nova aba', () => {
  const links = tags('a').filter((t) => /calendar\.google\.com\/calendar\/appointments\/schedules\//.test(t));
  assert.ok(links.length >= 3, `só ${links.length} links de agenda`);
  for (const t of links) assert.match(t, /rel="noopener noreferrer"/);
});

test('rodapé sem coluna repetida de soluções e sem redes duplicadas em texto', () => {
  const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));
  assert.doesNotMatch(footer, /href="\/#solucao-/);
  assert.equal((footer.match(/instagram\.com\/pfc\.solucoes/g) ?? []).length, 1);
});
