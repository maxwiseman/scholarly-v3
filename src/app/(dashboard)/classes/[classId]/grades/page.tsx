"use client";

import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../../_components/ui/data-table";

export default function Home({ params }: { params: { classId: string } }) {
  const classData = api.aspen.getClasses.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
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
    pointsPossible: string | undefined;
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
    },
    {
      header: "Date Due",
      accessorKey: "dateDue",
      id: "Date Due",
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
    <>
      <main className="min-h-[200vh]">
        {classData.data && classData.isFetched && (
          <DataTable
            searchKey="Name"
            data={assignmentData.data ?? []}
            columns={columns}
            defaultVisibility={{
              "Date Assigned": false,
              "Date Due": false,
              "Extra Credit": false,
            }}
          />
        )}
        {!classData.isFetched && (
          <p className="text-muted-foreground">Loading...</p>
        )}
      </main>
    </>
  );
}
