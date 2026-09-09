import React from 'react';
import { HomeEntity } from "@/modules/home/domain/home.entity";

interface AccountSectionProps {
  data: HomeEntity['account'];
}

export const AccountSection = ({ data }: AccountSectionProps) => {
  return (
    <section className="fg-section" id="cuenta" data-bb-section="account"><div className="fg-wrap fg-split"><div className="fg-copy"><p className="fg-kicker">Cuenta digital</p><h2 dangerouslySetInnerHTML={{ __html: data?.title?.replace(/\n/g, '<br />') || 'Una cuenta para lo<br />que pasa todos los<br />días.' }} /><p>{data?.lead || 'Consulta, organiza y toma decisiones desde una experiencia simple y diseñada para darte claridad.'}</p><ul><li>La información importante en un mismo lugar.</li><li>Acciones frecuentes siempre a la mano.</li><li>Control y alertas desde la app.</li></ul><a className="fg-link" href="#">Conoce la cuenta &#x2197;&#xFE0E;</a></div><div className="fg-phone-card"><img decoding="async" src="/assets/images/figma-side-phone-full.png" alt="Cuenta digital Bradesco" /></div></div></section>
  );
};
