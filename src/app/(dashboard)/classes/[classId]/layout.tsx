import { Separator } from "@/app/_components/ui/separator";
import { ClassInfo } from "./class-info";
import { Sidebar } from "./sidebar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { classId: string };
}) {
  return (
    <div className="p-8">
      <ClassInfo classId={params.classId} />
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
