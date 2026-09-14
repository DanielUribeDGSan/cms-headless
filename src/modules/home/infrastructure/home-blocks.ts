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
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'lead', type: 'textarea' },
      { name: 'features', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea', required: true }, { name: 'icon', type: 'text' }] },
      { name: 'reverseScenes', type: 'checkbox', label: 'Invertir escenas (oscuro a la izquierda)' },
      { name: 'reverseDownload', type: 'checkbox', label: 'Invertir barra de descarga (tiendas a la izquierda)' },
    ],
  },
  { slug: 'account', labels: { singular: 'Cuenta', plural: 'Cuenta' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }, { name: 'reverseLayout', type: 'checkbox', label: 'Invertir orden (Imagen izquierda)' }] },
  { slug: 'steps', labels: { singular: 'Pasos', plural: 'Pasos' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'list', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea', required: true }] }] },
  { slug: 'promo', labels: { singular: 'Promoción', plural: 'Promoción' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }, { name: 'button', type: 'text' }, { name: 'reverseLayout', type: 'checkbox', label: 'Invertir orden (Imagen izquierda)' }] },
  { slug: 'security', labels: { singular: 'Seguridad', plural: 'Seguridad' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }] },
  { slug: 'learn', labels: { singular: 'Educación', plural: 'Educación' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }] },
  { slug: 'newsletter', labels: { singular: 'Newsletter', plural: 'Newsletter' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'lead', type: 'textarea' }, { name: 'reverseLayout', type: 'checkbox', label: 'Invertir orden (Texto izquierda)' }] },
  { slug: 'faq', labels: { singular: 'Preguntas frecuentes', plural: 'Preguntas frecuentes' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'list', type: 'array', fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }] }] },
  { slug: 'footer', labels: { singular: 'Footer', plural: 'Footer' }, fields: [{ name: 'copyright', type: 'text' }, { name: 'links', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true }] }] },
]

export const createLayoutFromLegacyFields = (value: Record<string, unknown>) => [
  { blockType: 'hero', kicker: value.heroKicker || 'Bradesco llega a México', title: value.heroTitle || 'Tu dinero, en\nmovimiento\ncontigo.', lead: value.heroLead || 'Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.', legal: value.heroLegal || 'La información mostrada es ilustrativa.', primaryButtonText: value.primaryButtonText || 'Conoce la cuenta', primaryButtonUrl: value.primaryButtonUrl || '#cuenta', secondaryButtonText: value.secondaryButtonText || 'Descubre Bradesco', secondaryButtonUrl: value.secondaryButtonUrl || '#nosotros' },
  { blockType: 'experience', title: value.expTitle || 'Tu experiencia bancaria cambia con nosotros', lead: value.expLead || 'Creemos que las finanzas no deben de ser complejas', features: value.expFeatures || [], reverseScenes: value.expReverseScenes, reverseDownload: value.expReverseDownload },
  { blockType: 'account', title: value.accTitle || 'Beneficios de cuenta digital.', lead: value.accLead || 'Un lugar en el que controlas tus movimientos diarios', reverseLayout: value.accReverseLayout },
  { blockType: 'steps', title: value.stepsTitle || 'Tu cuenta Bradesco es tuya en 3 pasos', list: value.stepsList || [] },
  { blockType: 'promo', title: value.promoTitle || 'Únete a Bradesco en México', lead: value.promoLead || 'Se de los primeros en probar un banco distinto.', button: value.promoButton || 'Ser de los primeros', reverseLayout: value.promoReverseLayout },
  { blockType: 'security', title: value.secTitle || 'Con la seguridad y confianza', lead: value.secLead || 'Tus datos están protegidos.' },
  { blockType: 'learn', title: value.learnTitle || 'Aprende y planifica', lead: value.learnLead || 'Te ayudamos a alcanzar tus metas.' },
  { blockType: 'newsletter', title: value.newsTitle || 'Suscríbete', lead: value.newsLead || 'Recibe noticias', reverseLayout: value.newsReverseLayout },
  { blockType: 'faq', title: value.faqTitle || 'Preguntas frecuentes', list: value.faqList || [] },
  { blockType: 'footer', copyright: value.footerCopyright || '© 2024 Bradesco.', links: value.footerLinks || [] },
]
