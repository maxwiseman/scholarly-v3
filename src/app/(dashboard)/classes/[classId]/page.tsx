"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { api } from "@/trpc/react";

export default function Page({
  params,
}: {
  params: { classId: string };
}): React.ReactElement {
  const categoryFetcher = api.aspen.getCategories.useQuery({
    id: params.classId,
  });

  if (!categoryFetcher.isFetched) {
    return <main className="text-muted-foreground">Loading...</main>;
  }

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
          {categoryFetcher.data?.categories.map((category) => {
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
            <TableCell>{categoryFetcher.data?.average}%</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
