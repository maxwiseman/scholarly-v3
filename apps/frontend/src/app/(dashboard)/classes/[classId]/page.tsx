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

  if (!assignmentData.isFetched) {
    return <main className="text-muted-foreground">Loading...</main>;
  }

  return (
    <main className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">
            Missing Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {assignmentAspenData.data?.map((assignment) => {
              if (
                (!assignment.extraCredit && assignment.points === "M") ||
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
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {assignmentCanvasData.data?.map((assignment) => {
              return (
                <li key={assignment.id}>
                  <Link
                    className="underline"
                    href={`/classes/${params.classId}/assignments/${assignment.id}`}
                  >
                    {assignment.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
