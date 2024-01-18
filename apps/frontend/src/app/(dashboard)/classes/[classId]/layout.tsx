import { ClassInfo } from "./class-info";
import { Sidebar } from "./sidebar";
import { Separator } from "@/app/_components/ui/separator";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { classId: string };
}): React.ReactElement {
  return (
    <div>
      <ClassInfo classId={params.classId} />
      <Separator />
      <div className="flex w-full gap-8 p-8">
        <div>
          <Sidebar classId={params.classId} />
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
