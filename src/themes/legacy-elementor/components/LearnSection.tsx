import React from 'react'

interface LearnSectionProps {
  data: { title?: React.ReactNode; lead?: React.ReactNode }
}

export const LearnSection = ({ data }: LearnSectionProps) => {
  return (
    <section className="fg-section fg-learn" id="educacion"><div className="fg-wrap"><header className="fg-heading"><p className="fg-kicker">Educación financiera</p><h2>{data?.title || 'Entender también es avanzar.'}</h2><p>{data?.lead || 'Contenidos breves para tomar decisiones con más contexto.'}</p></header><div className="fg-learn-grid"><article><img decoding="async" src="/assets/images/figma-blog-wallet.png" alt="" /><p className="fg-kicker">Organización</p><h3>Una forma sencilla de ordenar tus gastos.</h3><a href="#">Leer artículo <span aria-hidden="true">&#x2197;&#xFE0E;</span></a></article><article><img decoding="async" src="/assets/images/figma-blog-wallet-small.png" alt="" /><p className="fg-kicker">Ahorro</p><h3>Empieza una meta sin perder de vista tu día a día.</h3><a href="#">Leer artículo <span aria-hidden="true">&#x2197;&#xFE0E;</span></a></article><article><img decoding="async" src="/assets/images/figma-blog-plant.png" alt="" /><p className="fg-kicker">Seguridad</p><h3>Señales para reconocer un mensaje sospechoso.</h3><a href="#">Leer artículo <span aria-hidden="true">&#x2197;&#xFE0E;</span></a></article><article><img decoding="async" src="/assets/images/figma-blog-pig.png" alt="" /><p className="fg-kicker">Bienestar financiero</p><h3>Pequeñas decisiones que ayudan a cuidar tu dinero.</h3><a href="#">Leer artículo <span aria-hidden="true">&#x2197;&#xFE0E;</span></a></article></div></div></section>
  );
};
