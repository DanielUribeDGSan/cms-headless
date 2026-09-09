'use client'

import { FileText, LayoutDashboard, Menu, Moon, Palette, PanelLeft, Search, Settings, Sun, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuth, useTheme } from '@payloadcms/ui'
import { ClientPuckProvider } from '@/providers/ClientPuckProvider'

const colors = ['#0f172a', '#2563eb', '#7c3aed', '#e11d48']

export const ShadcnLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [accent, setAccent] = useState(colors[0])

  useEffect(() => {
    const stored = window.localStorage.getItem('cms-accent')
    if (stored && colors.includes(stored)) setAccent(stored)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--cms-accent', accent)
    window.localStorage.setItem('cms-accent', accent)
  }, [accent])

  if (/\/(login|forgot|reset|create-first-user)/.test(pathname)) return children

  const isActive = (href: string) => href === '/admin' ? pathname === href : pathname.startsWith(href)
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'CM'
  const navLink = (href: string, label: string, icon: React.ReactNode) => (
    <Link className={`cms-shell__nav-link${isActive(href) ? ' is-active' : ''}`} href={href} onClick={() => setMobileOpen(false)}>
      {icon}<span>{label}</span>
    </Link>
  )

  const isPuckEditor = pathname?.includes('/puck-editor') || false

  return (
    <div className="cms-shell">
      {mobileOpen && <button className="cms-shell__scrim" aria-label="Cerrar menú" onClick={() => setMobileOpen(false)} />}
      
      {!isPuckEditor && (
        <aside className={`cms-shell__sidebar${mobileOpen ? ' is-open' : ''}`}>
          <div className="cms-shell__brand">
            <span className="cms-shell__brand-icon"><LayoutDashboard size={17} /></span>
            <span><strong>Company CMS</strong><small>Payload + Shadcn UI</small></span>
          </div>
          <nav className="cms-shell__navigation" aria-label="Navegación principal">
            <p>General</p>
            {navLink('/admin', 'Dashboard', <LayoutDashboard size={17} />)}
            <p>Contenido</p>
            {navLink('/admin/collections/pages', 'Páginas', <FileText size={17} />)}
            {navLink('/admin/globals/home-page', 'Editar página de inicio', <PanelLeft size={17} />)}
            <p>Administración</p>
            {navLink('/admin/collections/users', 'Usuarios', <Users size={17} />)}
            {navLink('/admin/account', 'Configuración', <Settings size={17} />)}
          </nav>
          <Link className="cms-shell__user" href="/admin/account">
            <span className="cms-shell__avatar">{initials}</span>
            <span><strong>{user?.email?.split('@')[0] ?? 'Administrador'}</strong><small>{user?.email ?? 'Cuenta del CMS'}</small></span>
          </Link>
        </aside>
      )}

      <section className={`cms-shell__workspace${isPuckEditor ? ' is-puck-editor' : ''}`}>
        {!isPuckEditor && (
          <header className="cms-shell__header">
            <div className="cms-shell__header-nav">
              <button className="cms-shell__icon-button cms-shell__menu" aria-label="Abrir menú" onClick={() => setMobileOpen(true)}><Menu size={19} /></button>
              <span className="cms-shell__divider" />
              <Link className={isActive('/admin') ? 'is-active' : ''} href="/admin">Overview</Link>
              <Link href="/admin/collections/pages">Contenido</Link>
              <Link href="/admin/collections/users">Usuarios</Link>
              <Link href="/admin/account">Settings</Link>
            </div>
            <div className="cms-shell__tools">
              <label className="cms-shell__search"><Search size={16} /><input aria-label="Buscar en el CMS" placeholder="Search" /><kbd>⌘ K</kbd></label>
              <button className="cms-shell__icon-button" aria-label="Cambiar tema" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}</button>
              <div className="cms-shell__palette-wrap">
                <button className="cms-shell__icon-button" aria-label="Cambiar color" onClick={() => setPaletteOpen(!paletteOpen)}><Palette size={18} /></button>
                {paletteOpen && <div className="cms-shell__palette">{colors.map(color => <button key={color} aria-label={`Color ${color}`} className={accent === color ? 'is-active' : ''} style={{ background: color }} onClick={() => { setAccent(color); setPaletteOpen(false) }} />)}</div>}
              </div>
              <Link className="cms-shell__avatar" href="/admin/account">{initials}</Link>
            </div>
          </header>
        )}
        <main className="cms-shell__content">
          {isPuckEditor ? (
            <ClientPuckProvider>{children}</ClientPuckProvider>
          ) : (
            children
          )}
        </main>
      </section>
    </div>
  )
}
