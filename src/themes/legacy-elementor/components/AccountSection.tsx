import React from 'react'
import { EditableHeading } from './EditableHeading'

interface AccountSectionProps {
  data: {
    title?: React.ReactNode
    lead?: React.ReactNode
    reverseLayout?: boolean
  }
}

export const AccountSection = ({ data }: AccountSectionProps) => {
  return (
    <section className={`fg-section ${data?.reverseLayout ? 'bb-layout-reversed' : ''}`} id="cuenta" data-bb-section="account">
      <div className="fg-wrap fg-split">
        <div className="fg-copy">
          <p className="fg-kicker">Cuenta digital</p>
          <EditableHeading value={data?.title} fallback={'Una cuenta para lo\nque pasa todos los\ndías.'} />
          <p>{data?.lead || 'Consulta, organiza y toma decisiones desde una experiencia simple y diseñada para darte claridad.'}</p>
          <ul>
            <li>La información importante en un mismo lugar.</li>
            <li>Acciones frecuentes siempre a la mano.</li>
            <li>Control y alertas desde la app.</li>
          </ul>
          <a className="fg-link" href="#">Conoce la cuenta &#x2197;&#xFE0E;</a>
        </div>
        <div className="fg-phone-card">
          <img decoding="async" src="/assets/images/figma-side-phone-full.png" alt="Cuenta digital Bradesco" />
        </div>
      </div>
    </section>
  )
}
