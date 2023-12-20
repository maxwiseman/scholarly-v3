"use client";

import { Button } from "./_components/ui/button";
import { signIn } from "next-auth/react";
export default function Page() {
  return (
    <Button
      onClick={async () => {
        await signIn();
      }}
    >
      Sign in
    </Button>
  );
}
