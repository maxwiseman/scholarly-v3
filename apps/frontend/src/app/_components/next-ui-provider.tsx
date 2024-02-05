"use client";

import { NextUIProvider, type NextUIProviderProps } from "@nextui-org/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export function NextUIClientProvider(
  props: NextUIProviderProps,
): React.ReactElement {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <NextUIProvider {...props} />
    </>
  );
}
