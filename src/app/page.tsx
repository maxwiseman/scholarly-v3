"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./_components/ui/button";
import { UserButton } from "./_components/ui/user-button";
export default function Page() {
  const session = useSession();

  return (
    <>
      <Button
        onClick={async () => {
          await signIn();
        }}
      >
        Sign in
      </Button>
      <Button
        variant={"secondary"}
        onClick={async () => {
          await signOut();
        }}
      >
        Sign out
      </Button>
      {session.data?.user.name}
      <UserButton />
    </>
  );
}
