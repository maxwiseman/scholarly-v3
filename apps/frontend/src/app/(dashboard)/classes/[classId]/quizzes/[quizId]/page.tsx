"use client";

import React from "react";
import { Take } from "./take";
import { api } from "@/trpc/react";
import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { queryOpts } from "@/lib/utils";

export default function Page({
  params,
}: {
  params: { classId: string; quizId: string };
}): React.ReactElement {
  const quizData = api.canvas.getQuiz.useQuery(params, queryOpts);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          {quizData.isFetched ?
            <h1 className="mt-0 text-3xl font-bold">{quizData.data?.title}</h1>
          : <Skeleton className="h-9 w-96" />}
          <div>
            Points Possible:{" "}
            {quizData.isFetched ?
              quizData.data?.points_possible
            : <Skeleton className="inline-block h-[1.125rem] w-4" />}
          </div>
          <div>
            Date Due:{" "}
            {quizData.isFetched ?
              new Date(quizData.data?.due_at || 0).toLocaleDateString("en-us", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : <Skeleton className="inline-block h-[1.125rem] w-28" />}
          </div>
          <div>
            Allowed Attempts:{" "}
            {/* eslint-disable-next-line no-nested-ternary -- It's fine */}
            {quizData.isFetched ?
              quizData.data?.allowed_attempts === 0 ?
                "∞"
              : quizData.data?.allowed_attempts
            : <Skeleton className="inline-block h-[1.125rem] w-4" />}
          </div>
        </div>
        <Separator className="my-4" />
        <div
          className="typography"
          dangerouslySetInnerHTML={{
            __html:
              quizData.data?.description.replaceAll(
                /href="https:\/\/knoxschools\.instructure\.com\/courses\/[^/]*/g,
                `href="/classes/${params.classId}`,
              ) || "",
          }}
        />
        {quizData.data?.description ?? <Separator className="my-4" />}
        {quizData.data !== undefined && (
          <Take params={params} quiz={quizData.data} />
        )}
      </div>
    </div>
  );
}
