import { Button, LinkButton } from "./_components/ui/button";

export default function Page(): React.ReactElement {
  return (
    <main>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        This page was not found
        <div>
          <LinkButton href="/">Go Home</LinkButton>
        </div>
      </div>
    </main>
  );
}
