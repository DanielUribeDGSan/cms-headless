'use client'

import { Render, type Data } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'

export const PuckPageRender = ({ data }: { data: Data }) => (
  <Render config={puckConfig} data={data} />
)
