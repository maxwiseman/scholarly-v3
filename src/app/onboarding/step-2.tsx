"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "../_components/ui/button";
import { Card } from "../_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { Separator } from "../_components/ui/separator";
import { api } from "@/trpc/react";

export function StepTwo({
  onSubmit,
}: {
  onSubmit?: () => void;
}): React.ReactElement {
  const canvasData = api.canvas.getClasses.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const aspenData = api.aspen.getClasses.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (canvasData.data && aspenData.data)
    return (
      <div className="flex w-full max-w-3xl flex-col items-center p-8">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
          Time to link your classes
        </h1>
        <Separator className="my-8 mt-4" />
        <div className="w-full space-y-4">
          {canvasData.data.map((canvasCourse) => {
            return (
              <Card
                className="flex w-full items-center justify-between gap-4 p-4"
                key={canvasCourse.id}
              >
                <span className="line-clamp-1 block w-full text-muted-foreground">
                  {canvasCourse.name}
                </span>
                <IconArrowRight className="h-7 min-h-[1.75rem] w-7 min-w-[1.75rem]" />
                <Select
                  defaultValue={
                    aspenData.data.filter((aspenCourse) => {
                      if (
                        aspenCourse.name
                          .toUpperCase()
                          .includes(canvasCourse.name.toUpperCase()) ||
                        canvasCourse.name
                          .toUpperCase()
                          .includes(aspenCourse.name.toUpperCase())
                      )
                        return true;
                      return false;
                    })[0]?.id || ""
                  }
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
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            );
          })}
          <Button
            className="w-full"
            onClick={() => {
              if (onSubmit) onSubmit();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    );
  return <>Loading...</>;
}
