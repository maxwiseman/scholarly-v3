import React from "react";
import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function Page(): React.ReactElement {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-96" />
          <div>
            Points Possible:{" "}
            <Skeleton className="inline-block h-[1.125rem] w-4" />
          </div>
          <div>
            Date Due: <Skeleton className="inline-block h-[1.125rem] w-28" />
          </div>
          <div>
            Allowed Attempts:{" "}
            <Skeleton className="inline-block h-[1.125rem] w-4" />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="typography" />
      </div>
    </div>
  );
}
