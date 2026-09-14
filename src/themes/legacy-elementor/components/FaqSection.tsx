import React from 'react'

interface FaqSectionProps {
  data: {
    title?: React.ReactNode
    list?: Array<{ question?: React.ReactNode; answer?: React.ReactNode }>
  }
}

export const FaqSection = ({ data }: FaqSectionProps) => {
  return (
    <section className="fg-section fg-faq" id="ayuda">
      <div className="fg-wrap">
        <p className="fg-kicker">Centro de ayuda</p>
        <h2>{data?.title || 'Respuestas antes de empezar.'}</h2>
        <div className="fg-faq-list">
          {data?.list?.map((item, index) => (
            <details key={index}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
