"use client";
import { IconDotsVertical, IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import GoogleDocsViewer from "react-google-docs-viewer";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { type CanvasFile } from "@/server/api/routers/canvas/get-file";

export function FilePreview({ url }: { url: string }): React.ReactElement {
  return (
    <div className="overflow-hidden rounded-md">
      <GoogleDocsViewer fileUrl={url} height="780px" width="100%" />
    </div>
  );
}

export function Actions({ file }: { file: CanvasFile }): React.ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <IconDotsVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={file.url} target="_blank">
          <DropdownMenuItem>
            <IconDownload className="mr-2 h-4 w-4" /> Download file
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
