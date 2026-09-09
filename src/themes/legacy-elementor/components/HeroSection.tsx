import React from 'react';
import { HomeEntity } from "@/modules/home/domain/home.entity";

interface HeroSectionProps {
  data: HomeEntity['hero'];
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section className="fg-hero"><div className="fg-wrap fg-hero-grid"><div><p className="fg-kicker light" data-bb-section="hero" data-bb-field="kicker">{data.kicker}</p><h1 data-bb-section="hero" data-bb-field="title" dangerouslySetInnerHTML={{ __html: data.title.replace(/\n/g, '<br />') }} /><p className="fg-lead" data-bb-section="hero" data-bb-field="lead">{data.lead}</p><div className="fg-actions"><a className="fg-btn white" href={data.primaryButton.url} data-bb-section="hero" data-bb-field="button_primary">{data.primaryButton.text}</a><a className="fg-btn ghost" href={data.secondaryButton.url} data-bb-section="hero" data-bb-field="button_secondary">{data.secondaryButton.text}</a></div><p className="fg-legal" data-bb-section="hero" data-bb-field="legal">{data.legal}</p></div><div className="fg-hero-phone"><img decoding="async" src="/assets/images/figma-hero-phone.png" alt="Aplicación Bradesco en un teléfono" /></div></div><a className="fg-scroll" href="#experiencia"><img decoding="async" src="/assets/images/icon-mouse.png" alt="" /> Desliza para descubrir</a></section>
  );
};
