import React from "react";
import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/_components/ui/resizable";

export default function Page(): React.ReactElement {
  return (
    <ResizablePanelGroup
      className="h-full max-h-min w-full max-w-full overflow-visible"
      direction="horizontal"
      style={{ overflow: "shown" }}
    >
      <ResizablePanel className="flex h-max justify-center" defaultSize={100}>
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-center justify-between">
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-9 w-96" />
              <div>
                Points Possible:{" "}
                <Skeleton className="inline-block h-[1.125rem] w-4" />
              </div>
              <div>
                Date Due:{" "}
                <Skeleton className="inline-block h-[1.125rem] w-28" />
              </div>
            </div>
            <Separator className="my-6" />
          </div>
        </div>
      </ResizablePanel>
      <div className="relative h-full">
        <ResizableHandle
          className="sticky top-[5.5rem] z-10 ml-8 h-[calc(100vh-7.5rem)] rounded-full"
          withHandle
        />
      </div>
      <ResizablePanel className="flex h-max justify-center" defaultSize={0} />
    </ResizablePanelGroup>
  );
}
