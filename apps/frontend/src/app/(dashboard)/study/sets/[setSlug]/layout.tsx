import { sets } from "../../sets";
import { Separator } from "@/app/_components/ui/separator";

export default function Layout({
  params,
  children,
}: {
  params: { setSlug: string };
  children: React.ReactNode;
}): React.ReactElement {
  const setData = sets.filter((set) => set.slug === params.setSlug)[0];
  if (!setData) {
    return <div>Set not found</div>;
  }
  return (
    <div>
      <div className="flex h-[30vh] min-h-[12rem] flex-col justify-center bg-card p-8 shadow-[inset_0px_-3px_44px_-26px_rgba(0,0,0,0.4)] dark:shadow-none">
        <h1 className="mt-0 text-4xl font-extrabold">{setData.title}</h1>
        {/* <h4 className="text-muted-foreground">Lorem ipsum dolor sit amet</h4> */}
        <div className="mt-2 text-muted-foreground">{setData.description}</div>
      </div>
      <Separator />
      <div className="flex w-full gap-8 p-8 pb-10">
        <div className="max-w-full grow">{children}</div>
      </div>
    </div>
  );
}
