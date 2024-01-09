"use client";

import React from "react";
import { api } from "@/trpc/react";
import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function Page({
  params,
}: {
  params: { classId: string; pageId: string };
}): React.ReactElement {
  const pageData = api.canvas.getPage.useQuery(params);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          {pageData.isFetched ? (
            <h1 className="mt-0 text-3xl font-bold">{pageData.data?.title}</h1>
          ) : (
            <Skeleton className="h-9 w-96" />
          )}
        </div>
        <Separator className="my-4" />
        <div
          className="typography"
          dangerouslySetInnerHTML={{
            __html:
              pageData.data?.body.replaceAll(
                /href="https:\/\/knoxschools\.instructure\.com\/courses\/[^/]*/g,
                `href="/classes/${params.classId}`,
              ) || "",
          }}
        />
      </div>
    </div>
  );
}
