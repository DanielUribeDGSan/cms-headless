import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLayoutFromLegacyFields, homeBlocks } from '@/modules/home/infrastructure/home-blocks';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Company CMS',
    },
    components: {
      beforeNav: ['@/components/payload/AdminBrand#AdminBrand'],
      graphics: {
        Icon: '@/components/payload/AdminBrand#AdminIcon',
        Logo: '@/components/payload/AdminBrand#AdminLogo',
      },
      views: {
        dashboard: {
          Component: '@/components/payload/CustomDashboard#CustomDashboard',
        },
      },
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  globals: [
    {
      slug: 'home-page',
      admin: {
        description: 'Construye la página, reordena secciones y previsualiza los cambios en tiempo real.',
        livePreview: {
          openByDefault: true,
          url: '/',
          breakpoints: [
            { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
            { label: 'iPad / Tablet', name: 'tablet', width: 768, height: 1024 },
            { label: 'Web / Desktop', name: 'desktop', width: 1440, height: 900 },
          ],
        },
      },
      hooks: {
        afterRead: [({ doc }) => {
          const home = doc as typeof doc & { layout?: unknown[] };
          if (!home.layout?.length) home.layout = createLayoutFromLegacyFields(home as Record<string, unknown>);
          return home;
        }],
      },
      versions: {
        drafts: {
          autosave: {
            interval: 800,
          },
        },
      },
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Hero',
              fields: [
                { name: 'heroKicker', type: 'text', required: true, defaultValue: 'Bradesco llega a México' },
                { name: 'heroTitle', type: 'text', required: true, defaultValue: 'Tu dinero, en\nmovimiento\ncontigo.' },
                { name: 'heroLead', type: 'text', required: true, defaultValue: 'Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.' },
                { name: 'primaryButtonText', type: 'text', required: true, defaultValue: 'Conoce la cuenta' },
                { name: 'primaryButtonUrl', type: 'text', required: true, defaultValue: '#cuenta' },
                { name: 'secondaryButtonText', type: 'text', required: true, defaultValue: 'Descubre Bradesco' },
                { name: 'secondaryButtonUrl', type: 'text', required: true, defaultValue: '#nosotros' },
                { name: 'heroLegal', type: 'textarea', required: true, defaultValue: 'La información, beneficios y condiciones mostrados son ilustrativos y están sujetos a disponibilidad, validación y términos aplicables.' },
              ]
            },
            {
              label: 'Experience',
              fields: [
                { name: 'expTitle', type: 'text', required: true, defaultValue: 'Tu experiencia bancaria cambia con nosotros' },
                { name: 'expLead', type: 'text', required: true, defaultValue: 'Creemos que las finanzas no deben de ser complejas ni un impedimento para lograr lo que te propones.' },
                {
                  name: 'expFeatures',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'icon', type: 'text' },
                  ]
                }
              ]
            },
            {
              label: 'Account',
              fields: [
                { name: 'accTitle', type: 'text', required: true, defaultValue: 'Beneficios de cuenta digital.' },
                { name: 'accLead', type: 'text', required: true, defaultValue: 'Un lugar en el que controlas tus movimientos diarios con tu celular, que hace posible lo que más quieres.' },
              ]
            },
            {
              label: 'Steps',
              fields: [
                { name: 'stepsTitle', type: 'text', required: true, defaultValue: 'Tu cuenta Bradesco es tuya en 3 pasos' },
                {
                  name: 'stepsList',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ]
                }
              ]
            },
            {
              label: 'Promo',
              fields: [
                { name: 'promoTitle', type: 'text', required: true, defaultValue: 'Únete a Bradesco en México' },
                { name: 'promoLead', type: 'textarea', required: true, defaultValue: 'Se de los primeros en probar un banco distinto.' },
                { name: 'promoButton', type: 'text', required: true, defaultValue: 'Ser de los primeros' },
              ]
            },
            {
              label: 'Security',
              fields: [
                { name: 'secTitle', type: 'text', required: true, defaultValue: 'Con la seguridad y confianza de un banco con historia' },
                { name: 'secLead', type: 'textarea', required: true, defaultValue: 'Tus datos, tu dinero y tus transacciones están protegidas en todo momento.' },
              ]
            },
            {
              label: 'Learn',
              fields: [
                { name: 'learnTitle', type: 'text', required: true, defaultValue: 'Aprende y planifica tu futuro' },
                { name: 'learnLead', type: 'textarea', required: true, defaultValue: 'En Bradesco, nos comprometemos a ayudarte a alcanzar tus metas.' },
              ]
            },
            {
              label: 'Newsletter',
              fields: [
                { name: 'newsTitle', type: 'text', required: true, defaultValue: 'Suscríbete y mantente al día' },
                { name: 'newsLead', type: 'textarea', required: true, defaultValue: 'Recibe noticias sobre los mejores beneficios financieros y nuevas herramientas' },
              ]
            },
            {
              label: 'FAQ',
              fields: [
                { name: 'faqTitle', type: 'text', required: true, defaultValue: 'Preguntas frecuentes' },
                {
                  name: 'faqList',
                  type: 'array',
                  fields: [
                    { name: 'question', type: 'text', required: true },
                    { name: 'answer', type: 'textarea', required: true },
                  ]
                }
              ]
            },
            {
              label: 'Footer',
              fields: [
                { name: 'footerCopyright', type: 'text', required: true, defaultValue: '© 2024 Bradesco. Todos los derechos reservados.' },
                {
                  name: 'footerLinks',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'layout',
          label: 'Constructor visual',
          type: 'blocks',
          admin: {
            description: 'Arrastra para reordenar. Cada bloque se puede editar, duplicar, contraer o eliminar.',
            initCollapsed: true,
          },
          blocks: homeBlocks,
        },
      ]
    }
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key-for-development',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres@localhost:5432/bradesco_payload',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
