"use client";

import { PuckConfigProvider } from '@delmaredigital/payload-puck/client';
import { puckConfig } from '@/puck.config';

export function ClientPuckProvider({ children }: { children: React.ReactNode }) {
  return (
    <PuckConfigProvider config={puckConfig as any}>
      {children}
    </PuckConfigProvider>
  );
}
