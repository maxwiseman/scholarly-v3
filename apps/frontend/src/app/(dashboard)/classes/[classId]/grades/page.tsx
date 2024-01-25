"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../../_components/ui/data-table";
import { api } from "@/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Separator } from "@/app/_components/ui/separator";
import { queryOpts } from "@/lib/utils";
import { type AspenCategories } from "@/server/api/routers/aspen/get-categories";

export default function Home({
  params,
}: {
  params: { classId: string };
}): React.ReactElement {
  const classData = api.user.getClasses.useQuery(undefined, queryOpts);
  // const categoryData = api.aspen.getCategories.useQuery(
  //   { id: params.classId },
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //   },
  // );
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

  const columns: ColumnDef<{
    name: string | null;
    pointsPossible: number | null;
    points: string | number | null;
    extraCredit: boolean | null;
    feedback: string | null;
    dateAssigned: Date | null;
    dateDue: Date | null;
  }>[] = [
    {
      header: "Name",
      accessorKey: "name",
      id: "Name",
    },
    {
      header: "Category",
      accessorKey: "category",
      id: "Category",
    },
    {
      header: "Date Assigned",
      accessorKey: "dateAssigned",
      id: "Date Assigned",
      accessorFn: (data) => {
        return data.dateAssigned?.toLocaleDateString("en-us", {
          day: "numeric",
          month: "short",
        });
      },
    },
    {
      header: "Date Due",
      accessorKey: "dateDue",
      id: "Date Due",
      accessorFn: (data) => {
        return data.dateDue?.toLocaleDateString("en-us", {
          day: "numeric",
          month: "short",
        });
      },
    },
    {
      header: "Extra Credit",
      accessorKey: "extraCredit",
      id: "Extra Credit",
      accessorFn: (data) => {
        return data.extraCredit ? "Yes" : "No";
      },
    },
    {
      header: "Points Possible",
      accessorKey: "pointsPossible",
      id: "Points Possible",
    },
    {
      header: "Points",
      accessorKey: "points",
      id: "Points",
    },
    {
      header: "Feedback",
      accessorKey: "feedback",
      id: "Feedback",
    },
  ];

  return (
    <main>
      <Table className="overflow-hidden rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Average</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignmentData.data && categoryData.data
            ? calculateCategories(
                assignmentAspenData.data || assignmentData.data,
                categoryData.data,
              ).categories.map((category) => {
                return (
                  <TableRow key={category.name}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.weight * 100}%</TableCell>
                    <TableCell>
                      {category.value
                        ? `${category.value.toFixed(2).replace(/\.0+$/, "")}%`
                        : ""}
                    </TableCell>
                  </TableRow>
                );
              })
            : classData.data
                ?.filter((singleClass) => {
                  return singleClass.id === params.classId;
                })[0]
                ?.gradeCategories?.map((category) => {
                  return (
                    <TableRow key={category.name}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.weight * 100}%</TableCell>
                      <TableCell>
                        {category.value
                          ? `${category.value.toFixed(2).replace(/\.0+$/, "")}%`
                          : ""}
                      </TableCell>
                    </TableRow>
                  );
                })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Gradebook Average</TableCell>
            <TableCell>
              {assignmentData.data && categoryData.data
                ? calculateCategories(
                    assignmentAspenData.data || assignmentData.data,
                    categoryData.data,
                  ).average.toFixed(2)
                : classData.data?.filter((singleClass) => {
                    return singleClass.id === params.classId;
                  })[0]?.gradeAverage}
              %
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Separator className="my-8" />

      {classData.data && classData.isFetched ? (
        <DataTable
          columns={columns}
          data={assignmentAspenData.data || assignmentData.data || []}
          defaultVisibility={{
            "Date Assigned": false,
            "Date Due": false,
            "Extra Credit": false,
          }}
          searchKey="Name"
        />
      ) : null}
      {!classData.isFetched && (
        <p className="text-muted-foreground">Loading...</p>
      )}
    </main>
  );
}

export function calculateCategories(
  assignments: {
    pointsPossible: number | null;
    points: number | string | null;
    category: string | null;
    extraCredit: boolean | null;
  }[],
  categories: AspenCategories,
): AspenCategories {
  // Duplicate the categories object so that we don't modify the original, and add some extra keys for later
  const categoryData: {
    name: string;
    pointsPossible?: number;
    points?: number;
    weight: number;
    value: number;
  }[] = [...categories.categories];

  // For each category, check what assignments are in that category and add up the points and pointsPossible
  categoryData.forEach((category) => {
    assignments.forEach((assignment) => {
      if (
        typeof assignment.points === "string" &&
        assignment.points.toUpperCase() === "M"
      )
        assignment.points = 0;
      if (assignment.category === category.name) {
        if (
          !assignment.extraCredit &&
          typeof assignment.points === "number" &&
          assignment.pointsPossible !== null
        ) {
          if (category.pointsPossible)
            category.pointsPossible += assignment.pointsPossible;
          else category.pointsPossible = assignment.pointsPossible;
        }
        if (typeof assignment.points === "number") {
          if (category.points) category.points += assignment.points;
          else category.points = assignment.points;
        }
      }
    });
    if (category.pointsPossible && category.points)
      category.value = (category.points / category.pointsPossible) * 100;
    else category.value = NaN;
  });

  // Calculate the class average, while excluding categories that have no value
  const totalCategoryWeights = categoryData.reduce(
    (acc, obj) => acc + (!isNaN(obj.value) ? obj.weight : 0),
    0,
  );
  const average = categoryData.reduce(
    (acc, obj) =>
      acc +
      (!isNaN(obj.value) ? obj.value : 0) * (obj.weight / totalCategoryWeights),
    0,
  );

  return { average, categories: categoryData };
}
