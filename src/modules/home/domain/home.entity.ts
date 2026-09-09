export interface HomeEntity {
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
