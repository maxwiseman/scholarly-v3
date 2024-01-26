"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { LinkButton } from "../_components/ui/button";
import { Badge } from "../_components/ui/badge";

export default function Page(): React.ReactElement {
  return (
    <main>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        <Badge variant="secondary">Beta</Badge>
        <h1 className="text-8xl font-bold">Scholarly</h1>
        <h2 className="text-3xl">All your data in one place</h2>
        <LinkButton className="mt-6" href="/sign-in">
          Get started <IconArrowRight className="ml-2 h-4 w-4" />
        </LinkButton>
      </div>
    </main>
  );
}
