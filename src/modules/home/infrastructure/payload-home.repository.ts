import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { HomeEntity, HomeLayoutBlock } from '../domain/home.entity';
import { IHomeRepository } from '../domain/home.repository';

export class PayloadHomeRepository implements IHomeRepository {
  async getHomeData(): Promise<HomeEntity> {
    try {
      const payload = await getPayload({ config: configPromise });
      
      const homeGlobal = await payload.findGlobal({
        slug: 'home-page',
      });

      const data: HomeEntity = {
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

      const rawLayout = (homeGlobal as unknown as { layout?: Record<string, unknown>[] }).layout;
      if (rawLayout?.length) data.layout = rawLayout.map(this.mapLayoutBlock).filter((block): block is HomeLayoutBlock => block !== null);
      return data;
    } catch (error) {
      console.error('Error fetching home data from Payload:', error);
      // Fallback
      return this.getFallbackData();
    }
  }

  private mapLayoutBlock = (block: Record<string, unknown>): HomeLayoutBlock | null => {
    const text = (key: string) => typeof block[key] === 'string' ? block[key] : '';
    const id = text('id') || undefined;
    const items = (key: string) => Array.isArray(block[key]) ? block[key] as Record<string, unknown>[] : [];
    switch (block.blockType) {
      case 'hero': return { id, blockType: 'hero', data: { kicker: text('kicker'), title: text('title'), lead: text('lead'), legal: text('legal'), primaryButton: { text: text('primaryButtonText'), url: text('primaryButtonUrl') }, secondaryButton: { text: text('secondaryButtonText'), url: text('secondaryButtonUrl') } } };
      case 'experience': return { id, blockType: 'experience', data: { title: text('title'), lead: text('lead'), features: items('features').map(item => ({ title: String(item.title ?? ''), description: String(item.description ?? ''), icon: String(item.icon ?? '') })) } };
      case 'account': return { id, blockType: 'account', data: { title: text('title'), lead: text('lead') } };
      case 'steps': return { id, blockType: 'steps', data: { title: text('title'), list: items('list').map(item => ({ title: String(item.title ?? ''), description: String(item.description ?? '') })) } };
      case 'promo': return { id, blockType: 'promo', data: { title: text('title'), lead: text('lead'), button: text('button') } };
      case 'security': return { id, blockType: 'security', data: { title: text('title'), lead: text('lead') } };
      case 'learn': return { id, blockType: 'learn', data: { title: text('title'), lead: text('lead') } };
      case 'newsletter': return { id, blockType: 'newsletter', data: { title: text('title'), lead: text('lead') } };
      case 'faq': return { id, blockType: 'faq', data: { title: text('title'), list: items('list').map(item => ({ question: String(item.question ?? ''), answer: String(item.answer ?? '') })) } };
      case 'footer': return { id, blockType: 'footer', data: { copyright: text('copyright'), links: items('links').map(item => ({ label: String(item.label ?? ''), url: String(item.url ?? '') })) } };
      default: return null;
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
