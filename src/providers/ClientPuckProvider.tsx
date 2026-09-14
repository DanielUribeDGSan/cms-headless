"use client";

import { useMemo } from 'react';
import { PuckConfigProvider } from '@delmaredigital/payload-puck/client';
import { puckConfig } from '@/puck.config';
import { homeEditorCanvasCss, homeEditorPlugin } from './HomeEditorPlugin';

export function ClientPuckProvider({ children }: { children: React.ReactNode }) {
  const plugins = useMemo(() => [homeEditorPlugin], []);

  return (
    <PuckConfigProvider config={puckConfig} plugins={plugins} editorCss={homeEditorCanvasCss}>
      {children}
    </PuckConfigProvider>
  );
}
