import type { Block } from 'payload'

export const homeBlocks: Block[] = [
  {
    slug: 'hero', labels: { singular: 'Hero', plural: 'Hero' },
    fields: [
      { name: 'kicker', type: 'text', required: true }, { name: 'title', type: 'textarea', required: true },
      { name: 'lead', type: 'textarea', required: true }, { name: 'legal', type: 'textarea' },
      { type: 'row', fields: [{ name: 'primaryButtonText', type: 'text' }, { name: 'primaryButtonUrl', type: 'text' }] },
      { type: 'row', fields: [{ name: 'secondaryButtonText', type: 'text' }, { name: 'secondaryButtonUrl', type: 'text' }] },
    ],
  },
  {
    slug: 'experience', labels: { singular: 'Experiencia', plural: 'Experiencia' },
    fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }, { name: 'features', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea', required: true }, { name: 'icon', type: 'text' }] }],
  },
  { slug: 'account', labels: { singular: 'Cuenta', plural: 'Cuenta' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }] },
  { slug: 'steps', labels: { singular: 'Pasos', plural: 'Pasos' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'list', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea', required: true }] }] },
  { slug: 'promo', labels: { singular: 'Promoción', plural: 'Promoción' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }, { name: 'button', type: 'text' }] },
  { slug: 'security', labels: { singular: 'Seguridad', plural: 'Seguridad' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }] },
  { slug: 'learn', labels: { singular: 'Educación', plural: 'Educación' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }] },
  { slug: 'newsletter', labels: { singular: 'Newsletter', plural: 'Newsletter' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }] },
  { slug: 'faq', labels: { singular: 'Preguntas frecuentes', plural: 'Preguntas frecuentes' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'list', type: 'array', fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }] }] },
  { slug: 'footer', labels: { singular: 'Footer', plural: 'Footer' }, fields: [{ name: 'copyright', type: 'text' }, { name: 'links', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true }] }] },
]

export const createLayoutFromLegacyFields = (value: Record<string, unknown>) => [
  { blockType: 'hero', kicker: value.heroKicker, title: value.heroTitle, lead: value.heroLead, legal: value.heroLegal, primaryButtonText: value.primaryButtonText, primaryButtonUrl: value.primaryButtonUrl, secondaryButtonText: value.secondaryButtonText, secondaryButtonUrl: value.secondaryButtonUrl },
  { blockType: 'experience', title: value.expTitle, lead: value.expLead, features: value.expFeatures },
  { blockType: 'account', title: value.accTitle, lead: value.accLead },
  { blockType: 'steps', title: value.stepsTitle, list: value.stepsList },
  { blockType: 'promo', title: value.promoTitle, lead: value.promoLead, button: value.promoButton },
  { blockType: 'security', title: value.secTitle, lead: value.secLead },
  { blockType: 'learn', title: value.learnTitle, lead: value.learnLead },
  { blockType: 'newsletter', title: value.newsTitle, lead: value.newsLead },
  { blockType: 'faq', title: value.faqTitle, list: value.faqList },
  { blockType: 'footer', copyright: value.footerCopyright, links: value.footerLinks },
]
