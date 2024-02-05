"use client";

import { NextUIProvider, type NextUIProviderProps } from "@nextui-org/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function NextUIClientProvider(
  props: NextUIProviderProps,
): React.ReactElement {
  return (
    <>
      <SpeedInsights />
      <NextUIProvider {...props} />
    </>
  );
}
