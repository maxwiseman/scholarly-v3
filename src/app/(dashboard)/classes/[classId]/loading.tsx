import { IconLoader } from "@tabler/icons-react";
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

export default function Loading(): React.ReactElement {
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
        <div className="col-span-3 flex w-full items-center justify-center py-10">
          <IconLoader className="animate-spin text-muted-foreground" />
        </div>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Gradebook Average</TableCell>
            <TableCell>Loading...</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
