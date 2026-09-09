import type { ServerFunctionClient } from 'payload'
import config from '@/payload.config'
import '@payloadcms/next/css'
import './custom-admin.css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap.js'
import { ShadcnLayoutWrapper } from '@/components/payload/ShadcnLayoutWrapper'
import { ClientPuckProvider } from '@/providers/ClientPuckProvider'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout 
    config={config} 
    importMap={importMap} 
    serverFunction={serverFunction}
  >
    <ClientPuckProvider>
      <ShadcnLayoutWrapper>{children}</ShadcnLayoutWrapper>
    </ClientPuckProvider>
  </RootLayout>
)

export default Layout
