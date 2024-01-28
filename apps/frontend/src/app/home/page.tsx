"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { LinkButton } from "../_components/ui/button";
import { Badge } from "../_components/ui/badge";
import { Spotlight } from "../_components/ui/spotlight";

export default function Page(): React.ReactElement {
  return (
    <main>
      <div className="dark:bg-grid-white/[0.02] bg-grid-black/[0.04] flex h-screen w-screen flex-col items-center justify-center gap-2">
        <Spotlight className="invert" />
        <Badge variant="secondary">Beta</Badge>
        <h1 className="h-[5rem] min-h-max bg-gradient-to-b from-foreground to-neutral-400 bg-clip-text text-center text-7xl font-bold text-transparent dark:to-neutral-600 md:h-[6.4rem]  md:text-8xl">
          Scholarly
        </h1>
        <h2 className="text-lg text-neutral-500">Learning made easy</h2>
        <LinkButton className="mt-6" href="/sign-in">
          Get started <IconArrowRight className="ml-2 h-4 w-4" />
        </LinkButton>
      </div>
    </main>
  );
}
