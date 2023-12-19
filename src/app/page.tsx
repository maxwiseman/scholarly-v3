import { getServerAuthSession } from "@/server/auth";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { api } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  const data = await api.aspen.getClasses.query();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-1">
      <div className="flex gap-2">
        <Input placeholder="Type something..." className="max-w-md" />
        <Button>Submit</Button>
      </div>
      <ul>
        {data.map((classData) => {
          return <li>{classData.name}</li>;
        })}
      </ul>
    </main>
  );
}
