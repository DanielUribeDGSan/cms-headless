import { Activity, FileText, Globe2, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import type { AdminViewServerProps } from 'payload'

type MetricProps = { description: string; icon: React.ReactNode; title: string; value: number | string }

const Metric = ({ description, icon, title, value }: MetricProps) => (
  <article className="cms-dashboard__metric">
    <header><span>{title}</span>{icon}</header>
    <strong>{value}</strong>
    <small>{description}</small>
  </article>
)

export const CustomDashboard = async ({ payload }: AdminViewServerProps) => {
  const [pages, users] = await Promise.all([
    payload.count({ collection: 'pages' }),
    payload.count({ collection: 'users' }),
  ])
  const bars = [58, 76, 42, 88, 64, 48, 72, 91, 67, 82, 55, 78]

  return (
    <section className="cms-dashboard">
      <div className="cms-dashboard__title-row">
        <div><p>Panel de contenido</p><h1>Dashboard</h1></div>
        <Link href="/admin/globals/home-page">Editar sitio</Link>
      </div>
      <div className="cms-dashboard__tabs"><button className="is-active">Overview</button><button>Analytics</button><button disabled>Reports</button><button disabled>Notifications</button></div>
      <div className="cms-dashboard__metrics">
        <Metric title="Páginas" value={pages.totalDocs} description="Contenido publicado y borradores" icon={<FileText size={17} />} />
        <Metric title="Usuarios" value={users.totalDocs} description="Cuentas con acceso al CMS" icon={<Users size={17} />} />
        <Metric title="Globals" value="1" description="Configuración global del sitio" icon={<Globe2 size={17} />} />
        <Metric title="Secciones" value="10" description="Secciones editables del home" icon={<Activity size={17} />} />
      </div>
      <div className="cms-dashboard__lower">
        <article className="cms-dashboard__chart-card">
          <h2>Actividad de contenido</h2>
          <p>Vista general de la estructura editable</p>
          <div className="cms-dashboard__chart" aria-label="Gráfica decorativa de actividad">
            {bars.map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
          </div>
          <div className="cms-dashboard__months">{['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'].map(month => <span key={month}>{month}</span>)}</div>
        </article>
        <article className="cms-dashboard__quick-card">
          <h2>Accesos rápidos</h2><p>Continúa administrando tu contenido.</p>
          <Link href="/admin/globals/home-page"><span className="cms-dashboard__quick-icon"><Globe2 size={17} /></span><span><strong>Página de inicio</strong><small>Hero, experiencia, cuenta y más</small></span><b>→</b></Link>
          <Link href="/admin/collections/pages"><span className="cms-dashboard__quick-icon"><FileText size={17} /></span><span><strong>Páginas</strong><small>Administra el contenido del sitio</small></span><b>→</b></Link>
          <Link href="/admin/collections/users"><span className="cms-dashboard__quick-icon"><Users size={17} /></span><span><strong>Usuarios</strong><small>Controla el acceso al CMS</small></span><b>→</b></Link>
        </article>
      </div>
    </section>
  )
}
