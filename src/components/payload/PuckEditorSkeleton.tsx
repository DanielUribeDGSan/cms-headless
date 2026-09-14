'use client'

import { useEffect, useState } from 'react'

/**
 * Skeleton a pantalla completa con la misma estructura del editor Puck
 * (rail | canvas | panel derecho). Sustituye el spinner cortado de payload-puck.
 */
export function PuckEditorSkeleton() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const ready = () => Boolean(document.querySelector('[class*="_PuckLayout--mounted_"], [class*="_PuckLayout"] [class*="_PuckCanvas"]'))

    if (ready()) {
      setVisible(false)
      return
    }

    const obs = new MutationObserver(() => {
      if (ready()) {
        setVisible(false)
        obs.disconnect()
      }
    })
    obs.observe(document.body, { childList: true, subtree: true })

    const failsafe = window.setTimeout(() => setVisible(false), 20000)
    return () => {
      obs.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="cms-puck-skeleton" role="status" aria-live="polite" aria-label="Cargando editor">
      <aside className="cms-puck-skeleton__rail" aria-hidden="true">
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--icon" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--icon" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--icon" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--icon" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--icon cms-puck-skeleton__bone--rail-end" />
      </aside>

      <div className="cms-puck-skeleton__canvas" aria-hidden="true">
        <div className="cms-puck-skeleton__toolbar">
          <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--chip" />
          <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--chip" />
          <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--chip" />
          <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--zoom" />
        </div>
        <div className="cms-puck-skeleton__preview">
          <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--hero" />
          <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--block" />
          <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--block cms-puck-skeleton__bone--short" />
        </div>
      </div>

      <aside className="cms-puck-skeleton__right" aria-hidden="true">
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--title" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--label" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--input" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--label" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--input" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--label" />
        <span className="cms-puck-skeleton__bone cms-puck-skeleton__bone--input cms-puck-skeleton__bone--tall" />
      </aside>

      <span className="cms-puck-skeleton__sr">Cargando editor…</span>
    </div>
  )
}
