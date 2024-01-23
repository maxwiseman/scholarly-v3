"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { LinkButton } from "../_components/ui/button";

export default function Page(): React.ReactElement {
  return (
    <main>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        <h1 className="text-8xl font-bold">Scholarly</h1>
        <h2 className="text-3xl">Welcome to the future of learning</h2>
        <LinkButton className="mt-6" href="/sign-in">
          Get started <IconArrowRight className="ml-2 h-4 w-4" />
        </LinkButton>
      </div>
    </main>
  );
}