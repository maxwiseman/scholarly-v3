"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { LinkButton } from "../_components/ui/button";
import { Badge } from "../_components/ui/badge";
import { Spotlight } from "../_components/ui/spotlight";

export default function Page(): React.ReactElement {
  return (
    <main>
      <div className="bg-grid-white/[0.02] flex h-screen w-screen flex-col items-center justify-center gap-2">
        <Spotlight />
        <Badge variant="secondary">Beta</Badge>
        <h1 className="h-[6.4rem] min-h-max bg-gradient-to-b from-foreground to-neutral-600 bg-clip-text text-center text-8xl font-bold  text-transparent">
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
