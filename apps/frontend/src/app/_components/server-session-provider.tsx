"use client";

import { SessionProvider, type SessionProviderProps } from "next-auth/react";

export function ServerSessionProvider(
  props: SessionProviderProps,
): React.ReactElement {
  return <SessionProvider {...props} />;
}
