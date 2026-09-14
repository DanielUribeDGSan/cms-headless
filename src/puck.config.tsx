'use client'

import type { Config, Slot } from '@puckeditor/core'
import { SiteHeader } from '@/themes/legacy-elementor/components/SiteHeader'
import { SiteFooter } from '@/themes/legacy-elementor/components/SiteFooter'
import { HeroSection } from '@/themes/legacy-elementor/components/HeroSection'
import { AccountSection } from '@/themes/legacy-elementor/components/AccountSection'
import { PromoSection } from '@/themes/legacy-elementor/components/PromoSection'
import { SecuritySection } from '@/themes/legacy-elementor/components/SecuritySection'
import { LearnSection } from '@/themes/legacy-elementor/components/LearnSection'
import { NewsletterSection } from '@/themes/legacy-elementor/components/NewsletterSection'
import { FaqSection } from '@/themes/legacy-elementor/components/FaqSection'
import { FinalSection } from '@/themes/legacy-elementor/components/FinalSection'

type Props = {
  HeroBlock: {
    kicker: string
    title: string
    lead: string
    legal: string
    primaryButtonText: string
    primaryButtonUrl: string
    secondaryButtonText: string
    secondaryButtonUrl: string
  }
  ExperienceBlock: {
    title: string
    lead: string
    scenes: Slot
    features: Slot
  }
  ExperienceSceneCard: {
    variant: 'pale' | 'dark'
    kicker: string
    title: string
    imageSrc: string
    imageAlt: string
  }
  ExperienceFeatureCard: {
    number: string
    title: string
    description: string
  }
  AccountBlock: { title: string; lead: string; reverseLayout?: boolean }
  StepsBlock: {
    title: string
    lead: string
    steps: Slot
  }
  StepCard: {
    title: string
    description: string
    icon: string
  }
  PromoBlock: { title: string; lead: string; button: string; reverseLayout?: boolean }
  SecurityBlock: { title: string; lead: string }
  LearnBlock: { title: string; lead: string }
  NewsletterBlock: { title: string; lead: string; reverseLayout?: boolean }
  FaqBlock: { title: string; list: Array<{ question: string; answer: string }> }
  FinalBlock: Record<string, never>
  FooterBlock: { copyright: string; links: Array<{ label: string; url: string }> }
}

const editableText = { type: 'text' as const, contentEditable: true }
const editableTextarea = { type: 'textarea' as const, contentEditable: true }

const sceneDefaults = {
  pale: {
    variant: 'pale' as const,
    kicker: 'Tu cuenta',
    title: 'Todo lo importante, en un\nmismo lugar.',
    imageSrc: '/assets/images/figma-front-phone.png',
    imageAlt: 'Vista principal de la cuenta',
  },
  dark: {
    variant: 'dark' as const,
    kicker: 'Control cotidiano',
    title: 'Una experiencia que se\nentiende al verla.',
    imageSrc: '/assets/images/figma-side-phone.png',
    imageAlt: 'Controles de la aplicación',
  },
}

const migrateToSlotCards = (
  items: unknown,
  type: string,
  mapProps: (item: Record<string, unknown>, index: number) => Record<string, unknown>,
) => {
  if (!Array.isArray(items) || items.length === 0) return items
  if (items[0] && typeof items[0] === 'object' && 'type' in (items[0] as object)) return items
  return items.map((raw, index) => {
    const item = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
    return {
      type,
      props: {
        ...mapProps(item, index),
        id: `${type}-migrated-${index}`,
      },
    }
  })
}

