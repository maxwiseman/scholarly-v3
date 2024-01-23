"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HomePage from "./home/page";

export default function Page(): React.ReactElement {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.replace("/dashboard");
  }

  return <HomePage />;

  // return (
  //   <>
  //     <Button
  //       onClick={async () => {
  //         await signIn();
  //       }}
  //     >
  //       Sign in
  //     </Button>
  //     <Button
  //       onClick={async () => {
  //         await signOut();
  //       }}
  //       variant="secondary"
  //     >
  //       Sign out
  //     </Button>
  //     {session.data?.user.name}
  //     <UserButton />
  //   </>
  // );
}
