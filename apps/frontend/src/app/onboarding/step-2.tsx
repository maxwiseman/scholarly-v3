"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "../_components/ui/button";
import { Card } from "../_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { Separator } from "../_components/ui/separator";
import { Spinner } from "../_components/ui/spinner";
import { api } from "@/trpc/react";
import { queryOpts } from "@/lib/utils";

export function StepTwo({
  onSubmit,
}: {
  onSubmit?: () => void;
}): React.ReactElement {
  const canvasData = api.canvas.getClasses.useQuery(undefined, queryOpts);
  const aspenData = api.aspen.getClasses.useQuery(undefined, queryOpts);

  const [classData, setClassData] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const addClasses = api.user.addClasses.useMutation();

  useEffect(() => {
    const mockData = { ...classData };
    canvasData.data?.forEach((canvasCourse) => {
      mockData[canvasCourse.id] =
        aspenData.data?.filter((aspenCourse) => {
          if (
            aspenCourse.name
              .toUpperCase()
              .includes(canvasCourse.shortName.toUpperCase()) ||
            canvasCourse.shortName
              .toUpperCase()
              .includes(aspenCourse.name.toUpperCase() || "")
          )
            return true;
          return false;
        })[0]?.id || "";
    });
    if (canvasData.isFetched && aspenData.isFetched) setClassData(mockData);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This would cause an infinite loop
  }, [canvasData.data, aspenData.data]);

  useEffect(() => {
    if (Object.values(classData).every((value) => value !== ""))
      setIsValid(true);
    else setIsValid(false);
  }, [classData]);

  if (
    canvasData.data &&
    aspenData.data &&
    canvasData.isFetched &&
    aspenData.isFetched &&
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- For some this is needed
    canvasData.data.map
  )
    return (
      <div className="flex w-full max-w-3xl flex-col items-center">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
          Time to link your classes
        </h1>
        <Separator className="my-8 mt-4" />
        <div className="w-full space-y-4">
          {canvasData.data.map((canvasCourse) => {
            return (
              <Card
                className={`flex w-full items-center justify-between gap-4 p-4 transition-colors ${
                  classData[canvasCourse.id] === "" ? "!border-primary/25" : ""
                }`}
                key={canvasCourse.id}
              >
                <span className="line-clamp-1 block w-full text-muted-foreground">
                  {canvasCourse.shortName}
                </span>
                <IconArrowRight className="h-7 min-h-[1.75rem] w-7 min-w-[1.75rem]" />
                <Select
                  defaultValue={
                    aspenData.data.filter((aspenCourse) => {
                      if (
                        aspenCourse.name
                          .toUpperCase()
                          .includes(canvasCourse.shortName.toUpperCase()) ||
                        canvasCourse.shortName
                          .toUpperCase()
                          .includes(aspenCourse.name.toUpperCase() || "")
                      )
                        return true;
                      return false;
                    })[0]?.id || ""
                  }
                  onValueChange={(value) => {
                    const mockData = { ...classData };
                    mockData[canvasCourse.id] = value;
                    if (mockData !== classData) setClassData(mockData);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {aspenData.data.map((aspenCourse) => {
                      return (
                        <SelectItem
                          key={aspenCourse.id}
                          value={aspenCourse.id || ""}
                        >
                          {aspenCourse.name}
                        </SelectItem>
                      );
                    })}
                    <SelectSeparator />
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            );
          })}
          <Button
            className="!mt-6 w-full"
            disabled={!isValid}
            onClick={() => {
              addClasses.mutate(
                canvasData.data.map((canvasCourse) => {
                  const aspenCourse = aspenData.data.filter(
                    (value) => value.id === classData[canvasCourse.id],
                  )[0];
                  return {
                    id: uuid(),
                    name: canvasCourse.shortName,
                    teachers: aspenCourse?.teachers || [],
                    gradeAverage: aspenCourse?.termGrade || 100,
                    gradeCategories: [],
                    aspenId: aspenCourse?.id || "",
                    canvasId: canvasCourse.id.toString(),
                    term: aspenCourse?.term || "",
                    schedule: aspenCourse?.schedule || "",
                    teacherEmail: aspenCourse?.teacherEmail || "",
                  };
                }),
              );
              if (onSubmit) onSubmit();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    );
  return (
    <div className="flex w-full max-w-3xl flex-col items-center p-8">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
        Time to link your classes
      </h1>
      <Separator className="my-8 mt-4" />
      <div className="flex flex-row items-center justify-center gap-2 text-muted-foreground">
        <Spinner /> Loading...
      </div>
    </div>
  );
}
