"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { api } from "@/trpc/react";

export function ClassInfo({ classId }: { classId: string }): React.ReactNode {
  const classFetcher = api.aspen.getClasses.useQuery();
  const classInfo = classFetcher.data?.find((singleClass) => {
    return singleClass.id == classId;
  });

  if (!classFetcher.isFetched)
    return (
      <div>
        <Skeleton className="h-9 w-96" />
        <div className="mt-2 flex flex-row gap-2">
          <Skeleton className="h-[22px] w-28" />
        </div>
      </div>
    );

  return (
    <div>
      <h1 className="mt-0 text-3xl font-bold">{classInfo?.name}</h1>
      {/* <h4 className="text-muted-foreground">Lorem ipsum dolor sit amet</h4> */}
      <div className="mt-2 flex flex-row gap-2">
        {classInfo?.teachers?.map((teacher) => {
          return <Badge variant={"secondary"}>{teacher}</Badge>;
        })}
      </div>
    </div>
  );
}