"use client";

import { Button, LinkButton } from "./_components/ui/button";

export default function Page(): React.ReactElement {
  return (
    <main>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        Woah there! Something went wrong! If this keeps happening, please
        contact us.
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => {
              location.reload();
            }}
          >
            Reload the page
          </Button>
          <LinkButton href="/" variant="secondary">
            Go home
          </LinkButton>
          <LinkButton href="mailto:max@maxwiseman.io" variant="secondary">
            Contact us
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
