import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { api } from "@/trpc/server";

export default async function Page({
  params,
}: {
  params: { classId: string };
}): Promise<React.ReactElement> {
  const categories = await api.aspen.getCategories.query({
    id: params.classId,
  });

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
          {categories.categories.map((category) => {
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
            <TableCell>{categories.average}%</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
