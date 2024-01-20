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
          {categoryData.data?.categories.map((category) => {
            return (
              <TableRow key={category.name}>
                <TableCell>{category.name}</TableCell>
                <TableCell>${category.weight * 100}%</TableCell>
                <TableCell>
                  {category.value ? `${category.value}%` : ""}
                </TableCell>
              </TableRow>
            );
          }) ||
            classData.data
              ?.filter((singleClass) => {
                return singleClass.id === params.classId;
              })[0]
              ?.gradeCategories?.map((category) => {
                return (
                  <TableRow key={category.name}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.weight * 100}%</TableCell>
                    <TableCell>
                      {category.value ? `${category.value}%` : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Gradebook Average</TableCell>
            <TableCell>
              {categoryData.data?.average ||
                classData.data?.filter((singleClass) => {
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
