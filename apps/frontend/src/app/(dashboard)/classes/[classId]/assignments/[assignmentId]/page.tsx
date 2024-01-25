import React from "react";
import { Actions, Submission } from "./client";
import { Chat } from "./chat";
import { api } from "@/trpc/server";
import { Separator } from "@/app/_components/ui/separator";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/_components/ui/resizable";

export default async function Page({
  params,
}: {
  params: { classId: string; assignmentId: string };
}): Promise<React.ReactElement> {
  const assignmentData = await api.canvas.getAssignment.query(params);

  return (
    <ResizablePanelGroup
      className="h-min max-h-min w-full max-w-full overflow-visible"
      direction="horizontal"
      style={{ overflow: "shown" }}
    >
      <ResizablePanel
        className="flex h-max justify-center"
        collapsible
        minSize={25}
      >
        <div className="w-full min-w-0 max-w-4xl">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="mt-0 text-3xl font-bold">{assignmentData.name}</h1>
              <div>Points Possible: {assignmentData.points_possible}</div>
              <div>
                Date Due:{" "}
                {assignmentData.due_at !== null
                  ? new Date(assignmentData.due_at || 0).toLocaleDateString(
                      "en-us",
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : "No due date"}
              </div>
            </div>
            <Actions assignment={assignmentData} />
          </div>
          <Separator className="my-6" />
          <div
            className="typography break-words"
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
          <Submission assignment={assignmentData} classId={params.classId} />
        </div>
      </ResizablePanel>
      <Chat assignment={assignmentData} />
    </ResizablePanelGroup>
  );
}
