"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./_components/ui/button";
import { UserButton } from "./_components/ui/user-button";

export default function Page(): React.ReactElement {
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
        onClick={async () => {
          await signOut();
        }}
        variant="secondary"
      >
        Sign out
      </Button>
      {session.data?.user.name}
      <UserButton />
    </>
  );
}
