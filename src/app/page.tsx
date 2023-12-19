import { getServerAuthSession } from "@/server/auth";
import { Button } from "./_components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <Button>Test button</Button>
    </main>
  );
}
