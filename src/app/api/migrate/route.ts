import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const payload = await getPayload({ config: configPromise });
  const homeGlobal = await payload.findGlobal({ slug: 'home-page' });
  
  const puckData = {
    content: [
      {
        type: "HeroBlock",
        props: {
          kicker: homeGlobal.heroKicker || "Bradesco llega a México",
          title: homeGlobal.heroTitle || "Tu dinero, en movimiento contigo.",
          lead: homeGlobal.heroLead || "Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.",
          legal: homeGlobal.heroLegal || "La información mostrada es ilustrativa.",
          primaryButtonText: homeGlobal.primaryButtonText || "Conoce la cuenta",
          primaryButtonUrl: homeGlobal.primaryButtonUrl || "#cuenta",
          secondaryButtonText: homeGlobal.secondaryButtonText || "Descubre Bradesco",
          secondaryButtonUrl: homeGlobal.secondaryButtonUrl || "#nosotros",
          id: "HeroBlock-1"
        }
      },
      {
        type: "ExperienceBlock",
        props: {
          title: homeGlobal.expTitle || "Tu experiencia bancaria cambia con nosotros",
          lead: homeGlobal.expLead || "Creemos que las finanzas no deben de ser complejas ni un impedimento para lograr lo que te propones.",
          id: "ExperienceBlock-1"
        }
      },
      {
        type: "AccountBlock",
        props: {
          title: homeGlobal.accTitle || "Beneficios de cuenta digital.",
          lead: homeGlobal.accLead || "Un lugar en el que controlas tus movimientos diarios con tu celular, que hace posible lo que más quieres.",
          id: "AccountBlock-1"
        }
      },
      {
        type: "StepsBlock",
        props: {
          title: homeGlobal.stepsTitle || "Pasos",
          id: "StepsBlock-1"
        }
      },
      {
        type: "PromoBlock",
        props: {
          title: homeGlobal.promoTitle || "Promo",
          lead: homeGlobal.promoLead || "Lead",
          button: homeGlobal.promoButton || "Button",
          id: "PromoBlock-1"
        }
      },
      {
        type: "SecurityBlock",
        props: {
          title: homeGlobal.secTitle || "Seguridad",
          lead: homeGlobal.secLead || "Lead",
          id: "SecurityBlock-1"
        }
      },
      {
        type: "LearnBlock",
        props: {
          title: homeGlobal.learnTitle || "Aprende",
          lead: homeGlobal.learnLead || "Lead",
          id: "LearnBlock-1"
        }
      },
      {
        type: "NewsletterBlock",
        props: {
          title: homeGlobal.newsTitle || "Newsletter",
          lead: homeGlobal.newsLead || "Lead",
          id: "NewsletterBlock-1"
        }
      },
      {
        type: "FaqBlock",
        props: {
          title: homeGlobal.faqTitle || "Preguntas Frecuentes",
          id: "FaqBlock-1"
        }
      },
      {
        type: "FooterBlock",
        props: {
          copyright: homeGlobal.footerCopyright || "© 2026 Bradesco",
          id: "FooterBlock-1"
        }
      }
    ],
    root: {},
    zones: {}
  };

  const existing = await payload.find({
    collection: 'pages',
    limit: 100
  });

  if (existing.docs.length > 0) {
    for (const doc of existing.docs) {
      await payload.update({
        collection: 'pages',
        id: doc.id,
        data: {
          title: 'Inicio',
          slug: 'home',
          puck: puckData
        }
      });
    }
  } else {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Inicio',
        slug: 'home',
        puck: puckData
      }
    });
  }
  
  return NextResponse.json({ success: true, message: "Migration with ALL blocks complete" });
}
