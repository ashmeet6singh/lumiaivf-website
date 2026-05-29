/**
 * Inline text can be a plain string or a sequence of tokens, where a token is
 * either a plain string or a link. Links with an http(s) href open in a new tab;
 * links with an internal href (starting with "/") navigate in the same tab.
 */
export type InlineToken = string | { text: string; href: string }
export type RichText = string | InlineToken[]

export type Block =
  | { type: 'p'; text: RichText }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'list'; ordered?: boolean; items: RichText[] }
  | { type: 'callout'; variant: 'info' | 'warning'; text: string }
  | { type: 'quote'; text: string; cite?: string }

export interface FaqItem {
  question: string
  answer: string
}

export interface Article {
  slug: string
  title: string
  metaDescription: string
  keywordTarget: string[]
  hero: {
    eyebrow?: string
    subtitle?: string
    image?: string
  }
  readingTime: number
  datePublished: string
  dateModified?: string
  sections: Block[]
  faq: FaqItem[]
  disclaimer: string
}
