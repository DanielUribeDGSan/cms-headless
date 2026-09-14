import type { Data } from '@puckeditor/core'
import type { HomeEntity } from '../domain/home.entity'

type PuckItem = { type?: unknown; props?: Record<string, unknown> }

const isSlot = (
  value: unknown,
  expectedType: string,
  validateProps: (props: Record<string, unknown>) => boolean = () => true,
) =>
  Array.isArray(value) &&
  value.every((item) => {
    const candidate = item as PuckItem | null
    return (
      candidate?.type === expectedType &&
      typeof candidate.props?.id === 'string' &&
      validateProps(candidate.props)
    )
  })

export const isCurrentHomePuckData = (value: unknown): value is Data => {
  if (!value || typeof value !== 'object') return false

  const content = (value as { content?: unknown }).content
  if (!Array.isArray(content) || content.length !== 11) return false

  const experience = content.find((item) => (item as PuckItem)?.type === 'ExperienceBlock') as PuckItem | undefined
  const steps = content.find((item) => (item as PuckItem)?.type === 'StepsBlock') as PuckItem | undefined

  return Boolean(
    experience?.props &&
      isSlot(experience.props.scenes, 'ExperienceSceneCard') &&
      isSlot(
        experience.props.features,
        'ExperienceFeatureCard',
        (props) => typeof props.number === 'string',
      ) &&
      steps?.props &&
      isSlot(steps.props.steps, 'StepCard'),
  )
}

const scenePale = {
  variant: 'pale' as const,
  kicker: 'Tu cuenta',
  title: 'Todo lo importante, en un\nmismo lugar.',
  imageSrc: '/assets/images/figma-front-phone.png',
  imageAlt: 'Vista principal de la cuenta',
}

const sceneDark = {
  variant: 'dark' as const,
  kicker: 'Control cotidiano',
  title: 'Una experiencia que se\nentiende al verla.',
  imageSrc: '/assets/images/figma-side-phone.png',
  imageAlt: 'Controles de la aplicación',
}

export const createHomePuckData = (home: HomeEntity): Data => ({
  content: [
    {
      type: 'HeroBlock',
      props: {
        ...home.hero,
        primaryButtonText: home.hero.primaryButton.text,
        primaryButtonUrl: home.hero.primaryButton.url,
        secondaryButtonText: home.hero.secondaryButton.text,
        secondaryButtonUrl: home.hero.secondaryButton.url,
        id: 'HeroBlock-home',
      },
    },
    {
      type: 'ExperienceBlock',
      props: {
        title: home.experience.title,
        lead: home.experience.lead,
        scenes: [
          { type: 'ExperienceSceneCard', props: { ...scenePale, id: 'ExperienceSceneCard-pale' } },
          { type: 'ExperienceSceneCard', props: { ...sceneDark, id: 'ExperienceSceneCard-dark' } },
        ],
        features: home.experience.features.map((feature, index) => ({
          type: 'ExperienceFeatureCard',
          props: {
            number: String(index + 1).padStart(2, '0'),
            title: feature.title,
            description: feature.description,
            id: `ExperienceFeatureCard-${index}`,
          },
        })),
        id: 'ExperienceBlock-home',
      },
    },
    { type: 'AccountBlock', props: { ...home.account, id: 'AccountBlock-home' } },
    {
      type: 'StepsBlock',
      props: {
        title: home.steps.title,
        lead: 'El flujo definitivo se conectará con la aplicación. Por ahora, esta secuencia muestra la experiencia propuesta.',
        steps: home.steps.list.map((step, index) => ({
          type: 'StepCard',
          props: {
            title: step.title,
            description: step.description,
            icon: ['marketplace', 'selfie', 'felicitacion'][index % 3],
            id: `StepCard-${index}`,
          },
        })),
        id: 'StepsBlock-home',
      },
    },
    { type: 'PromoBlock', props: { ...home.promo, id: 'PromoBlock-home' } },
    { type: 'SecurityBlock', props: { ...home.security, id: 'SecurityBlock-home' } },
    { type: 'LearnBlock', props: { ...home.learn, id: 'LearnBlock-home' } },
    { type: 'NewsletterBlock', props: { ...home.newsletter, id: 'NewsletterBlock-home' } },
    { type: 'FaqBlock', props: { title: home.faq.title, list: home.faq.list, id: 'FaqBlock-home' } },
    { type: 'FinalBlock', props: { id: 'FinalBlock-home' } },
    { type: 'FooterBlock', props: { copyright: home.footer.copyright, links: home.footer.links, id: 'FooterBlock-home' } },
  ],
  root: { props: { title: 'Inicio' } },
  zones: {},
})
