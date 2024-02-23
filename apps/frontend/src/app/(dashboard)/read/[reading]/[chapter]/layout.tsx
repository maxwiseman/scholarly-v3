"use client";

import { Sidebar } from "./sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/_components/ui/resizable";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { reading: string; chapter: string };
}): React.ReactElement {
  return (
    <ResizablePanelGroup
      className="relative h-min max-h-min w-full max-w-full overflow-auto px-8"
      direction="horizontal"
      style={{ overflow: "unset" }}
    >
      <ResizablePanel
        defaultSize={15}
        minSize={10}
        style={{ overflow: "unset" }}
      >
        <Sidebar params={params} />
      </ResizablePanel>
      <ResizableHandle
        className="sticky top-[3.5rem] mx-8 h-[calc(100vh-3.5rem)]"
        withHandle
      />
      {children}
    </ResizablePanelGroup>
  );
}
