import { ClassInfo } from "./class-info";
import { Sidebar } from "@/app/_components/sidebar";
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
      <div className="flex w-full gap-8 px-8">
        <div>
          <Sidebar
            className="w-[15vw] min-w-[12rem]"
            items={[
              {
                name: "Overview",
                href: `/classes/${params.classId}`,
                matchMethod: "equal",
              },
              {
                name: "Modules",
                href: `/classes/${params.classId}/modules`,
              },
              {
                name: "Assignments",
                href: `/classes/${params.classId}/assignments`,
              },
              {
                name: "Grades",
                href: `/classes/${params.classId}/grades`,
              },
            ]}
          />
        </div>
        <div className="max-w-full grow py-8">{children}</div>
      </div>
    </div>
  );
}
