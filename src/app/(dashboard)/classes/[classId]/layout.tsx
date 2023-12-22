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
    <div>
      <ClassInfo classId={params.classId} />
      <Separator />
      <div className="flex w-full gap-8 p-8">
        <div className="">
          <Sidebar classId={params.classId} />
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
