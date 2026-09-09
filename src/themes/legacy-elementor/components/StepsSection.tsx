import React from 'react';
import { HomeEntity } from "@/modules/home/domain/home.entity";

interface StepsSectionProps {
  data: HomeEntity['steps'];
}

export const StepsSection = ({ data }: StepsSectionProps) => {
  return (
    <section className="fg-section fg-steps" data-bb-section="steps"><div className="fg-wrap"><header className="fg-heading"><p className="fg-kicker">Una transición simple</p><h2>{data?.title || 'De conocerla a usarla.'}</h2><p>El proceso definitivo se conectará con la aplicación. Por ahora, esta secuencia muestra la experiencia propuesta.</p></header><div className="fg-step-grid">
      {data?.list?.map((step, index) => (
        <article key={index}><b><img decoding="async" src={`/assets/icons/functional/${index === 0 ? 'marketplace' : index === 1 ? 'selfie' : 'felicitacion'}.svg`} alt="" /></b><span>Paso {index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>
      ))}
      </div></div></section>
  );
};
