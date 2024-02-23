"use client";

import { usePathname } from "next/navigation";
import { LinkButton } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { api } from "@/trpc/react";
import { queryOpts } from "@/lib/utils";

export function Sidebar({
  params,
}: {
  params: { chapter: string; reading: string };
}): React.ReactNode {
  const pathName = usePathname();
  const readData = api.user.getRead.useQuery(
    { slug: params.reading },
    queryOpts,
  );

  return (
    <div className="sticky top-[3.5rem] w-full">
      <ScrollArea className="flex max-h-[calc(100vh-3.5rem)] flex-col gap-2">
        <div className="flex flex-col gap-2 py-8">
          {readData.data?.chapters.map((chapter) => {
            return (
              <LinkButton
                className="justify-start"
                href={`/read/${readData.data?.slug}/${chapter.slug}`}
                key={chapter.name}
                variant={
                  pathName === `/read/${readData.data?.slug}/${chapter.slug}`
                    ? "secondary"
                    : "ghost"
                }
              >
                {chapter.name}
              </LinkButton>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
