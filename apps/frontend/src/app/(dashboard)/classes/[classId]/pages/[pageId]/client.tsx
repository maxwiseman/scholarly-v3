"use client";

import { IconDotsVertical, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { type Page } from "@/server/api/routers/canvas/get-page";

export function Actions({ page }: { page: Page }): React.ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <IconDotsVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={page.html_url}>
          <DropdownMenuItem>
            <IconExternalLink className="mr-2 h-4 w-4" /> Show on Canvas
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
