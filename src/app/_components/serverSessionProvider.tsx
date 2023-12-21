"use client";

import { SessionProvider, type SessionProviderProps } from "next-auth/react";

export function ServerSessionProvider(props: SessionProviderProps) {
  return <SessionProvider {...props} />;
}
