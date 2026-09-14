import React from 'react'

interface SecuritySectionProps {
  data: { title?: React.ReactNode; lead?: React.ReactNode }
}

export const SecuritySection = ({ data }: SecuritySectionProps) => {
  return (
    <section className="fg-section fg-security" data-bb-section="security"><div className="fg-wrap"><div className="fg-security-intro"><div><p className="fg-kicker">Seguridad y control</p><h2>{data?.title || 'Tu dinero merece un espacio seguro.'}</h2></div><div><p>{data?.lead || 'Diseñamos cada interacción para ayudarte a reconocer lo que sucede y actuar cuando lo necesites.'}</p><a className="fg-link" href="#">Conoce más sobre seguridad <span className="material-symbols-rounded" aria-hidden="true">north_east</span></a></div></div><div className="fg-security-grid"><article className="fg-secure-main"><img decoding="async" src="/assets/images/figma-secure.png" alt="Escudo y candado de seguridad" /><h3>Todo bajo control.</h3></article><div className="fg-secure-stack"><article className="fg-security-control"><span className="fg-security-icon"><img decoding="async" src="/assets/icons/functional/tdc.svg" alt="" /></span><p className="fg-kicker">Control inmediato</p><h3>Control desde la app</h3><p>Consulta estados y administra funciones cuando lo necesites.</p></article><article className="fg-security-alert"><span className="fg-security-icon"><img decoding="async" src="/assets/icons/functional/aviso.svg" alt="" /></span><p className="fg-kicker">Información oportuna</p><h3>Alertas claras</h3><p>Reconoce cada movimiento y detecta actividad fuera de lo habitual.</p></article><article className="fg-security-terms"><span className="fg-security-icon"><img decoding="async" src="/assets/icons/functional/documentos.svg" alt="" /></span><p className="fg-kicker">Decisiones informadas</p><h3>Condiciones transparentes</h3><p>Consulta costos, condiciones y documentos en un lenguaje más claro.</p></article></div></div></div></section>
  );
};
