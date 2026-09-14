import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { NextResponse } from 'next/server';
import { defaultHomeData } from '@/modules/home/domain/home.defaults';
import { createHomePuckData, isCurrentHomePuckData } from '@/modules/home/infrastructure/home-puck-data';

export async function POST() {
  const payload = await getPayload({ config: configPromise });
  const puckData = createHomePuckData(defaultHomeData);

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    const home = existing.docs[0];
    if (isCurrentHomePuckData(home.puckData)) {
      return NextResponse.json({ success: true, created: false, repaired: false, message: 'La página de inicio ya tiene el template actual.' });
    }

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

    return NextResponse.json({ success: true, created: false, repaired: true, message: 'Página de inicio reparada con todos los bloques.' });
  } else {
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
  
  return NextResponse.json({ success: true, created: true, message: 'Página de inicio creada con todos los bloques.' });
}
