export interface HomeEntity {
  layout?: HomeLayoutBlock[];
  hero: {
    kicker: string;
    title: string;
    lead: string;
    legal: string;
    primaryButton: {
      text: string;
      url: string;
    };
    secondaryButton: {
      text: string;
      url: string;
    };
  };
  experience: {
    title: string;
    lead: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  account: {
    title: string;
    lead: string;
  };
  steps: {
    title: string;
    list: Array<{
      title: string;
      description: string;
    }>;
  };
  promo: {
    title: string;
    lead: string;
    button: string;
  };
  security: {
    title: string;
    lead: string;
  };
  learn: {
    title: string;
    lead: string;
  };
  newsletter: {
    title: string;
    lead: string;
  };
  faq: {
    title: string;
    list: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    copyright: string;
    links: Array<{
      label: string;
      url: string;
    }>;
  };
}

export type HomeLayoutBlock =
  | { id?: string; blockType: 'hero'; data: HomeEntity['hero'] }
  | { id?: string; blockType: 'experience'; data: HomeEntity['experience'] }
  | { id?: string; blockType: 'account'; data: HomeEntity['account'] }
  | { id?: string; blockType: 'steps'; data: HomeEntity['steps'] }
  | { id?: string; blockType: 'promo'; data: HomeEntity['promo'] }
  | { id?: string; blockType: 'security'; data: HomeEntity['security'] }
  | { id?: string; blockType: 'learn'; data: HomeEntity['learn'] }
  | { id?: string; blockType: 'newsletter'; data: HomeEntity['newsletter'] }
  | { id?: string; blockType: 'faq'; data: HomeEntity['faq'] }
  | { id?: string; blockType: 'footer'; data: HomeEntity['footer'] }
