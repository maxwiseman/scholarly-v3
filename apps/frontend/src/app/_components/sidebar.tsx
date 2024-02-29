"use client";

import { usePathname } from "next/navigation";
import { type HTMLProps } from "react";
import { LinkButton } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function Sidebar({
  items,
  className,
  ...props
}: {
  items: {
    name: string;
    href: string;
    matchHref?: string;
    matchMethod?: "equal" | "startsWith";
  }[];
} & HTMLProps<HTMLDivElement>): React.ReactNode {
  const pathName = usePathname();

  return (
    <div className={cn("sticky top-[3.5rem] w-full", className)} {...props}>
      <ScrollArea className="flex max-h-[calc(100vh-3.5rem)] flex-col gap-2">
        <div className="flex flex-col gap-2 py-8">
          {items.map((item) => {
            const checkHref = item.matchHref || item.href;
            return (
              <LinkButton
                className="justify-start"
                href={item.href}
                key={item.name}
                variant={
                  // eslint-disable-next-line no-nested-ternary -- this is fine
                  item.matchMethod === "equal"
                    ? pathName === checkHref
                      ? "secondary"
                      : "ghost"
                    : pathName.startsWith(checkHref)
                      ? "secondary"
                      : "ghost"
                }
              >
                {item.name}
              </LinkButton>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
