"use client";

import { usePathname } from "next/navigation";
import { LinkButton } from "@/app/_components/ui/button";

export function Sidebar(): React.ReactNode {
  const pathName = usePathname();

  return (
    <div className="sticky top-[5.5rem] flex w-[15vw] min-w-[12rem] max-w-xs flex-col gap-2">
      <LinkButton
        className="justify-start"
        href="/read/apush/ch_1"
        variant={pathName === `/read/apush/ch_1` ? "secondary" : "ghost"}
      >
        Chapter 1
      </LinkButton>
      <LinkButton
        className="justify-start"
        href="/read/apush/ch_2"
        variant={pathName === `/read/apush/ch_2` ? "secondary" : "ghost"}
      >
        Chapter 2
      </LinkButton>
      <LinkButton
        className="justify-start"
        href="/read/apush/ch_3"
        variant={pathName === `/read/apush/ch_3` ? "secondary" : "ghost"}
      >
        Chapter 3
      </LinkButton>
      <LinkButton
        className="justify-start"
        href="/read/apush/ch_4"
        variant={pathName === `/read/apush/ch_4` ? "secondary" : "ghost"}
      >
        Chapter 4
      </LinkButton>
    </div>
  );
}
