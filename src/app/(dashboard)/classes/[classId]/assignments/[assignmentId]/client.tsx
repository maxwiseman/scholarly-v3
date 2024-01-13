"use client";

import {
  IconCursorText,
  IconDotsVertical,
  IconExternalLink,
  IconFileUpload,
  IconHistory,
  IconLink,
  IconLock,
  IconLockOpen,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
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
        <Link href={assignment.html_url} target="_blank">
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
        <TextSubmission />
      </TabsContent>
      <TabsContent className="min-h-[18.75rem]" value="url">
        <UrlSubmission />
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

function UrlSubmission(): React.ReactElement {
  const [url, setUrl] = useState("");

  return (
    <Card className="flex flex-col">
      <CardHeader className="">
        <CardTitle>Submit a URL</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Input
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          placeholder="https://"
          value={url}
        />
      </CardContent>
      <Separator />
      <CardFooter className="justify-between p-4 px-6">
        <div className="flex flex-row items-center gap-2 text-muted-foreground">
          {url.startsWith("http://") && (
            <>
              <IconLockOpen className="h-5 w-5" /> This site doesn&lsquo;t use
              HTTPS.{" "}
              <Link
                className="underline"
                href="https://www.cloudflare.com/learning/ssl/why-is-http-not-secure/#:~:text=HTTPS%20is%20HTTP%20with%20encryption,far%20more%20secure%20than%20HTTP."
              >
                Learn More
              </Link>
            </>
          )}{" "}
          {url.startsWith("https://") && (
            <>
              <IconLock className="h-5 w-5" /> This site uses HTTPS.{" "}
              <Link
                className="underline"
                href="https://www.cloudflare.com/learning/ssl/why-is-http-not-secure/#:~:text=HTTPS%20is%20HTTP%20with%20encryption,far%20more%20secure%20than%20HTTP."
              >
                Learn More
              </Link>
            </>
          )}
        </div>
        <Button
          onClick={() => {
            toast.warning("You're early!", {
              description: "This feature hasn't been implemented yet.",
            });
          }}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

function TextSubmission(): React.ReactElement {
  return (
    <TipTap
      slotAfter={
        <>
          <Separator />
          <div className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconHistory className="h-5 w-5" /> Last saved 1 min ago
            </div>
            <Button
              onClick={() => {
                toast.warning("You're early!", {
                  description: "This feature hasn't been implemented yet.",
                });
              }}
            >
              Submit
            </Button>
          </div>
        </>
      }
    />
  );
}
