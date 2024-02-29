"use client";

import { Sidebar } from "@/app/_components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/_components/ui/resizable";
import { queryOpts } from "@/lib/utils";
import { api } from "@/trpc/react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { reading: string; chapter: string };
}): React.ReactElement {
  const readData = api.user.getRead.useQuery(
    { slug: params.reading },
    queryOpts,
  );

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
        {/* <Sidebar params={params} /> */}
        <Sidebar
          items={
            readData.data?.chapters.map((chapter) => {
              return {
                name: chapter.name,
                href: `/read/${readData.data?.slug}/${chapter.slug}`,
                matchMethod: "equal",
              };
            }) || []
          }
        />
      </ResizablePanel>
      <ResizableHandle
        className="sticky top-[3.5rem] mx-8 h-[calc(100vh-3.5rem)]"
        withHandle
      />
      {children}
    </ResizablePanelGroup>
  );
}
