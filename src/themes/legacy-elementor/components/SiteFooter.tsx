import React from 'react'

interface SiteFooterProps {
  data: {
    copyright?: React.ReactNode
    links?: Array<{ label?: React.ReactNode; url: string }>
  }
}

export const SiteFooter = ({ data }: SiteFooterProps) => {
  return (
    <footer className="site-footer">
  <div className="site-footer__inner">
    <a className="site-footer__logo" href="/" aria-label="Bradesco México, inicio"><img src="/assets/images/logo-bradesco.svg" alt="Bradesco" /></a>
    <div className="site-footer__grid">
      <nav className="site-footer__nav" aria-label="Ayuda y seguridad">
        <h2>Ayuda y seguridad</h2>
        <a href="#ayuda">Centro de ayuda</a>
        <a href="#">Seguridad</a>
        <a href="#">Contacto</a>
        <a href="#">Accesibilidad</a>
      </nav>
      <nav className="site-footer__nav" aria-label="Información">
        <h2>Transparencia</h2>
        <a href="#">Tarifas y comisiones</a>
        <a href="#">Información regulatoria</a>
        <a href="#">Contratos y documentos</a>
      </nav>
      <nav className="site-footer__nav" aria-label="Información">
        <h2>Información</h2>
        <a href="#nosotros">Sobre nosotros</a>
        <a href="#educacion">Educación financiera</a>
        <a href="#">Privacidad</a>
      </nav>
      <div className="site-footer__nav">
        <h2>Conoce nuestro respaldo financiero</h2>
        <a href="#">Comisión Nacional Bancaria y de Valores (CNBV) <span>&#x2197;&#xFE0E;</span></a>
        <a href="#">Condusef <span>&#x2197;&#xFE0E;</span></a>
        <a href="#">Buró de Entidades Financieras <span>&#x2197;&#xFE0E;</span></a>
        <a href="#">Comisionistas <span>&#x2197;&#xFE0E;</span></a>
      </div>
    </div>
    <div className="site-footer__contact">
      <div><a className="site-footer__phone" href="tel:+525500000000">+52 55 0000 0000</a><a href="mailto:contacto@ejemplo.bradesco.mx">contacto@ejemplo.bradesco.mx</a><p>Av. Paseo de la Reforma 000, Col. Juárez, Cuauhtémoc, 06600, Ciudad de México, CDMX.</p></div>
      <div><strong>Síguenos</strong><div className="site-footer__social" aria-label="Redes sociales"><a href="#" aria-label="Facebook"><img src="/assets/icons/social/facebook.svg" alt="" /></a><a href="#" aria-label="Instagram"><img src="/assets/icons/social/instagram.svg" alt="" /></a><a href="#" aria-label="LinkedIn"><img src="/assets/icons/social/linkedin.svg" alt="" /></a><a href="#" aria-label="YouTube"><img src="/assets/icons/social/youtube.svg" alt="" /></a></div></div>
    </div>
    <div className="site-footer__download">
      <div><p className="fg-kicker">Bradesco en tu celular</p><h2>Lleva tu cuenta contigo.</h2><p>Descarga la app y accede a tu experiencia digital desde donde estés.</p><div className="site-footer__stores"><img src="/assets/images/stores/app-store.png" alt="Descargar en App Store" /><img src="/assets/images/stores/google-play.png" alt="Disponible en Google Play" /></div></div>
      <div className="site-footer__qr"><img src="/assets/images/QR.svg" alt="Código QR para descargar la aplicación" /><div><strong>Escanea para descargar</strong><small>Disponible al confirmar el lanzamiento</small></div></div>
    </div>
  </div>
  <div className="site-footer__legal"><span>{data?.copyright || '© 2026 Bradesco México. Contenido de muestra.'}</span><nav aria-label="Información legal">
    {data?.links?.map((link, idx) => (
      <a key={idx} href={link.url}>{link.label}</a>
    ))}
    {(!data?.links || data.links.length === 0) && (
      <><a href="#">Términos y condiciones</a><a href="#">Costos y comisiones</a><a href="#">Contratos y formularios</a></>
    )}
  </nav></div>
</footer>
  );
};
