import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { HomeEntity } from '../domain/home.entity';
import { IHomeRepository } from '../domain/home.repository';

export class PayloadHomeRepository implements IHomeRepository {
  async getHomeData(): Promise<HomeEntity> {
    try {
      const payload = await getPayload({ config: configPromise });
      
      const homeGlobal = await payload.findGlobal({
        slug: 'home-page',
      });

      return {
        hero: {
          kicker: homeGlobal.heroKicker as string || '',
          title: homeGlobal.heroTitle as string || '',
          lead: homeGlobal.heroLead as string || '',
          legal: homeGlobal.heroLegal as string || '',
          primaryButton: {
            text: homeGlobal.primaryButtonText as string || '',
            url: homeGlobal.primaryButtonUrl as string || '',
          },
          secondaryButton: {
            text: homeGlobal.secondaryButtonText as string || '',
            url: homeGlobal.secondaryButtonUrl as string || '',
          },
        },
        experience: {
          title: homeGlobal.expTitle as string || '',
          lead: homeGlobal.expLead as string || '',
          features: (homeGlobal.expFeatures as any[])?.map(f => ({
            title: f.title,
            description: f.description,
            icon: f.icon || ''
          })) || [],
        },
        account: {
          title: homeGlobal.accTitle as string || '',
          lead: homeGlobal.accLead as string || '',
        },
        steps: {
          title: homeGlobal.stepsTitle as string || '',
          list: (homeGlobal.stepsList as any[])?.map(s => ({
            title: s.title,
            description: s.description,
          })) || [],
        },
        promo: {
          title: homeGlobal.promoTitle as string || '',
          lead: homeGlobal.promoLead as string || '',
          button: homeGlobal.promoButton as string || '',
        },
        security: {
          title: homeGlobal.secTitle as string || '',
          lead: homeGlobal.secLead as string || '',
        },
        learn: {
          title: homeGlobal.learnTitle as string || '',
          lead: homeGlobal.learnLead as string || '',
        },
        newsletter: {
          title: homeGlobal.newsTitle as string || '',
          lead: homeGlobal.newsLead as string || '',
        },
        faq: {
          title: homeGlobal.faqTitle as string || '',
          list: (homeGlobal.faqList as any[])?.map(f => ({
            question: f.question,
            answer: f.answer,
          })) || [],
        },
        footer: {
          copyright: homeGlobal.footerCopyright as string || '',
          links: (homeGlobal.footerLinks as any[])?.map(l => ({
            label: l.label,
            url: l.url,
          })) || [],
        }
      };
    } catch (error) {
      console.error('Error fetching home data from Payload:', error);
      // Fallback
      return this.getFallbackData();
    }
  }

  private getFallbackData(): HomeEntity {
    return {
      hero: {
        kicker: 'Bradesco llega a México',
        title: 'Tu dinero, en\nmovimiento\ncontigo.',
        lead: 'Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.',
        legal: 'La información mostrada es ilustrativa.',
        primaryButton: { text: 'Conoce la cuenta', url: '#cuenta' },
        secondaryButton: { text: 'Descubre Bradesco', url: '#nosotros' },
      },
      experience: { title: '', lead: '', features: [] },
      account: { title: '', lead: '' },
      steps: { title: '', list: [] },
      promo: { title: '', lead: '', button: '' },
      security: { title: '', lead: '' },
      learn: { title: '', lead: '' },
      newsletter: { title: '', lead: '' },
      faq: { title: '', list: [] },
      footer: { copyright: '', links: [] },
    };
  }
}
