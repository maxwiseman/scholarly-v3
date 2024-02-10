import { IconDots } from "@tabler/icons-react";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { type AspenCategories } from "@/server/api/routers/aspen/get-categories";

export function GradeTable({
  assignmentData,
  categoryData,
  loading = false,
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
  categoryData: AspenCategories;
  loading?: boolean;
}): React.ReactElement {
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
      header: "Score",
      accessorKey: "points",
      id: "Score",
      cell: (data) => {
        if (typeof data.getValue() !== "number") return data.getValue();
        if (data.getValue() === null || data.getValue() === 0)
          return `${data.getValue() as number} pts`;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- you're confused, typescript
        return `${(((data.getValue() as number) / (data.row.getValue("Points Possible") as number)) * 100).toFixed(0)}% (${data.getValue() as number} pts)`;
      },
    },
    {
      header: "Feedback",
      accessorKey: "feedback",
      id: "Feedback",
    },
    {
      id: "actions",

      cell: (cellData) => {
        return ActionsPopover(cellData, columns, categoryData, loading);
      },
    },
  ];
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
      loading={loading}
      searchKey="Name"
    />
  );
}

// ! =======================================

function ActionsPopover(
  cellData: CellContext<
    {
      name: string | null;
      pointsPossible: number | null;
      points: string | number | null;
      extraCredit: boolean | null;
      feedback: string | null;
      dateAssigned: string | Date | null;
      dateDue: string | Date | null;
    },
    unknown
  >,
  columns: ColumnDef<{
    name: string | null;
    pointsPossible: number | null;
    points: string | number | null;
    extraCredit: boolean | null;
    feedback: string | null;
    dateAssigned: Date | string | null;
    dateDue: Date | string | null;
  }>[],
  categoryData: AspenCategories,
  loading = false,
): React.ReactElement {
  return (
    <Popover>
      <PopoverTrigger disabled={loading}>
        <Button
          icon={<IconDots />}
          loading={loading}
          size="icon"
          variant="ghost"
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit row</h4>
            {/* <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p> */}
          </div>
          <div className="grid gap-2">
            {columns.map((column) => {
              if (typeof column.header !== "string") return null;
              if (column.id === "Category")
                return (
                  <div
                    className="grid grid-cols-3 items-center gap-4"
                    key={JSON.stringify(column)}
                  >
                    <Label htmlFor={column.header.toString()}>
                      {column.header.toString()}
                    </Label>
                    <Select
                      defaultValue={
                        (cellData.getValue() as string | undefined) || ""
                      }
                    >
                      <SelectTrigger
                        className="col-span-2 h-8"
                        id={column.header.toString()}
                      >
                        <SelectValue placeholder="Pick something..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryData.categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              if (column.id === "Extra Credit")
                return (
                  <div
                    className="grid grid-cols-3 items-center gap-4"
                    key={JSON.stringify(column)}
                  >
                    <Label htmlFor={column.header.toString()}>
                      {column.header.toString()}
                    </Label>
                    <Select
                      defaultValue={
                        (cellData.getValue() as string | undefined) || "No"
                      }
                    >
                      <SelectTrigger
                        className="col-span-2 h-8"
                        id={column.header.toString()}
                      >
                        <SelectValue placeholder="Pick something..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              return (
                <div
                  className="grid grid-cols-3 items-center gap-4"
                  key={JSON.stringify(column)}
                >
                  <Label htmlFor={column.header.toString()}>
                    {column.header.toString()}
                  </Label>
                  <Input
                    className="col-span-2 h-8"
                    defaultValue={cellData.row.getValue(column.id || "")}
                    id={column.header.toString()}
                    type={
                      column.id === "Score" || column.id === "Points Possible"
                        ? "number"
                        : "text"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
