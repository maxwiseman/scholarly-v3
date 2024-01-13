import React from "react";
import { Actions, Submission } from "./client";
import { api } from "@/trpc/server";
import { Separator } from "@/app/_components/ui/separator";

export default async function Page({
  params,
}: {
  params: { classId: string; assignmentId: string };
}): Promise<React.ReactElement> {
  const assignmentData = await api.canvas.getAssignment.query(params);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="mt-0 text-3xl font-bold">{assignmentData.name}</h1>
            <div>Points Possible: {assignmentData.points_possible}</div>
            <div>
              Date Due:{" "}
              {new Date(assignmentData.due_at || 0).toLocaleDateString(
                "en-us",
                {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                },
              )}
            </div>
          </div>
          <Actions assignment={assignmentData} />
        </div>
        <Separator className="my-6" />
        <div
          className="typography"
          dangerouslySetInnerHTML={{
            __html:
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is sometimes empty
              assignmentData.description?.replaceAll(
                /href="https:\/\/knoxschools\.instructure\.com\/courses\/[^/]*/g,
                `href="/classes/${params.classId}`,
              ) || "",
          }}
        />
        {assignmentData.description !== "" && <Separator className="my-6" />}
        <Submission assignment={assignmentData} />
      </div>
    </div>
  );
}
