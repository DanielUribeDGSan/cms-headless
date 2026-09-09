import React from 'react';
import { HomeEntity } from "@/modules/home/domain/home.entity";

interface NewsletterSectionProps {
  data: HomeEntity['newsletter'];
}

export const NewsletterSection = ({ data }: NewsletterSectionProps) => {
  return (
    <section className="fg-section fg-newsletter"><div className="fg-wrap fg-newsletter-in"><div className="fg-newsletter-art"><img decoding="async" src="/assets/images/newsletter.png" alt="Sobre con notificación" /></div><div><p className="fg-kicker">Mantente al día</p><h2>{data?.title || 'Información útil, directo en tu correo.'}</h2><p>{data?.lead || 'Recibe contenidos de educación financiera y novedades de Bradesco México. Sin saturar tu bandeja.'}</p><form className="fg-form"><label htmlFor="fg-email">Correo electrónico</label><div><input /><button type="submit">Suscribirme</button></div><small>Podrás darte de baja cuando quieras. Consulta nuestro aviso de privacidad.</small></form></div></div></section>
  );
};
