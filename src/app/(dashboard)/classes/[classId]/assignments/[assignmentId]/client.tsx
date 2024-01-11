"use client";

import {
  IconCursorText,
  IconDotsVertical,
  IconExternalLink,
  IconFileUpload,
  IconLink,
} from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardTitle } from "@/app/_components/ui/card";
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
      <TabsContent value="text">
        <TipTap
          slotAfter={
            <>
              <Separator />
              <div className="flex flex-row p-4">
                <Button>Submit</Button>
              </div>
            </>
          }
        />
      </TabsContent>
      <TabsContent value="url">
        <Card>
          <CardHeader>
            <CardTitle>Url</CardTitle>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="file">
        <Card>
          <CardHeader>
            <CardTitle>File upload</CardTitle>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
