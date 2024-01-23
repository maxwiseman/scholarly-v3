"use client";

import { useRouter } from "next/navigation";
import { Button, LinkButton } from "./_components/ui/button";

export default function Page(): React.ReactElement {
  const router = useRouter();

  return (
    <main>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        Woah there! Something went wrong! If this keeps happening, please
        contact us.
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => {
              router.refresh();
            }}
          >
            Reload the page
          </Button>
          <LinkButton variant={"secondary"} href="mailto:max@maxwiseman.io">
            Contact us
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
