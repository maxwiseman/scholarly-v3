"use client";

import { api } from "@/trpc/react";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { DataTable } from "./data-table";
import { type ColumnDef } from "@tanstack/react-table";

export default function Home() {
  const classData = api.aspen.getClasses.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const assignmentData = api.aspen.getAssignments.useQuery(
    {
      id: "SSC00000Q9Vncm",
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
      header: "Points Possible",
      accessorKey: "pointsPossible",
      id: "Points Possible",
    },
  ];

  return (
    <>
      <main className="p-6">
        {classData.data && classData.isFetched && (
          <DataTable
            searchKey="Name"
            data={assignmentData.data ?? []}
            columns={columns}
          />
        )}
        {!classData.isFetched && (
          <p className="text-muted-foreground">Loading...</p>
        )}
      </main>
    </>
  );
}
