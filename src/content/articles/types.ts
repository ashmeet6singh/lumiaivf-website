export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
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
