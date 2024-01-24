"use client";

import {
  IconBrandOpenai,
  IconCursorText,
  IconDotsVertical,
  IconExternalLink,
  IconFileUpload,
  IconHistory,
  IconLink,
  IconLock,
  IconLockOpen,
  IconSend,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import Markdown from "react-markdown";
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
import { api } from "@/trpc/react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
} from "@/app/_components/ui/resizable";

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
          <TabsTrigger value="online_upload">
            <IconFileUpload className="mr-2 h-4 w-4" />
            File Upload
          </TabsTrigger>
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
    </Tabs>
  );
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

export function Chat(): React.ReactElement {
  const [userMessage, setUserMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="relative h-full">
        <ResizableHandle
          className="sticky top-[3.5rem] mx-8 h-[calc(100vh-3.5rem)] rounded-full"
          withHandle
        />
      </div>
      <ResizablePanel
        className="relative h-full"
        collapsedSize={0}
        collapsible
        defaultSize={0}
        minSize={15}
        onCollapse={() => {
          setChatOpen(false);
        }}
        onExpand={() => {
          setChatOpen(true);
        }}
        style={{ overflow: "visible" }}
      >
        {chatOpen ? (
          <Card className="sticky top-[5.5rem] flex h-full max-h-[calc(100vh-7.5rem)] min-h-48 max-w-full flex-col overflow-hidden">
            <CardHeader>
              <CardTitle className="items-between flex flex-row justify-between gap-2">
                <div className="flex w-max flex-row items-center gap-2">
                  <IconBrandOpenai className="h-4 w-4" />
                  AI Assistant
                </div>
                {/* <Button
                className="aspect-square"
                onClick={() => {
                  setChatOpen(false);
                }}
                size="icon"
                variant="ghost"
              >
                <IconLayoutSidebarRightCollapse className="h-4 w-4" />
              </Button> */}
              </CardTitle>
            </CardHeader>
            <ScrollArea
              className="h-full p-6 pt-0"
              style={{
                maskImage: `linear-gradient(#000,#000,transparent 0,#000 10px,#000 calc(100% - 10px),transparent)`,
              }}
            >
              <Markdown className="typography break-words">
                {mockResponse}
              </Markdown>
            </ScrollArea>
            <CardFooter className="flex items-center gap-2">
              <Input
                onChange={(e) => {
                  setUserMessage(e.target.value);
                }}
                onSubmit={() => {
                  setUserMessage("");
                }}
                placeholder="Type something..."
                value={userMessage}
              />
              <Button
                className="aspect-square"
                onClick={() => {
                  setUserMessage("");
                }}
                size="icon"
              >
                <IconSend className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : null}
      </ResizablePanel>
    </>
  );
}

const mockResponse = `To evaluate the extent to which changes in colonial societies in North 
America from 1700 to 1776 contributed to the growth of a revolutionary 
movement, consider the following points:
\n
\n1. **Economic Factors:** Discuss how economic changes, such as increased 
trade, the growth of commerce, and the rise of an agrarian economy, led to
greater prosperity for some colonists but also created disparities between
social classes and fueled discontent.
\n
\n2. **Political Factors:** Describe the shifting political landscape in 
colonial America, including the expansion of royal power and the 
increasing assertion of colonial self-government. Discuss the impact of 
events like the Proclamation of 1763 and the Stamp Act on tensions between
colonists and the British government.
\n
\n3. **Social Factors:** Analyze how social changes, such as increased 
urbanization and religious diversity, led to greater interconnections 
among colonists but also created potential for conflict. Explore how these
changes influenced attitudes towards British rule and contributed to the 
development of a shared colonial identity.
\n
\n4. **Ideological Factors:** Discuss the role of intellectual and 
philosophical ideas in fueling revolutionary sentiments. Consider how 
Enlightenment thinking, republican ideology, and radical pamphlets 
influenced colonists' perceptions of their rights and their relationship 
to British rule.
\n
\n5. **Leadership and Organizational Factors:** Describe the emergence of 
key colonial figures who played important roles in the revolutionary 
movement, such as Samuel Adams or Thomas Paine. Analyze how these leaders 
used their influence to mobilize support for the cause and how they 
organized effective resistance against British rule.
\n
\n6. **Conclusion:** Summarize the main points made in your essay and 
explain the overall significance of these changes in contributing to the 
growth of a revolutionary movement. Discuss the long-term implications of 
these developments for American history.`;
