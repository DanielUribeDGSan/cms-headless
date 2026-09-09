import { getPayload } from 'payload';
import configPromise from './src/payload.config';

async function migrate() {
  const payload = await getPayload({ config: configPromise });
  
  console.log('Fetching home-page global...');
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
      }
    ],
    root: {},
    zones: {}
  };

  console.log('Creating Home page in pages collection...');
  try {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } }
    });

    if (existing.docs.length > 0) {
      console.log('Updating existing home page...');
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: {
          title: 'Inicio',
          slug: 'home',
          puck: JSON.stringify(puckData)
        }
      });
    } else {
      console.log('Creating new home page...');
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Inicio',
          slug: 'home',
          puck: JSON.stringify(puckData)
        }
      });
    }
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
  process.exit(0);
}

migrate();
