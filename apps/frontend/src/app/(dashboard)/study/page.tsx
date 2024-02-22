import { MenuCard } from "./menu-card";
import { Separator } from "@/app/_components/ui/separator";
import { api } from "@/trpc/server";

export default async function Page(): Promise<React.ReactElement> {
  const data = await api.user.getStudySets.query();

  return (
    <div className="p-8 py-10">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Study Sets
      </h1>
      <Separator className="mt-4" />
      <div className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {data.map((set) => {
          return <MenuCard cardSet={set} key={set.slug} />;
        })}
      </div>
    </div>
  );
}

export interface CardSet {
  name: string;
  slug: string;
  description: string;
  cards: Card[];
}

export interface Card {
  front: { heading: string; subheading?: string };
  back: { heading: string; description: string };
}
