'use client'

import React, { useEffect, useRef } from 'react'
import { EditableHeading } from './EditableHeading'

type HeroData = {
  kicker?: React.ReactNode
  title?: React.ReactNode
  lead?: React.ReactNode
  legal?: React.ReactNode
  primaryButton: { text?: React.ReactNode; url: string }
  secondaryButton: { text?: React.ReactNode; url: string }
}

interface HeroSectionProps {
  data: HeroData
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Payload/Puck can remount the banner after the legacy animation script ran.
    const frame = requestAnimationFrame(() => {
      sectionRef.current?.classList.add('is-intro-ready')
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section ref={sectionRef} className="fg-hero is-intro-ready">
      <div className="fg-wrap fg-hero-grid">
        <div>
          <p className="fg-kicker light" data-bb-section="hero" data-bb-field="kicker">{data.kicker}</p>
          <EditableHeading as="h1" value={data.title} data-bb-section="hero" data-bb-field="title" />
          <p className="fg-lead" data-bb-section="hero" data-bb-field="lead">{data.lead}</p>
          <div className="fg-actions">
            <a className="fg-btn white" href={data.primaryButton.url} data-bb-section="hero" data-bb-field="button_primary">{data.primaryButton.text}</a>
            <a className="fg-btn ghost" href={data.secondaryButton.url} data-bb-section="hero" data-bb-field="button_secondary">{data.secondaryButton.text}</a>
          </div>
          <p className="fg-legal" data-bb-section="hero" data-bb-field="legal">{data.legal}</p>
        </div>
        <div className="fg-hero-phone">
          <img decoding="async" src="/assets/images/figma-hero-phone.png" alt="Aplicación Bradesco en un teléfono" />
        </div>
      </div>
      <a className="fg-scroll" href="#experiencia">
        <img decoding="async" src="/assets/images/icon-mouse.png" alt="" /> Desliza para descubrir
      </a>
    </section>
  )
}
