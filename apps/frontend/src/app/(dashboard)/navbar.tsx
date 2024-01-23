"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "../_components/ui/user-button";
import { Search } from "./client";
import { cn } from "@/lib/utils";

export function Navbar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-center border-b border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <nav className="flex w-full max-w-screen-2xl items-center justify-between px-8">
        <div className="flex flex-row items-center justify-start gap-6">
          <Link href="/dashboard">
            <span className="block font-bold">Scholarly</span>
          </Link>
          <Link
            className={cn(
              "text-sm text-foreground/60 transition-colors hover:text-foreground/80",
              {
                "text-foreground": pathname.startsWith("/dashboard"),
              },
            )}
            href="/dashboard"
          >
            Classes
          </Link>
          <Link
            className={cn(
              "text-sm text-foreground/60 transition-colors hover:text-foreground/80",
              {
                "text-foreground": pathname.startsWith("/learn"),
              },
            )}
            href="/dashboard"
          >
            Study
          </Link>
        </div>
        <div className="flex flex-row items-center justify-end gap-3">
          <Search />
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