export const puckConfig: Config<Props> = {
  categories: {
    sections: {
      title: 'Secciones',
      components: [
        'HeroBlock',
        'ExperienceBlock',
        'AccountBlock',
        'StepsBlock',
        'PromoBlock',
        'SecurityBlock',
        'LearnBlock',
        'NewsletterBlock',
        'FaqBlock',
        'FinalBlock',
        'FooterBlock',
      ],
      defaultExpanded: true,
    },
    cards: {
      title: 'Cards',
      components: ['ExperienceSceneCard', 'ExperienceFeatureCard', 'StepCard'],
      visible: false,
    },
  },
  root: {
    render: ({ children }) => (
      <div className="home wp-singular page-template page-template-template-elementor-home page-template-template-elementor-home-php page page-id-17 wp-theme-bradesco bradesco-site bradesco-elementor-home elementor-default elementor-kit-4 elementor-page elementor-page-17">
        <link rel="stylesheet" href="/theme.css" />
        <style>{`
          html, body { scrollbar-width: none; -ms-overflow-style: none; }
          ::-webkit-scrollbar { display: none; }
          [contenteditable="true"] { outline: none; cursor: text; }
        `}</style>
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          <div data-elementor-type="wp-page" data-elementor-id="17" className="elementor elementor-17">
            <div className="elementor-element elementor-element-040086b5 e-con-full bradesco-elementor-root e-flex e-con e-parent" data-id="040086b5" data-element_type="container" data-e-type="container">
              {children}
            </div>
          </div>
        </main>
      </div>
    ),
  },
  components: {
    HeroBlock: {
      label: 'Banner principal',
      fields: {
        kicker: editableText,
        title: editableTextarea,
        lead: editableTextarea,
        legal: editableText,
        primaryButtonText: editableText,
        primaryButtonUrl: { type: 'text' },
        secondaryButtonText: editableText,
        secondaryButtonUrl: { type: 'text' },
      },
      defaultProps: {
        kicker: 'Bradesco llega a México',
        title: 'Tu dinero, en movimiento contigo.',
        lead: 'Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.',
        legal: 'La información mostrada es ilustrativa.',
        primaryButtonText: 'Conoce la cuenta',
        primaryButtonUrl: '#cuenta',
        secondaryButtonText: 'Descubre Bradesco',
        secondaryButtonUrl: '#nosotros',
      },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-1">
          <div className="elementor-widget-container">
            <HeroSection
              data={{
                kicker: props.kicker,
                title: props.title,
                lead: props.lead,
                legal: props.legal,
                primaryButton: { text: props.primaryButtonText, url: props.primaryButtonUrl },
                secondaryButton: { text: props.secondaryButtonText, url: props.secondaryButtonUrl },
              }}
            />
          </div>
        </div>
      ),
    },

    ExperienceSceneCard: {
      label: 'Escena',
      fields: {
        variant: {
          type: 'radio',
          options: [
            { label: 'Claro', value: 'pale' },
            { label: 'Oscuro', value: 'dark' },
          ],
        },
        kicker: editableText,
        title: editableTextarea,
        imageSrc: { type: 'text' },
        imageAlt: { type: 'text' },
      },
      defaultProps: sceneDefaults.pale,
      render: ({ variant, kicker, title, imageSrc, imageAlt }) => (
        <article className={`fg-scene ${variant === 'dark' ? 'dark' : 'pale'}`}>
          <p className={`fg-kicker${variant === 'dark' ? ' light' : ''}`}>{kicker}</p>
          <h3>
            {typeof title === 'string'
              ? title.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))
              : title}
          </h3>
          <img decoding="async" src={imageSrc} alt={typeof imageAlt === 'string' ? imageAlt : ''} />
        </article>
      ),
    },

    ExperienceFeatureCard: {
      label: 'Característica',
      fields: {
        number: editableText,
        title: editableText,
        description: editableTextarea,
      },
      defaultProps: {
        number: '01',
        title: 'Nueva característica',
        description: 'Descripción',
      },
      render: ({ number, title, description }) => (
        <article className="cms-feature-card">
          <span>{number}</span>
          <h3 style={{ whiteSpace: 'pre-line' }}>{title}</h3>
          <p>{description}</p>
        </article>
      ),
    },

    ExperienceBlock: {
      label: 'Experiencia',
      fields: {
        title: editableText,
        lead: editableTextarea,
        scenes: { type: 'slot', allow: ['ExperienceSceneCard'] },
        features: { type: 'slot', allow: ['ExperienceFeatureCard'] },
      },
      defaultProps: {
        title: 'Diseñada para acompañar tu ritmo.',
        lead: 'Dos escenas de producto muestran cómo puede sentirse una experiencia digital cercana, simple y dinámica.',
        scenes: [
          { type: 'ExperienceSceneCard', props: { ...sceneDefaults.pale, id: 'ExperienceSceneCard-pale' } },
          { type: 'ExperienceSceneCard', props: { ...sceneDefaults.dark, id: 'ExperienceSceneCard-dark' } },
        ],
        features: [],
      },
      resolveData: async ({ props }) => {
        const legacy = props as {
          scenes?: unknown
          features?: unknown
          reverseScenes?: boolean
        }

        let scenes = legacy.scenes
        if (!Array.isArray(scenes) || scenes.length === 0) {
          const pale = { type: 'ExperienceSceneCard', props: { ...sceneDefaults.pale, id: 'ExperienceSceneCard-pale' } }
          const dark = { type: 'ExperienceSceneCard', props: { ...sceneDefaults.dark, id: 'ExperienceSceneCard-dark' } }
          scenes = legacy.reverseScenes ? [dark, pale] : [pale, dark]
        } else {
          scenes = migrateToSlotCards(scenes, 'ExperienceSceneCard', (item, index) => ({
            ...(index === 1 ? sceneDefaults.dark : sceneDefaults.pale),
            ...item,
          }))
        }

        const features =
          migrateToSlotCards(legacy.features, 'ExperienceFeatureCard', (item, index) => ({
            number: String(item.number ?? index + 1).padStart(2, '0'),
            title: String(item.title ?? 'Característica').replace(/<br\s*\/?>/gi, '\n'),
            description: String(item.description ?? ''),
          })) ?? legacy.features

        return { props: { ...props, scenes: scenes as Slot, features: features as Slot } }
      },
      render: ({ title, lead, scenes: Scenes, features: Features }) => (
        <div className="bradesco-section-widget bradesco-section-2">
          <div className="elementor-widget-container">
            <section className="fg-section fg-experience" id="experiencia" data-bb-section="experience">
              <div className="fg-wrap narrow">
                <header className="fg-heading">
                  <p className="fg-kicker">Una experiencia en movimiento</p>
                  <h2>{title}</h2>
                  <p>{lead}</p>
                </header>

                <Scenes
                  className="fg-scenes cms-columns cms-columns--2"
                  collisionAxis="x"
                  minEmptyHeight={280}
                />

                <Features
                  className="fg-pillars cms-columns cms-columns--3"
                  collisionAxis="x"
                  minEmptyHeight={140}
                />

                <div className="fg-download">
                  <div>
                    <p className="fg-kicker light">Lleva Bradesco contigo</p>
                    <h3>Descarga la app y empieza desde tu celular.</h3>
                  </div>
                  <div className="fg-stores" aria-label="Descargar la aplicación">
                    <a href="https://apps.apple.com/mx/" target="_blank" rel="noopener noreferrer" aria-label="Descargar en App Store">
                      <img decoding="async" src="/assets/images/stores/app-store.png" alt="Descargar en App Store" />
                    </a>
                    <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" aria-label="Disponible en Google Play">
                      <img decoding="async" src="/assets/images/stores/google-play.png" alt="Disponible en Google Play" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ),
    },

    StepCard: {
      label: 'Paso',
      fields: {
        title: editableText,
        description: editableTextarea,
        icon: {
          type: 'select',
          options: [
            { label: 'Marketplace', value: 'marketplace' },
            { label: 'Selfie', value: 'selfie' },
            { label: 'Felicitación', value: 'felicitacion' },
          ],
        },
      },
      defaultProps: {
        title: 'Nuevo paso',
        description: 'Descripción',
        icon: 'marketplace',
      },
      render: ({ title, description, icon }) => (
        <article className="cms-step-card">
          <b>
            <img decoding="async" src={`/assets/icons/functional/${icon || 'marketplace'}.svg`} alt="" />
          </b>
          <span className="cms-step-card__label">Paso</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ),
    },

    StepsBlock: {
      label: 'Pasos',
      fields: {
        title: editableText,
        lead: editableTextarea,
        steps: { type: 'slot', allow: ['StepCard'] },
      },
      defaultProps: {
        title: 'De conocerla a usarla.',
        lead: 'El flujo definitivo se conectará con la aplicación. Por ahora, esta secuencia muestra la experiencia propuesta.',
        steps: [],
      },
      resolveData: async ({ props }) => {
        const legacyList = (props as { list?: unknown }).list
        const source = props.steps ?? legacyList
        const icons = ['marketplace', 'selfie', 'felicitacion']
        const steps =
          migrateToSlotCards(source, 'StepCard', (item, index) => ({
            title: String(item.title ?? `Paso ${index + 1}`),
            description: String(item.description ?? ''),
            icon: icons[index % icons.length],
          })) ?? props.steps
        return { props: { ...props, steps: steps as Slot } }
      },
      render: ({ title, lead, steps: Steps }) => (
        <div className="bradesco-section-widget bradesco-section-4">
          <div className="elementor-widget-container">
            <section className="fg-section fg-steps" data-bb-section="steps">
              <div className="fg-wrap">
                <header className="fg-heading">
                  <p className="fg-kicker">Una transición simple</p>
                  <h2>{title}</h2>
                  <p>{lead}</p>
                </header>
                <Steps
                  className="fg-step-grid cms-columns cms-columns--3"
                  collisionAxis="x"
                  minEmptyHeight={200}
                />
              </div>
            </section>
          </div>
        </div>
      ),
    },

    AccountBlock: {
      label: 'Cuenta digital',
      fields: {
        title: editableTextarea,
        lead: editableTextarea,
        reverseLayout: { type: 'radio', options: [{ label: 'No', value: false }, { label: 'Sí', value: true }] },
      },
      defaultProps: { title: 'Beneficios de cuenta digital.', lead: 'Un lugar en el que controlas tus movimientos diarios con tu celular.' },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-3">
          <div className="elementor-widget-container">
            <AccountSection data={{ title: props.title, lead: props.lead, reverseLayout: props.reverseLayout }} />
          </div>
        </div>
      ),
    },

    PromoBlock: {
      label: 'Promoción de tarjeta',
      fields: {
        title: editableText,
        lead: editableTextarea,
        button: editableText,
        reverseLayout: { type: 'radio', options: [{ label: 'No', value: false }, { label: 'Sí', value: true }] },
      },
      defaultProps: { title: 'Promo', lead: 'Lead', button: 'Button' },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-5">
          <div className="elementor-widget-container">
            <PromoSection data={{ title: props.title, lead: props.lead, button: props.button, reverseLayout: props.reverseLayout }} />
          </div>
        </div>
      ),
    },

    SecurityBlock: {
      label: 'Seguridad',
      fields: { title: editableText, lead: editableTextarea },
      defaultProps: { title: 'Seguridad', lead: 'Lead' },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-6">
          <div className="elementor-widget-container">
            <SecuritySection data={{ title: props.title, lead: props.lead }} />
          </div>
        </div>
      ),
    },

    LearnBlock: {
      label: 'Educación financiera',
      fields: { title: editableText, lead: editableTextarea },
      defaultProps: { title: 'Aprende', lead: 'Lead' },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-7">
          <div className="elementor-widget-container">
            <LearnSection data={{ title: props.title, lead: props.lead }} />
          </div>
        </div>
      ),
    },

    NewsletterBlock: {
      label: 'Newsletter',
      fields: {
        title: editableText,
        lead: editableTextarea,
        reverseLayout: { type: 'radio', options: [{ label: 'No', value: false }, { label: 'Sí', value: true }] },
      },
      defaultProps: { title: 'Newsletter', lead: 'Lead' },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-8">
          <div className="elementor-widget-container">
            <NewsletterSection data={{ title: props.title, lead: props.lead, reverseLayout: props.reverseLayout }} />
          </div>
        </div>
      ),
    },

    FaqBlock: {
      label: 'Preguntas frecuentes',
      fields: {
        title: editableText,
        list: {
          type: 'array',
          getItemSummary: (item, i) => (typeof item?.question === 'string' && item.question) || `Pregunta #${i ?? 0}`,
          arrayFields: { question: editableText, answer: editableTextarea },
          defaultItemProps: { question: 'Nueva pregunta', answer: 'Respuesta' },
        },
      },
      defaultProps: { title: 'Preguntas Frecuentes', list: [] },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-9">
          <div className="elementor-widget-container">
            <FaqSection data={{ title: props.title, list: props.list }} />
          </div>
        </div>
      ),
    },

    FinalBlock: {
      label: 'Descarga la aplicación',
      fields: {},
      defaultProps: {},
      render: () => (
        <div className="elementor-element elementor-element-eafb48da bradesco-section-widget bradesco-section-10 elementor-widget elementor-widget-bradesco-editable-section">
          <div className="elementor-widget-container"><FinalSection /></div>
        </div>
      ),
    },

    FooterBlock: {
      label: 'Footer',
      fields: {
        copyright: editableText,
        links: {
          type: 'array',
          getItemSummary: (item, i) => (typeof item?.label === 'string' && item.label) || `Enlace #${i ?? 0}`,
          arrayFields: { label: editableText, url: { type: 'text' } },
          defaultItemProps: { label: 'Nuevo enlace', url: '#' },
        },
      },
      defaultProps: { copyright: '© 2026 Bradesco', links: [] },
      render: (props) => <SiteFooter data={{ copyright: props.copyright, links: props.links }} />,
    },
  },
}
