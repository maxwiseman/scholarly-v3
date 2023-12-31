"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { api } from "@/trpc/react";

export default function Page({
  params,
}: {
  params: { classId: string };
}): React.ReactElement {
  const assignmentData = api.aspen.getAssignments.useQuery(
    {
      id: params.classId,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
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
            {assignmentData.data?.map((assignment) => {
              if (assignment.score === "M" || assignment.score === 0) {
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
            {assignmentData.data?.map((assignment) => {
              if (new Date(assignment.dateDue) > new Date()) {
                return <li key={assignment.name}>{assignment.name}</li>;
              }
              return null;
            })}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
