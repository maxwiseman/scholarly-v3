"use client";

import { usePathname } from "next/navigation";
import { LinkButton } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

export function Sidebar(): React.ReactNode {
  const pathName = usePathname();

  return (
    <div className="sticky top-[3.5rem] w-[15vw] min-w-[12rem] max-w-xs">
      <ScrollArea className="flex max-h-[calc(100vh-3.5rem)] flex-col gap-2">
        <div className="flex flex-col gap-2 py-8">
          {Array(43)
            .fill(" ")
            .map((_, i) => {
              if (i <= 0) return null;
              return (
                <LinkButton
                  className="justify-start"
                  href={`/read/apush/ch_${i}`}
                  // eslint-disable-next-line react/no-array-index-key -- There's really no better key for this
                  key={i}
                  variant={
                    pathName === `/read/apush/ch_${i}` ? "secondary" : "ghost"
                  }
                >
                  Chapter {i}
                </LinkButton>
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
}
