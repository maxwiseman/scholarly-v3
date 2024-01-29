import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/_components/ui/data-table";

export function GradeTable({
  assignmentData,
}: {
  assignmentData: {
    name: string | null;
    category: string | null;
    pointsPossible: number | null;
    points: string | number | null;
    extraCredit: boolean | null;
    feedback: string | null;
    dateAssigned: Date | string | null;
    dateDue: Date | string | null;
  }[];
}): React.ReactElement {
  return (
    <DataTable
      columns={columns}
      data={assignmentData.sort((a, b): number => {
        if (a.dateDue && b.dateDue && a.dateDue < b.dateDue) return 1;
        if (a.dateDue && b.dateDue && a.dateDue > b.dateDue) return -1;
        return 0;
      })}
      defaultVisibility={{
        "Date Assigned": false,
        "Date Due": false,
        "Extra Credit": false,
      }}
      searchKey="Name"
    />
  );
}

const columns: ColumnDef<{
  name: string | null;
  pointsPossible: number | null;
  points: string | number | null;
  extraCredit: boolean | null;
  feedback: string | null;
  dateAssigned: Date | string | null;
  dateDue: Date | string | null;
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
    accessorFn: (data: {
      name: string | null;
      pointsPossible: number | null;
      points: string | number | null;
      extraCredit: boolean | null;
      feedback: string | null;
      dateAssigned: Date | string | null;
      dateDue: Date | string | null;
    }) => {
      if (data.dateAssigned === null) return "";
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
    accessorFn: (data: {
      name: string | null;
      pointsPossible: number | null;
      points: string | number | null;
      extraCredit: boolean | null;
      feedback: string | null;
      dateAssigned: Date | string | null;
      dateDue: Date | string | null;
    }) => {
      if (data.dateDue === null) return "";
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
    accessorFn: (data: {
      name: string | null;
      pointsPossible: number | null;
      points: string | number | null;
      extraCredit: boolean | null;
      feedback: string | null;
      dateDue: Date | string | null;
    }) => {
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
