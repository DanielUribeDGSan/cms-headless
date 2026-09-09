import React from 'react';
import { HomeEntity } from "@/modules/home/domain/home.entity";

interface PromoSectionProps {
  data: HomeEntity['promo'];
}

export const PromoSection = ({ data }: PromoSectionProps) => {
  return (
    <section className="fg-section fg-promo" id="nosotros" data-bb-section="promo"><div className="fg-wrap fg-promo-in"><div className="fg-promo-copy"><p className="fg-kicker">Diseño y presencia</p><h2>{data?.title || 'Una tarjeta para llevar contigo.'}</h2><p>{data?.lead || 'Exploración visual con los recursos recibidos.'}</p></div><div className="fg-promo-cards" aria-label="Tarjetas Bradesco roja y negra"><img decoding="async" className="fg-card-gold" src="/assets/images/figma-visa-gold.png" alt="Tarjeta Bradesco roja" /><img decoding="async" className="fg-card-signature" src="/assets/images/figma-visa-signature.png" alt="Tarjeta Bradesco Visa Signature negra" /></div></div></section>
  );
};
