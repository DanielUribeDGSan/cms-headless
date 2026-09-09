import React from 'react'

const Mark = ({ compact = false }: { compact?: boolean }) => (
  <span className={compact ? 'cms-brand-mark cms-brand-mark--compact' : 'cms-brand-mark'} aria-hidden="true">
    <svg viewBox="0 0 24 24" role="img">
      <path d="M5 7.25A2.25 2.25 0 0 1 7.25 5h2.5v5h-5v-2.75ZM14.25 5h2.5A2.25 2.25 0 0 1 19 7.25v2.5h-5V5ZM4.75 14.25h5v5h-2.5A2.25 2.25 0 0 1 5 17v-2.75ZM14.25 14.25h5V17A2.25 2.25 0 0 1 17 19.25h-2.75v-5Z" />
    </svg>
  </span>
)

export const AdminBrand = () => (
  <div className="cms-nav-brand">
    <Mark />
    <span className="cms-nav-brand__copy">
      <strong>Company CMS</strong>
      <small>Powered by Payload</small>
    </span>
  </div>
)

export const AdminLogo = () => (
  <div className="cms-login-brand">
    <Mark />
    <span>Company CMS</span>
  </div>
)

export const AdminIcon = () => <Mark compact />
