"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { queryOpts } from "@/lib/utils";
import { api } from "@/trpc/react";

export function ClassInfo({ classId }: { classId: string }): React.ReactNode {
  const classFetcher = api.user.getClasses.useQuery(undefined, queryOpts);
  const classInfo = classFetcher.data?.find((singleClass) => {
    return singleClass.id === classId;
  });

  api.canvas.getAssignments.useQuery({ classId }, queryOpts);
  api.canvas.getModules.useQuery(classId, queryOpts);

  if (!classFetcher.isFetched)
    return (
      <div className="flex h-[30vh] min-h-[12rem] flex-col justify-center bg-card p-8 shadow-[inset_0px_-3px_44px_-26px_rgba(0,0,0,0.4)] dark:shadow-none">
        <Skeleton className="h-9 w-96" />
        <div className="mt-2 flex flex-row gap-2">
          <Skeleton className="h-[22px] w-28" />
        </div>
      </div>
    );

  return (
    <div className="flex h-[30vh] min-h-[12rem] flex-col justify-center bg-card p-8 shadow-[inset_0px_-3px_44px_-26px_rgba(0,0,0,0.4)] dark:shadow-none">
      <h1 className="mt-0 text-3xl font-extrabold lg:text-4xl">
        {classInfo?.name}
      </h1>
      {/* <h4 className="text-muted-foreground">Lorem ipsum dolor sit amet</h4> */}
      <div className="mt-2 flex flex-row gap-2">
        {classInfo?.teachers?.map((teacher) => {
          return (
            <Badge key={teacher} variant="default">
              {teacher}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
