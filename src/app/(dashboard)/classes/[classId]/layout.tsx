import { Separator } from "@/app/_components/ui/separator";
import { Sidebar } from "./sidebar";
import { Badge } from "@/app/_components/ui/badge";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { classId: string };
}) {
  return (
    <div className="p-8">
      <div>
        <h1 className="mt-0 text-3xl font-bold">
          AP US Government and Politics
        </h1>
        {/* <h4 className="text-muted-foreground">Lorem ipsum dolor sit amet</h4> */}
        <div className="mt-2 flex flex-row gap-2">
          <Badge variant={"secondary"}>Kristin Simerly</Badge>
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="flex w-full gap-8 py-8">
        <div className="">
          <Sidebar classId={params.classId} />
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
