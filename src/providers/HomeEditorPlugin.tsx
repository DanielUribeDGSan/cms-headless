'use client'

import { ActionBar, createUsePuck, type Plugin } from '@puckeditor/core'
import { ArrowDown, ArrowLeft, ArrowUp, GripVertical, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const usePuck = createUsePuck()

const previewDetails: Record<string, { eyebrow: string; title: string; tone: string }> = {
  HeroBlock: { eyebrow: 'Banner principal', title: 'Tu dinero, en movimiento contigo.', tone: 'hero' },
  ExperienceBlock: { eyebrow: 'Experiencia', title: 'Diseñada para acompañar tu ritmo.', tone: 'experience' },
  AccountBlock: { eyebrow: 'Cuenta digital', title: 'Una cuenta para todos los días.', tone: 'account' },
  StepsBlock: { eyebrow: 'Proceso', title: 'Tres pasos sencillos.', tone: 'steps' },
  PromoBlock: { eyebrow: 'Producto', title: 'Una tarjeta para llevar contigo.', tone: 'promo' },
  SecurityBlock: { eyebrow: 'Seguridad', title: 'Todo bajo control.', tone: 'security' },
  LearnBlock: { eyebrow: 'Educación', title: 'Aprende y planifica.', tone: 'learn' },
  NewsletterBlock: { eyebrow: 'Newsletter', title: 'Información en tu correo.', tone: 'newsletter' },
  FaqBlock: { eyebrow: 'Ayuda', title: 'Preguntas frecuentes.', tone: 'faq' },
  FinalBlock: { eyebrow: 'Cierre', title: 'Descarga la aplicación.', tone: 'final' },
  FooterBlock: { eyebrow: 'Pie de página', title: 'Enlaces e información legal.', tone: 'footer' },
}

export const homeEditorCanvasCss = `
  /* El CSS del admin (body.puck-is-active { overflow:hidden }) se filtra al iframe:
     hay que restaurar el scroll de la página en preview. */
  html, body {
    overflow-x: hidden !important;
    overflow-y: auto !important;
    height: auto !important;
    max-height: none !important;
    min-height: 100% !important;
  }
  body.puck-is-active {
    overflow-x: hidden !important;
    overflow-y: auto !important;
    height: auto !important;
    max-height: none !important;
  }
  html:has(body.puck-is-active) {
    overflow-x: hidden !important;
    overflow-y: auto !important;
    height: auto !important;
    max-height: none !important;
  }
  /* Inline text: cursor y outline suaves */
  [contenteditable="true"] {
    cursor: text !important;
    outline: 1px dashed transparent !important;
    transition: outline-color 120ms ease !important;
  }
  [contenteditable="true"]:hover,
  [contenteditable="true"]:focus {
    outline-color: rgba(1, 88, 173, 0.45) !important;
  }

  /* Columnas tipo Elementor: guías azules + dropzones arrastrables */
  .cms-columns {
    position: relative !important;
    box-sizing: border-box !important;
    min-height: 120px !important;
    border: 1px dashed rgba(37, 99, 235, 0.35) !important;
    border-radius: 0 !important;
    background-color: rgba(37, 99, 235, 0.06) !important;
    background-clip: padding-box !important;
  }
  .cms-columns--2 {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 24px !important;
    background-image: linear-gradient(
      to right,
      rgba(37, 99, 235, 0.12) 0,
      rgba(37, 99, 235, 0.12) calc(50% - 12px),
      transparent calc(50% - 12px),
      transparent calc(50% + 12px),
      rgba(37, 99, 235, 0.12) calc(50% + 12px),
      rgba(37, 99, 235, 0.12) 100%
    ) !important;
  }
  .cms-columns--3 {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 18px !important;
    background-image: linear-gradient(
      to right,
      rgba(37, 99, 235, 0.12) 0,
      rgba(37, 99, 235, 0.12) calc(33.333% - 9px),
      transparent calc(33.333% - 9px),
      transparent calc(33.333% + 9px),
      rgba(37, 99, 235, 0.12) calc(33.333% + 9px),
      rgba(37, 99, 235, 0.12) calc(66.666% - 9px),
      transparent calc(66.666% - 9px),
      transparent calc(66.666% + 9px),
      rgba(37, 99, 235, 0.12) calc(66.666% + 9px),
      rgba(37, 99, 235, 0.12) 100%
    ) !important;
  }
  @media (max-width: 1024px) {
    .cms-columns--3 {
      grid-template-columns: 1fr 1fr !important;
      background-image: linear-gradient(
        to right,
        rgba(37, 99, 235, 0.12) 0,
        rgba(37, 99, 235, 0.12) calc(50% - 9px),
        transparent calc(50% - 9px),
        transparent calc(50% + 9px),
        rgba(37, 99, 235, 0.12) calc(50% + 9px),
        rgba(37, 99, 235, 0.12) 100%
      ) !important;
    }
  }
  @media (max-width: 720px) {
    .cms-columns--2,
    .cms-columns--3 {
      grid-template-columns: 1fr !important;
      background-image: linear-gradient(
        to bottom,
        rgba(37, 99, 235, 0.1),
        rgba(37, 99, 235, 0.1)
      ) !important;
    }
  }
  .cms-feature-card,
  .cms-step-card {
    height: 100% !important;
    min-height: 0 !important;
  }
  .fg-pillars {
    counter-reset: feature-col !important;
  }
  .fg-pillars .cms-feature-card {
    counter-increment: feature-col !important;
    padding: 0 12px !important;
  }
  .fg-pillars .cms-feature-card::before {
    content: counter(feature-col, decimal-leading-zero) !important;
    display: block !important;
    color: #cf0a36 !important;
    font-size: 11px !important;
    font-weight: 800 !important;
    margin-bottom: 12px !important;
  }
  .fg-step-grid {
    counter-reset: step-col !important;
  }
  .fg-step-grid .cms-step-card {
    counter-increment: step-col !important;
  }
  .fg-step-grid .cms-step-card .cms-step-card__label::after {
    content: " " counter(step-col) !important;
  }
  .cms-step-card {
    min-height: 250px !important;
    padding: 30px !important;
    border-radius: 16px !important;
    background: #f7f6f5 !important;
  }
  .cms-step-card b {
    display: grid !important;
    width: 54px !important;
    height: 54px !important;
    place-items: center !important;
    border-radius: 16px !important;
    background: #fff !important;
  }
  .cms-step-card__label {
    display: block !important;
    margin-top: 30px !important;
    color: #d20b39 !important;
    font-size: 9px !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
  }
  .cms-step-card h3 {
    margin: 10px 0 !important;
    font-size: 22px !important;
  }
  .cms-step-card p {
    font-size: 13px !important;
  }

  .cms-block-preview { width: 250px !important; padding: 0 !important; font-family: Inter, sans-serif !important; }
  .cms-block-preview__visual { display: grid !important; min-height: 82px !important; align-content: end !important; gap: 3px !important; padding: 12px !important; border-radius: 10px !important; color: white !important; background: linear-gradient(135deg, #9e0626, #dd0038) !important; }
  .cms-block-preview__eyebrow { font-size: 9px !important; font-weight: 700 !important; text-transform: uppercase !important; }
  .cms-block-preview__visual strong { width: 80% !important; font-size: 13px !important; line-height: 1.15 !important; }
  .cms-block-preview__visual i { display: none !important; }
  .cms-block-preview__drag { display: none !important; }
  .home .site-header { border-radius: 12px !important; }
  .cms-block-float {
    display: inline-flex !important;
    align-items: center !important;
    gap: 2px !important;
    padding: 4px 6px !important;
    border-radius: 999px !important;
    background: rgba(15, 23, 42, 0.92) !important;
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.28) !important;
    backdrop-filter: blur(12px) !important;
  }
  .cms-block-float [class*="_ActionBar"] {
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
`

const BACK_HREF = '/admin/globals/home-page'

const closeLeftSidebar = (dispatch: (action: { type: 'setUi'; ui: { leftSideBarVisible: boolean } }) => void) => {
  document.querySelector('.cms-block-island')?.classList.add('is-closing')
  window.setTimeout(() => {
    dispatch({ type: 'setUi', ui: { leftSideBarVisible: false } })
  }, 420)
}

const EditorBehavior = () => {
  const isDragging = usePuck((state) => state.appState.ui.isDragging)
  const itemSelector = usePuck((state) => state.appState.ui.itemSelector)
  const leftSideBarVisible = usePuck((state) => state.appState.ui.leftSideBarVisible)
  const dispatch = usePuck((state) => state.dispatch)
  const wasDragging = useRef(false)

  useEffect(() => {
    dispatch({ type: 'setUi', ui: { previewMode: 'edit' } })
    document.documentElement.classList.add('puck-editor-host')
    document.body.classList.add('puck-is-active')

    let applying = false
    const unlockPreviewScroll = () => {
      document.querySelectorAll<HTMLIFrameElement>(
        '[class*="Puck"] iframe, iframe[name*="puck"], .cms-shell__workspace.is-puck-editor iframe, [class*="_PuckPreview-frame_"]',
      ).forEach((frame) => {
        const doc = frame.contentDocument
        if (!doc?.body) return
        doc.body.classList.remove('puck-is-active')
        doc.documentElement.classList.remove('puck-editor-host')
        doc.documentElement.style.setProperty('overflow-x', 'hidden', 'important')
        doc.documentElement.style.setProperty('overflow-y', 'auto', 'important')
        doc.documentElement.style.setProperty('height', 'auto', 'important')
        doc.documentElement.style.setProperty('max-height', 'none', 'important')
        doc.body.style.setProperty('overflow-x', 'hidden', 'important')
        doc.body.style.setProperty('overflow-y', 'auto', 'important')
        doc.body.style.setProperty('height', 'auto', 'important')
        doc.body.style.setProperty('max-height', 'none', 'important')
      })
    }

    const fillViewport = () => {
      if (applying) return
      applying = true
      try {
        const vh = `${window.innerHeight}px`
        const forcePx = (el: HTMLElement | null) => {
          if (!el) return
          el.style.setProperty('height', vh, 'important')
          el.style.setProperty('max-height', vh, 'important')
          el.style.setProperty('min-height', vh, 'important')
          el.style.setProperty('margin', '0', 'important')
          el.style.setProperty('border-radius', '0', 'important')
          el.style.setProperty('box-shadow', 'none', 'important')
        }

        const shell = document.querySelector<HTMLElement>('.cms-shell')
        if (shell) {
          shell.style.setProperty('position', 'fixed', 'important')
          shell.style.setProperty('inset', '0', 'important')
          shell.style.setProperty('width', '100vw', 'important')
          shell.style.setProperty('height', '100dvh', 'important')
          shell.style.setProperty('max-width', '100vw', 'important')
          shell.style.setProperty('max-height', '100dvh', 'important')
          shell.style.setProperty('overflow', 'hidden', 'important')
          shell.style.setProperty('padding', '0', 'important')
        }

        // payload-puck usa className "h-screen" sin CSS de Tailwind en admin:
        // hay que forzar px en toda la cadena hasta Puck (incluye wrappers anónimos).
        const puckRoot = document.querySelector<HTMLElement>('[class*="_PuckLayout"]')
        let node: HTMLElement | null = puckRoot
        while (node && !node.classList.contains('cms-shell')) {
          forcePx(node)
          node = node.parentElement
        }

        document.querySelectorAll<HTMLElement>('.h-screen, [style*="calc(100vh"]').forEach(forcePx)

        const leftSidebar = document.querySelector<HTMLElement>('[class*="_Sidebar--left_"]')
        if (leftSidebar) {
          leftSidebar.style.setProperty('position', 'relative', 'important')
          leftSidebar.style.setProperty('inset', 'auto', 'important')
          leftSidebar.style.setProperty('left', 'auto', 'important')
          leftSidebar.style.setProperty('right', 'auto', 'important')
          leftSidebar.style.setProperty('top', 'auto', 'important')
          leftSidebar.style.setProperty('bottom', 'auto', 'important')
          leftSidebar.style.setProperty('width', '100%', 'important')
          leftSidebar.style.setProperty('height', '100%', 'important')
          leftSidebar.style.setProperty('max-height', 'none', 'important')
          leftSidebar.style.setProperty('padding', '0', 'important')
          leftSidebar.style.setProperty('margin', '0', 'important')
          leftSidebar.style.setProperty('border-radius', '0', 'important')
          leftSidebar.style.setProperty('box-shadow', 'none', 'important')
        }

        document.querySelectorAll<HTMLElement>('[class*="_BlocksPlugin"]').forEach((el) => {
          el.style.setProperty('padding', '0', 'important')
          el.style.setProperty('height', '100%', 'important')
          el.style.setProperty('max-height', 'none', 'important')
          el.style.setProperty('border-radius', '0', 'important')
          el.style.setProperty('box-shadow', 'none', 'important')
          el.style.setProperty('overflow', 'hidden', 'important')
        })

        const island = document.querySelector<HTMLElement>('.cms-block-island')
        if (island) {
          island.style.setProperty('height', '100%', 'important')
          island.style.setProperty('border-radius', '0', 'important')
          island.style.setProperty('box-shadow', 'none', 'important')
          island.style.setProperty('margin', '0', 'important')
        }

        unlockPreviewScroll()
      } finally {
        window.setTimeout(() => {
          applying = false
        }, 0)
      }
    }

    fillViewport()
    const t1 = window.setTimeout(fillViewport, 50)
    const t2 = window.setTimeout(fillViewport, 250)
    const t3 = window.setTimeout(fillViewport, 800)
    const t4 = window.setTimeout(unlockPreviewScroll, 1200)
    const onResize = () => fillViewport()
    window.addEventListener('resize', onResize)

    return () => {
      document.documentElement.classList.remove('puck-editor-host')
      document.body.classList.remove('puck-is-active')
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      window.clearTimeout(t4)
      window.removeEventListener('resize', onResize)
    }
  }, [dispatch])

  useEffect(() => {
    if (itemSelector) {
      dispatch({ type: 'setUi', ui: { rightSideBarVisible: true } })
    }
  }, [dispatch, itemSelector])

  useEffect(() => {
    if (!leftSideBarVisible) return
    // Reaplica layout cuando se abre el catálogo (Puck remonta el sidebar).
    const t = window.setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 30)
    return () => window.clearTimeout(t)
  }, [leftSideBarVisible])

  useEffect(() => {
    if (wasDragging.current && !isDragging) {
      closeLeftSidebar(dispatch)
    }
    wasDragging.current = isDragging
  }, [dispatch, isDragging])

  useEffect(() => {
    if (!leftSideBarVisible) return

    const isInsideChrome = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      return Boolean(
        target.closest('[class*="_Sidebar--left_"]') ||
          target.closest('[class*="_PuckLayout-nav_"]') ||
          target.closest('.cms-puck-back') ||
          target.closest('.cms-block-island'),
      )
    }

    const onPointerDown = (event: Event) => {
      if (isInsideChrome(event.target)) return
      closeLeftSidebar(dispatch)
    }

    document.addEventListener('pointerdown', onPointerDown, true)

    const frame = document.querySelector<HTMLIFrameElement>(
      '[class*="Puck"] iframe, iframe[name*="puck"], .cms-shell__workspace.is-puck-editor iframe',
    )
    const frameDoc = frame?.contentDocument
    frameDoc?.addEventListener('pointerdown', onPointerDown, true)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      frameDoc?.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [dispatch, leftSideBarVisible])

  return (
    <Link href={BACK_HREF} className="cms-puck-back" aria-label="Volver al CMS" title="Volver">
      <ArrowLeft size={18} aria-hidden="true" />
    </Link>
  )
}

