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
import { cn } from "@/lib/utils";

export function CategoryTable({
  categoryData,
  assignmentData,
  canLog,
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
  canLog?: boolean;
}): React.ReactElement {
  const log = useLogger();
  const calculatedCategories = calculateCategories([...assignmentData], {
    ...categoryData,
  });

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
        {calculatedCategories.categories.map((category) => {
          return (
            <TableRow
              className={cn({
                "bg-yellow-500/25 hover:bg-yellow-500/30": !category.accurate,
              })}
              key={category.name}
            >
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.weight * 100}%</TableCell>
              <TableCell>
                {category.value
                  ? `${category.value.toFixed(2).replace(/\.0+$/, "")}%`
                  : ""}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow
          className={cn({
            "bg-yellow-500/25 hover:bg-yellow-500/30":
              !calculatedCategories.accurate,
          })}
        >
          <TableCell colSpan={2}>Gradebook Average</TableCell>
          <TableCell>{calculatedCategories.average.toFixed(2)}%</TableCell>
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
  ): AspenCategories & { accurate?: boolean } {
    // Duplicate the categories object so that we don't modify the original, and add some extra keys for later
    const internalCategoryData: {
      name: string;
      pointsPossible?: number;
      points?: number;
      weight: number;
      value: number | null;
      accurate?: boolean;
    }[] = [...categories.categories.map((c) => ({ ...c }))];

    // For each category, check what assignments are in that category and add up the points and pointsPossible
    internalCategoryData.forEach((category) => {
      assignments.forEach((singleAssignmentData) => {
        const assignment = { ...singleAssignmentData };
        if (
          typeof assignment.points === "string" &&
          assignment.points.toLowerCase() === "missing"
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
      if (
        category.value.toFixed(2) ===
          categories.categories
            .filter((c) => c.name === category.name)[0]
            ?.value?.toFixed(2) ||
        (isNaN(category.value) &&
          categories.categories.filter((c) => c.name === category.name)[0]
            ?.value === null)
      ) {
        category.accurate = true;
      } else {
        category.accurate = false;
        console.warn(
          "Inaccurate calcuation:",
          `Calculated: ${category.value},`,
          `Actual: ${
            categories.categories.filter((c) => c.name === category.name)[0]
              ?.value
          }`,
        );
      }
    });

    // Calculate the class average, while excluding categories that have no value
    const totalCategoryWeights = internalCategoryData.reduce(
      (acc, obj) =>
        acc + (obj.value !== null && !isNaN(obj.value) ? obj.weight : 0),
      0,
    );
    const average = internalCategoryData.reduce(
      (acc, obj) =>
        acc +
        (obj.value !== null && !isNaN(obj.value) ? obj.value : 0) *
          (obj.weight / totalCategoryWeights),
      0,
    );

    if (average.toFixed(2) !== categories.average.toFixed(2)) {
      // toast.error("Something went wrong while calculating your average!", {
      //   duration: 10000,
      // });
      if (canLog) log.warn("Something went wrong while calculating averages!");
    }

    return {
      average,
      categories: internalCategoryData,
      accurate: average.toFixed(2) === categories.average.toFixed(2),
    };
  }
}
