"use client";

import React from "react";
import { api } from "@/trpc/react";
import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function Page({
  params,
}: {
  params: { classId: string; assignmentId: string };
}): React.ReactElement {
  const assignmentData = api.canvas.getAssignment.useQuery(params);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          {assignmentData.isFetched ? (
            <h1 className="mt-0 text-3xl font-bold">
              {assignmentData.data?.name}
            </h1>
          ) : (
            <Skeleton className="h-9 w-96" />
          )}
          <div>
            Points Possible:{" "}
            {assignmentData.isFetched ? (
              assignmentData.data?.points_possible
            ) : (
              <Skeleton className="inline-block h-[1.125rem] w-4" />
            )}
          </div>
          <div>
            Date Due:{" "}
            {assignmentData.isFetched ? (
              new Date(assignmentData.data?.due_at || 0).toLocaleDateString(
                "en-us",
                {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                },
              )
            ) : (
              <Skeleton className="inline-block h-[1.125rem] w-28" />
            )}
          </div>
        </div>
        <Separator className="my-4" />
        <div
          className="typography"
          dangerouslySetInnerHTML={{
            __html:
              assignmentData.data?.description.replaceAll(
                /href="https:\/\/knoxschools\.instructure\.com\/courses\/[^/]*/g,
                `href="/classes/${params.classId}`,
              ) || "",
          }}
        />
      </div>
    </div>
  );
}
