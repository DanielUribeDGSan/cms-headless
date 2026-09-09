import React from 'react'

export const AdminWelcome = () => (
  <section className="cms-welcome" aria-labelledby="cms-welcome-title">
    <div>
      <p className="cms-welcome__eyebrow">Panel de contenido</p>
      <h1 id="cms-welcome-title">Bienvenido a Company CMS</h1>
      <p className="cms-welcome__description">
        Administra páginas, usuarios y contenido global desde un solo lugar.
      </p>
    </div>
    <a className="cms-welcome__action" href="/admin/globals/home-page">
      Editar página de inicio
    </a>
  </section>
)
