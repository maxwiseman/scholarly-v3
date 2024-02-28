"use client";

import {
  IconBrandGoogleDrive,
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
import React, { useState } from "react";
import { toast } from "sonner";
import { Button, LinkButton } from "@/app/_components/ui/button";
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
import { DropZone } from "@/app/_components/ui/dropzone";
import { Input } from "@/app/_components/ui/input";
import { Separator } from "@/app/_components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { TipTap } from "@/app/_components/ui/tiptap";
import { type Assignment } from "@/server/api/routers/canvas/get-assignments";
import { api } from "@/trpc/react";

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

export function Submission(props: {
  classId: string;
  assignment: Assignment;
}): React.ReactElement {
  if (
    JSON.stringify(props.assignment.submission_types) === '["external_tool"]'
  ) {
    const data = api.misc.getArbitraryUrl.useQuery({
      url: props.assignment.url,
    });
    return (
      <LinkButton
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- its ok
        href={(data.data?.url as string) || ""}
        icon={<IconExternalLink />}
        target="_blank"
      >
        Launch External Tool
      </LinkButton>
    );
  }
  if (
    props.assignment.submission_types.includes("online_text_entry") ||
    props.assignment.submission_types.includes("online_url") ||
    props.assignment.submission_types.includes("online_upload")
  )
    return (
      <Tabs
        className="w-full"
        defaultValue={props.assignment.submission_types[0]}
      >
        <TabsList>
          {props.assignment.submission_types.includes("online_text_entry") && (
            <TabsTrigger value="online_text_entry">
              <IconCursorText className="mr-2 h-4 w-4" />
              Text Entry
            </TabsTrigger>
          )}
          {props.assignment.submission_types.includes("online_url") && (
            <TabsTrigger value="online_url">
              <IconLink className="mr-2 h-4 w-4" />
              Web URL
            </TabsTrigger>
          )}
          {props.assignment.submission_types.includes("online_upload") && (
            <>
              <TabsTrigger value="online_upload">
                <IconFileUpload className="mr-2 h-4 w-4" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="drive">
                <IconBrandGoogleDrive className="mr-2 h-4 w-4" />
                Google Drive
              </TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent className="min-h-[18.75rem]" value="online_text_entry">
          <TextSubmission props={props} />
        </TabsContent>
        <TabsContent className="min-h-[18.75rem]" value="online_url">
          <UrlSubmission props={props} />
        </TabsContent>
        <TabsContent className="min-h-[18.75rem]" value="online_upload">
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
        <TabsContent className="min-h-[18.75rem]" value="drive">
          <Card className="flex flex-col">
            <CardHeader className="">
              <CardTitle>Submit a Google Doc</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              This doesn&lsquo;t work just yet, because we&lsquo;re awaiting KCS
              approval. In the meantime, you can go to Canvas and submit through
              there.
            </CardContent>
            <Separator />
            <CardFooter className="justify-end p-4 px-6">
              <LinkButton
                href={`${props.assignment.html_url}#:~:text=Choose%20a%20submission%20type`}
                target="_blank"
              >
                Go to Canvas
              </LinkButton>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
  // eslint-disable-next-line react/jsx-no-useless-fragment -- this way it returns a React.ReactElement
  return <></>;
}

function UrlSubmission({
  props,
}: {
  props: {
    classId: string;
    assignment: Assignment;
  };
}): React.ReactElement {
  const [url, setUrl] = useState("");
  const submitAssignment = api.canvas.submitAssignment.useMutation();

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
            toast.promise(
              async () => {
                await submitAssignment.mutateAsync({
                  classId: props.classId,
                  assignmentId: props.assignment.id.toString(),
                  body: url,
                  type: "online_url",
                });
                setUrl("");
              },
              {
                loading: "Submitting...",
                success: "Submitted!",
                error: "Failed to submit!",
              },
            );
          }}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

function TextSubmission({
  props,
}: {
  props: {
    classId: string;
    assignment: Assignment;
  };
}): React.ReactElement {
  const [content, setContent] = useState("");
  const submitAssignment = api.canvas.submitAssignment.useMutation();

  return (
    <TipTap
      content={content}
      onUpdate={({ editor }) => {
        setContent(editor.getHTML());
      }}
      slotAfter={
        <>
          <Separator />
          <div className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconHistory className="h-5 w-5" /> Not saved
            </div>
            <Button
              onClick={() => {
                toast.promise(
                  async () => {
                    await submitAssignment.mutateAsync({
                      classId: props.classId,
                      assignmentId: props.assignment.id.toString(),
                      body: content,
                      type: "online_text_entry",
                    });
                    setContent("");
                  },
                  {
                    loading: "Submitting...",
                    success: "Submitted!",
                    error: "Failed to submit!",
                  },
                );
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
