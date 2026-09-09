import React from 'react';

export const SiteHeader = () => {
  return (
    <header className="site-header" role="banner">
  <div className="site-header__inner">
    <a className="brand" href="/" aria-label="Bradesco México, inicio">
      <img src="/assets/images/logo-bradesco.svg" alt="Bradesco" />
    </a>
    <button className="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span className="material-symbols-rounded" aria-hidden="true">menu</span><span className="sr-only">Abrir menú</span></button>
    <nav id="site-nav" className="site-nav" aria-label="Navegación principal"><ul className="site-nav__list"><li><a href="#productos">Productos</a></li><li><a href="#nosotros">Sobre nosotros</a></li><li><a href="#educacion">Educación financiera</a></li><li><a href="#ayuda">Centro de ayuda</a></li></ul></nav>
    <a className="header-cta" href="#solicita">Conoce la cuenta</a>
  </div>
</header>
  );
};
