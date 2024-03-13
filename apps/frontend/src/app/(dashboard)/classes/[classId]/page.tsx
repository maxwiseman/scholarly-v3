"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { queryOpts } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Spinner } from "@/app/_components/ui/spinner";

export default function Page({
  params,
}: {
  params: { classId: string };
}): React.ReactElement {
  const assignmentData = api.user.getAssignments.useQuery(
    {
      id: params.classId,
    },
    queryOpts,
  );

  const assignmentAspenData = api.aspen.getAssignments.useQuery(
    { id: params.classId },
    queryOpts,
  );

  const assignmentCanvasData = api.canvas.getAssignments.useQuery(
    { classId: params.classId, bucket: "upcoming" },
    queryOpts,
  );

  const frontPageData = api.canvas.getFrontPage.useQuery(
    { classId: params.classId },
    queryOpts,
  );

  return (
    <main className="flex flex-col items-center gap-8">
      <div className="grid w-full gap-8 lg:grid-cols-2">
        <Card className="h-48">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              Missing Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!assignmentData.isFetched && !assignmentAspenData.isFetched ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Spinner /> Loading...
              </div>
            ) : null}
            <ul className="[&>li]:mt-2">
              {assignmentAspenData.data?.map((assignment) => {
                if (
                  (!assignment.extraCredit &&
                    assignment.points === "Missing") ||
                  assignment.points === 0
                ) {
                  return <li key={assignment.name}>{assignment.name}</li>;
                }
                return null;
              }) ||
                assignmentData.data?.map((assignment) => {
                  if (
                    (!assignment.extraCredit && assignment.points === "M") ||
                    assignment.points === 0
                  ) {
                    return <li key={assignment.name}>{assignment.name}</li>;
                  }
                  return null;
                })}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Todo List</CardTitle>
          </CardHeader>
          <CardContent>
            {!assignmentCanvasData.isFetched ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Spinner /> Loading...
              </div>
            ) : null}
            <ul className="[&>li]:mt-2">
              {assignmentCanvasData.data?.map((assignment) => {
                return (
                  <li key={assignment.id}>
                    <Link
                      className="underline"
                      href={`/classes/${params.classId}/assignments/${assignment.id}`}
                    >
                      {assignment.due_at
                        ? `${new Date(assignment.due_at).toLocaleDateString()} - `
                        : ""}{" "}
                      {assignment.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div
        className="typography max-w-6xl"
        dangerouslySetInnerHTML={{
          __html:
            typeof frontPageData.data?.body === "string"
              ? frontPageData.data.body.replaceAll(
                  /href="https:\/\/knoxschools\.instructure\.com\/courses\/[^/]*/g,
                  `href="/classes/${params.classId}`,
                )
              : "",
        }}
      />
    </main>
  );
}
