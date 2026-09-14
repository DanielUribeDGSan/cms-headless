'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'
import type { HomeEntity, HomeLayoutBlock } from '../../domain/home.entity'

type RawBlock = Record<string, unknown> & { blockType?: string; id?: string }

const strings = (value: unknown) => String(value ?? '')
const rows = (value: unknown) => Array.isArray(value) ? value as Record<string, unknown>[] : []

const mapBlock = (block: RawBlock): HomeLayoutBlock | null => {
  // Initial server data is already mapped to the domain shape. Live Preview
  // updates from Payload are flat, so only those need the field-by-field map.
  if (block.data && typeof block.data === 'object') {
    return block as unknown as HomeLayoutBlock
  }

  const base = { id: block.id }
  switch (block.blockType) {
    case 'hero': return { ...base, blockType: 'hero', data: { kicker: strings(block.kicker), title: strings(block.title), lead: strings(block.lead), legal: strings(block.legal), primaryButton: { text: strings(block.primaryButtonText), url: strings(block.primaryButtonUrl) }, secondaryButton: { text: strings(block.secondaryButtonText), url: strings(block.secondaryButtonUrl) } } }
    case 'experience': return { ...base, blockType: 'experience', data: { title: strings(block.title), lead: strings(block.lead), features: rows(block.features).map(item => ({ title: strings(item.title), description: strings(item.description), icon: strings(item.icon) })), reverseScenes: Boolean(block.reverseScenes), reverseDownload: Boolean(block.reverseDownload) } }
    case 'account': return { ...base, blockType: 'account', data: { title: strings(block.title), lead: strings(block.lead), reverseLayout: Boolean(block.reverseLayout) } }
    case 'steps': return { ...base, blockType: 'steps', data: { title: strings(block.title), list: rows(block.list).map(item => ({ title: strings(item.title), description: strings(item.description) })) } }
    case 'promo': return { ...base, blockType: 'promo', data: { title: strings(block.title), lead: strings(block.lead), button: strings(block.button), reverseLayout: Boolean(block.reverseLayout) } }
    case 'security': return { ...base, blockType: 'security', data: { title: strings(block.title), lead: strings(block.lead) } }
    case 'learn': return { ...base, blockType: 'learn', data: { title: strings(block.title), lead: strings(block.lead) } }
    case 'newsletter': return { ...base, blockType: 'newsletter', data: { title: strings(block.title), lead: strings(block.lead), reverseLayout: Boolean(block.reverseLayout) } }
    case 'faq': return { ...base, blockType: 'faq', data: { title: strings(block.title), list: rows(block.list).map(item => ({ question: strings(item.question), answer: strings(item.answer) })) } }
    case 'footer': return { ...base, blockType: 'footer', data: { copyright: strings(block.copyright), links: rows(block.links).map(item => ({ label: strings(item.label), url: strings(item.url) })) } }
    default: return null
  }
}

import { getThemeConfig } from '@/themes'

export const LiveHomePage = ({ initialData, serverURL }: { initialData: HomeEntity; serverURL: string }) => {
  const { data } = useLivePreview<Record<string, unknown>>({ initialData: initialData as any, serverURL, depth: 2 })
  const liveLayout = Array.isArray(data.layout) ? data.layout.map(block => mapBlock(block as RawBlock)).filter((block): block is HomeLayoutBlock => block !== null) : undefined
  const View = getThemeConfig().HomePage;
  return <View data={liveLayout ? { ...initialData, layout: liveLayout } : initialData} />
}
