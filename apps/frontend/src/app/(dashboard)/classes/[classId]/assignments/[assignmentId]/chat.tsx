"use client";

import { IconBrandOpenai, IconSend } from "@tabler/icons-react";
import React, { useState } from "react";
import Markdown from "react-markdown";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
} from "@/app/_components/ui/resizable";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { type Assignment } from "@/server/api/routers/canvas/get-assignment";
import { Separator } from "@/app/_components/ui/separator";
import { cn } from "@/lib/utils";

export function Chat({
  assignment,
}: {
  assignment: Assignment;
}): React.ReactElement {
  const [userMessage, setUserMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "assistant" | "user"; message: string }[]
  >([
    {
      sender: "assistant",
      message: mockResponse,
    },
    {
      sender: "user",
      message: "I don't understand what I'm supposed to do.",
    },
    {
      sender: "assistant",
      message: "Oh okay, I'll help you out.",
    },
  ]);
  console.log(generateInitialPrompt());

  return (
    <>
      <div className="relative h-full">
        <ResizableHandle
          className={cn(
            "sticky top-[5.5rem] z-10 ml-8 h-[calc(100vh-7.5rem)] rounded-full",
            { "bg-transparent": chatOpen },
          )}
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
              className="h-full px-6 py-0"
              style={{
                maskImage: `linear-gradient(#000,#000,transparent 0,#000 10px,#000 calc(100% - 10px),transparent)`,
              }}
            >
              {messages.map((message, i) => {
                return (
                  <>
                    {message.sender !== messages[i - 1]?.sender && i !== 0 ? (
                      <div className="my-4 mt-6 flex max-w-full flex-row flex-nowrap items-center gap-1">
                        {message.sender === "assistant" ? (
                          <>
                            <span className="text-xs text-muted-foreground">
                              Assistant
                            </span>
                            <Separator />
                          </>
                        ) : (
                          <>
                            <Separator className="relative shrink" />
                            <span className="text-xs text-muted-foreground">
                              User
                            </span>
                          </>
                        )}
                      </div>
                    ) : null}
                    <Markdown
                      className="typography break-words"
                      key={message.message.substring(0, 10)}
                    >
                      {message.message}
                    </Markdown>
                  </>
                );
              })}
            </ScrollArea>
            <CardFooter className="flex items-center gap-2 pt-6">
              <Input
                onChange={(e) => {
                  setUserMessage(e.target.value);
                }}
                onSubmit={() => {
                  sendMessage();
                }}
                placeholder="Type something..."
                value={userMessage}
              />
              <Button
                className="aspect-square"
                onClick={() => {
                  sendMessage();
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

  function sendMessage(message?: string): void {
    const ClonedMessages = [...messages];
    ClonedMessages.push({
      sender: "user",
      message: message || userMessage,
    });
    setMessages(ClonedMessages);
    setUserMessage("");
  }

  function generateInitialPrompt(): string {
    return `You are an assistant for a student. I will provide you with the information for the student's assignment. I need you to help the student complete the assignment. You might accomplish this by, for example, providing an outline for an essay assignment, or describing how to complete an assignment. Format your response with markdown, but don't start it with \`\`\`. Don't use emojis. The student will see your response next to the assignment description. Don't start with an introduction, just get straight into the content. If you include any links, ALWAYS name them using markdown syntax: [link name](link url). Do not include any HTML tags in your response, and don't start your response with a heading.

---

Assignment name: ${assignment.name}
${
  assignment.due_at
    ? `Assignment due date: ${new Date(assignment.due_at).toLocaleDateString(
        "en-us",
        {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        },
      )}
  Current date: ${new Date().toLocaleDateString("en-us", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`
    : ""
}
Assignment Description (DO NOT RESPOND TO THIS, just use it to help with your response): (See description below divider)

---

${assignment.description}
  `;
  }
}

const mockResponse = `1. Familiarize yourself with the Bill of Rights by reading the transcript [here](https://www.archives.gov/founding-docs/bill-of-rights-transcript) and reviewing the presentation [linked here](https://docs.google.com/presentation/d/1G66MAa7cra4cuS8lleIxzGNVR62f43lRldDeClFgrmU/present).
2. Create a remix of the provided Google Doc [here](https://docs.google.com/document/d/1Vxqiw4fvGT8wgvcFipRyPzZ2L8-qLQfmv3YEd2wZPbc/view) to summarize each amendment in your own words.
3. Use the Bill of Rights one-pager [here](https://docs.google.com/document/d/1Z-NEqM9giBEVO4gjSTjJEg3PGiE624TU0x_Hr6w4pMg/view) for reference if needed.
4. Test your knowledge of the Bill of Rights using the "Do I Have a Right?" game on iCivics [here](https://www.icivics.org/games/do-i-have-right).`;
