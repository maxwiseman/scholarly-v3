"use client";

import { useLogger } from "next-axiom";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { type AspenCategories } from "@/server/api/routers/aspen/get-categories";

export function CategoryTable({
  categoryData,
  assignmentData,
}: {
  categoryData: AspenCategories;
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
  const log = useLogger();

  return (
    <Table className="overflow-hidden rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Average</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calculateCategories(assignmentData, categoryData).categories.map(
          (category) => {
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
          },
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Gradebook Average</TableCell>
          <TableCell>
            {calculateCategories(assignmentData, categoryData).average.toFixed(
              2,
            )}
            %
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );

  function calculateCategories(
    assignments: {
      pointsPossible: number | null;
      points: number | string | null;
      category: string | null;
      extraCredit: boolean | null;
    }[],
    categories: AspenCategories,
  ): AspenCategories {
    // Duplicate the categories object so that we don't modify the original, and add some extra keys for later
    const internalCategoryData: {
      name: string;
      pointsPossible?: number;
      points?: number;
      weight: number;
      value: number;
    }[] = [...categories.categories];

    // For each category, check what assignments are in that category and add up the points and pointsPossible
    internalCategoryData.forEach((category) => {
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
    const totalCategoryWeights = internalCategoryData.reduce(
      (acc, obj) => acc + (!isNaN(obj.value) ? obj.weight : 0),
      0,
    );
    const average = internalCategoryData.reduce(
      (acc, obj) =>
        acc +
        (!isNaN(obj.value) ? obj.value : 0) *
          (obj.weight / totalCategoryWeights),
      0,
    );

    if (average.toFixed(2) !== categories.average.toFixed(2)) {
      // toast.error("Something went wrong while calculating your average!", {
      //   duration: 10000,
      // });
      log.error("Something went wrong while calculating averages!");
    }

    return { average, categories: internalCategoryData };
  }
}
