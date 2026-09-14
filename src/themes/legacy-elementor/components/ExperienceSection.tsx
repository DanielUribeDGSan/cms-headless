import React from 'react'
import { HomeEntity } from "@/modules/home/domain/home.entity";

type ExperienceData = Omit<HomeEntity['experience'], 'title' | 'lead' | 'features'> & {
  title?: React.ReactNode
  lead?: React.ReactNode
  features?: Array<{ title?: React.ReactNode; description?: React.ReactNode; icon?: string }>
  reverseScenes?: boolean
  reverseDownload?: boolean
}

interface ExperienceSectionProps {
  data: ExperienceData;
}

export const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  const reverseScenes = Boolean(data?.reverseScenes)
  const reverseDownload = Boolean(data?.reverseDownload)

  return (
    <section className="fg-section fg-experience" id="experiencia" data-bb-section="experience">
      <div className="fg-wrap narrow">
        <header className="fg-heading">
          <p className="fg-kicker">Una experiencia en movimiento</p>
          <h2>{data?.title || 'Diseñada para acompañar tu ritmo.'}</h2>
          <p>{data?.lead || 'Dos escenas de producto...'}</p>
        </header>

        {/* Orden DOM fijo + CSS: evita remount de imágenes al invertir */}
        <div className={`fg-scenes${reverseScenes ? ' is-reversed' : ''}`}>
          <article className="fg-scene pale" key="scene-pale" data-scene="pale">
            <p className="fg-kicker">Tu cuenta</p>
            <h3>Todo lo importante, en un<br />mismo lugar.</h3>
            <img decoding="async" src="/assets/images/figma-front-phone.png" alt="Vista principal de la cuenta" />
          </article>
          <article className="fg-scene dark" key="scene-dark" data-scene="dark">
            <p className="fg-kicker light">Control cotidiano</p>
            <h3>Una experiencia que se<br />entiende al verla.</h3>
            <img decoding="async" src="/assets/images/figma-side-phone.png" alt="Controles de la aplicación" />
          </article>
        </div>

        <div className="fg-pillars">
          {data?.features?.map((f, i) => (
            <article key={`feature-${i}-${typeof f?.icon === 'string' ? f.icon : ''}`}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </article>
          ))}
        </div>

        <div className={`fg-download${reverseDownload ? ' is-reversed' : ''}`}>
          <div key="download-copy">
            <p className="fg-kicker light">Lleva Bradesco contigo</p>
            <h3>Descarga la app y empieza desde tu celular.</h3>
          </div>
          <div className="fg-stores" aria-label="Descargar la aplicación" key="download-stores">
            <a href="https://apps.apple.com/mx/" target="_blank" rel="noopener noreferrer" aria-label="Descargar en App Store; abre en una nueva pestaña">
              <img decoding="async" src="/assets/images/stores/app-store.png" alt="Descargar en App Store" />
            </a>
            <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" aria-label="Disponible en Google Play; abre en una nueva pestaña">
              <img decoding="async" src="/assets/images/stores/google-play.png" alt="Disponible en Google Play" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
