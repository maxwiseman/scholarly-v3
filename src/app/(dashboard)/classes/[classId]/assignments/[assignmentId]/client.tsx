"use client";

import {
  IconCursorText,
  IconDotsVertical,
  IconExternalLink,
  IconFileUpload,
  IconHistory,
  IconLink,
} from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { TipTap } from "@/app/_components/ui/tiptap";
import { type Assignment } from "@/server/api/routers/canvas/get-assignment";
import { Separator } from "@/app/_components/ui/separator";
import { Input } from "@/app/_components/ui/input";
import { DropZone } from "@/app/_components/ui/dropzone";

export function Actions({
  assignment,
}: {
  assignment: Assignment;
}): React.ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <IconDotsVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={assignment.html_url}>
          <DropdownMenuItem>
            <IconExternalLink className="mr-2 h-4 w-4" /> Show on Canvas
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Submission(): React.ReactElement {
  return (
    <Tabs className="w-full" defaultValue="account">
      <TabsList>
        <TabsTrigger value="text">
          <IconCursorText className="mr-2 h-4 w-4" />
          Text Entry
        </TabsTrigger>
        <TabsTrigger value="url">
          <IconLink className="mr-2 h-4 w-4" />
          Web URL
        </TabsTrigger>
        <TabsTrigger value="file">
          <IconFileUpload className="mr-2 h-4 w-4" />
          File Upload
        </TabsTrigger>
      </TabsList>
      <TabsContent className="min-h-[18.75rem]" value="text">
        <TipTap
          slotAfter={
            <>
              <Separator />
              <div className="flex flex-row items-center justify-between p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconHistory className="h-5 w-5" /> Last saved 1 min ago
                </div>
                <Button>Submit</Button>
              </div>
            </>
          }
        />
      </TabsContent>
      <TabsContent className="min-h-[18.75rem]" value="url">
        <Card className="flex flex-col">
          <CardHeader className="">
            <CardTitle>Submit a URL</CardTitle>
          </CardHeader>
          <CardContent className="">
            <Input placeholder="https://" />
          </CardContent>
          <Separator />
          <CardFooter className="justify-end p-4 px-6">
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent className="min-h-[18.75rem]" value="file">
        {/* <Card className="flex flex-col">
          <CardHeader className="">
            <CardTitle>Submit a File</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DropZone />
            </CardContent>
            <Separator />
            <CardFooter className="justify-end p-4 px-6">
            <Button>Submit</Button>
            </CardFooter>
          </Card> */}
        <DropZone />
      </TabsContent>
    </Tabs>
  );
}