const BlockActionBar = ({
  label,
  children,
  parentAction,
}: {
  label?: string
  children: React.ReactNode
  parentAction: React.ReactNode
}) => {
  const dispatch = usePuck((state) => state.dispatch)
  const itemSelector = usePuck((state) => state.appState.ui.itemSelector)
  const zoneLength = usePuck((state) => state.appState.data.content.length)

  const move = (direction: -1 | 1) => {
    if (!itemSelector) return
    const destinationIndex = itemSelector.index + direction
    if (destinationIndex < 0 || destinationIndex >= zoneLength) return
    dispatch({
      type: 'reorder',
      sourceIndex: itemSelector.index,
      destinationIndex,
      destinationZone: itemSelector.zone ?? 'root',
    })
  }

  const canMoveUp = Boolean(itemSelector && itemSelector.index > 0)
  const canMoveDown = Boolean(itemSelector && itemSelector.index < zoneLength - 1)

  return (
    <div className="cms-block-float" data-puck-overlay-portal>
      <ActionBar>
        <ActionBar.Group>
          {parentAction}
          <ActionBar.Label label={label || 'Bloque'} />
        </ActionBar.Group>
        <ActionBar.Group>
          <ActionBar.Action label="Indicador de arrastre">
            <GripVertical size={15} aria-hidden="true" />
          </ActionBar.Action>
          <ActionBar.Action
            label="Subir bloque"
            disabled={!canMoveUp}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              move(-1)
            }}
          >
            <ArrowUp size={15} aria-hidden="true" />
          </ActionBar.Action>
          <ActionBar.Action
            label="Bajar bloque"
            disabled={!canMoveDown}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              move(1)
            }}
          >
            <ArrowDown size={15} aria-hidden="true" />
          </ActionBar.Action>
          {children}
        </ActionBar.Group>
      </ActionBar>
    </div>
  )
}

