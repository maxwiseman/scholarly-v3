"use client";

import { NextUIProvider, type NextUIProviderProps } from "@nextui-org/react";

export function NextUIClientProvider(
  props: NextUIProviderProps,
): React.ReactElement {
  return <NextUIProvider {...props} />;
}
