import { getPayload } from 'payload';
import configPromise from './src/payload.config';
import { defaultHomeData } from './src/modules/home/domain/home.defaults';
import { createHomePuckData, isCurrentHomePuckData } from './src/modules/home/infrastructure/home-puck-data';

async function migrate() {
  const payload = await getPayload({ config: configPromise });
  
  const puckData = createHomePuckData(defaultHomeData);

  console.log('Creating Home page in pages collection...');
  try {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } }
    });

    if (existing.docs.length > 0) {
      const home = existing.docs[0];
      if (isCurrentHomePuckData(home.puckData)) {
        console.log('Home page already has the current template; leaving it unchanged.');
      } else {
        console.log('Repairing the existing home page with the current template...');
        await payload.update({
          collection: 'pages',
          id: home.id,
          data: {
            title: 'Inicio',
            slug: 'home',
            puckData,
            editorVersion: 'puck',
            isHomepage: true,
            _status: 'published',
          },
        });
      }
    } else {
      console.log('Creating new home page...');
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Inicio',
          slug: 'home',
          puckData,
          editorVersion: 'puck',
          isHomepage: true,
          _status: 'published',
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
