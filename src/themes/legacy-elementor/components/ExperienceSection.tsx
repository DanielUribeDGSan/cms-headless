import React from 'react';
import { HomeEntity } from "@/modules/home/domain/home.entity";

interface ExperienceSectionProps {
  data: HomeEntity['experience'];
}

export const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  return (
    <section className="fg-section fg-experience" id="experiencia" data-bb-section="experience"><div className="fg-wrap narrow"><header className="fg-heading"><p className="fg-kicker">Una experiencia en movimiento</p><h2>{data?.title || 'Diseñada para acompañar tu ritmo.'}</h2><p>{data?.lead || 'Dos escenas de producto...'}</p></header><div className="fg-scenes"><article className="fg-scene pale"><p className="fg-kicker">Tu cuenta</p><h3>Todo lo importante, en un<br />mismo lugar.</h3><img decoding="async" src="/assets/images/figma-front-phone.png" alt="Vista principal de la cuenta" /></article><article className="fg-scene dark"><p className="fg-kicker light">Control cotidiano</p><h3>Una experiencia que se<br />entiende al verla.</h3><img decoding="async" src="/assets/images/figma-side-phone.png" alt="Controles de la aplicación" /></article></div><div className="fg-pillars">
      {data?.features?.map((f, i) => (
        <article key={i}><span>{String(i + 1).padStart(2, '0')}</span><h3 dangerouslySetInnerHTML={{ __html: f.title }} /><p>{f.description}</p></article>
      ))}
      </div><div className="fg-download"><div><p className="fg-kicker light">Lleva Bradesco contigo</p><h3>Descarga la app y empieza desde tu celular.</h3></div><div className="fg-stores" aria-label="Descargar la aplicación"><a href="https://apps.apple.com/mx/" target="_blank" rel="noopener noreferrer" aria-label="Descargar en App Store; abre en una nueva pestaña"><img decoding="async" src="/assets/images/stores/app-store.png" alt="Descargar en App Store" /></a><a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" aria-label="Disponible en Google Play; abre en una nueva pestaña"><img decoding="async" src="/assets/images/stores/google-play.png" alt="Disponible en Google Play" /></a></div></div></div></section>
  );
};
