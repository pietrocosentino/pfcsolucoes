// Dados estruturados (schema.org) gerados a partir do mesmo texto que aparece na
// tela: se uma pergunta ou página mudar, a marcação muda junto.
import { faq } from '../data/site.ts';

const site = 'https://pfcsolucoes.com.br';

export type Schema = Record<string, unknown>;

// Perguntas frequentes da página inicial.
export const faqSchema: Schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

// Caminho de navegação: Início › página atual.
export function breadcrumbSchema(name: string, path: string): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name, item: `${site}${path}` },
    ],
  };
}