const DrawerPreview = ({ name, children }: { name: string; children: React.ReactNode }) => {
  const details = previewDetails[name] ?? {
    eyebrow: name,
    title: name,
    tone: 'hero',
  }

  return (
    <div className={`cms-block-preview cms-block-preview--${details.tone}`}>
      <div className="cms-block-preview__visual" aria-hidden="true">
        <span className="cms-block-preview__eyebrow">{details.eyebrow}</span>
        <strong>{details.title}</strong>
        <i />
      </div>
      <div className="cms-block-preview__drag" style={{ position: 'absolute', inset: 0, zIndex: 10, opacity: 0, cursor: 'grab' }}>
        {children}
      </div>
    </div>
  )
}

const DrawerIsland = ({ children }: { children: React.ReactNode }) => {
  const dispatch = usePuck((state) => state.dispatch)
  const [isClosing, setIsClosing] = useState(false)

  const close = () => {
    setIsClosing(true)
    window.setTimeout(() => {
      dispatch({ type: 'setUi', ui: { leftSideBarVisible: false } })
    }, 420)
  }

  return (
    <section className={`cms-block-island${isClosing ? ' is-closing' : ''}`} aria-label="Catálogo de bloques">
      <header className="cms-block-island__header">
        <div>
          <span>Constructor visual</span>
          <strong>Agregar un bloque</strong>
        </div>
        <button type="button" aria-label="Cerrar catálogo de bloques" title="Cerrar" onClick={close}>
          <X size={18} aria-hidden="true" />
        </button>
      </header>
      <div className="cms-block-island__content">{children}</div>
    </section>
  )
}

export const homeEditorPlugin: Plugin = {
  overrides: {
    header: () => <></>,
    actionBar: BlockActionBar,
    drawer: DrawerIsland,
    drawerItem: DrawerPreview,
    puck: ({ children }) => (
      <>
        <EditorBehavior />
        {children}
      </>
    ),
  },
}
