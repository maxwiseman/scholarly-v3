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

export default function Home({
  params,
}: {
  params: { classId: string };
}): React.ReactElement {
  const classData = api.aspen.getClasses.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const categoryData = api.aspen.getCategories.useQuery(
    { id: params.classId },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );
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

  const columns: ColumnDef<{
    name: string | undefined;
    category: string | undefined;
    pointsPossible: number;
    dateAssigned: number;
    dateDue: number;
    extraCredit: boolean;
    score: string | number;
    feedback: string | undefined;
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
        return new Date(data.dateAssigned).toLocaleDateString("en-us", {
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
        return new Date(data.dateDue).toLocaleDateString("en-us", {
          day: "numeric",
          month: "short",
        });
      },
    },
    {
      header: "Extra Credit",
      accessorKey: "extraCredit",
      id: "Extra Credit",
    },
    {
      header: "Points Possible",
      accessorKey: "pointsPossible",
      id: "Points Possible",
    },
    {
      header: "Points",
      accessorKey: "score",
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
                <TableCell>{category.weight * 100}%</TableCell>
                <TableCell>
                  {isNaN(category.value) ? "" : `${category.value}%`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Gradebook Average</TableCell>
            <TableCell>{categoryData.data?.average}%</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Separator className="my-8" />

      {classData.data && classData.isFetched ? (
        <DataTable
          columns={columns}
          data={assignmentData.data ?? []}
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
