import React from 'react'

/** Título editable: string en live / ReactNode en Puck contentEditable */
export function EditableHeading({
  as: Tag = 'h2',
  value,
  fallback,
  className,
  ...rest
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  value?: React.ReactNode
  fallback?: string
  className?: string
} & React.HTMLAttributes<HTMLElement>) {
  const content = value ?? fallback
  if (typeof content === 'string') {
    return (
      <Tag
        className={className}
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
        {...rest}
      />
    )
  }
  return (
    <Tag className={className} {...rest}>
      {content}
    </Tag>
  )
}
