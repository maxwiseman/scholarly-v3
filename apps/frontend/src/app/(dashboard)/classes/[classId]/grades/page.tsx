"use client";

import { GradeTable } from "./grade-table";
import { CategoryTable } from "./categories-table";
import { api } from "@/trpc/react";
import { Separator } from "@/app/_components/ui/separator";
import { queryOpts } from "@/lib/utils";
import { type AspenCategories } from "@/server/api/routers/aspen/get-categories";

export default function Home({
  params,
}: {
  params: { classId: string };
}): React.ReactElement {
  const classData = api.user.getClasses.useQuery(undefined, queryOpts);
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
  const categoryData = api.aspen.getCategories.useQuery(
    { id: params.classId },
    queryOpts,
  );
  const thisClass = classData.data?.filter(
    (course) => course.id === params.classId,
  )[0];

  return (
    <main>
      {categoryData.data || classData.isFetched ? (
        <CategoryTable
          assignmentData={assignmentAspenData.data || assignmentData.data || []}
          categoryData={
            categoryData.isFetched && categoryData.data
              ? categoryData.data
              : ({
                  average: thisClass?.gradeAverage,
                  categories: thisClass?.gradeCategories,
                } as AspenCategories)
          }
        />
      ) : null}
      <Separator className="my-8" />

      {classData.data && classData.isFetched ? (
        <GradeTable
          assignmentData={assignmentAspenData.data || assignmentData.data || []}
        />
      ) : null}
      {!classData.isFetched && (
        <p className="text-muted-foreground">Loading...</p>
      )}
    </main>
  );
}
