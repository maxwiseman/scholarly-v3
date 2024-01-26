"use client";

import {
  IconBrandOpenai,
  IconLayoutSidebarRightCollapse,
  IconPlus,
  IconSend,
  IconSquare,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { type ImperativePanelHandle } from "react-resizable-panels";
import { useChat } from "ai/react";
import remarkGFM from "remark-gfm";
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
import { type Assignment } from "@/server/api/routers/canvas/get-assignments";
import { Separator } from "@/app/_components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

export function Chat({
  assignment,
}: {
  assignment: Assignment;
}): React.ReactElement {
  const [chatOpen, setChatOpen] = useState(false);
  const panelRef = useRef<ImperativePanelHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chat = useChat();

  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (chatOpen) panelRef.current?.collapse();
        else panelRef.current?.expand();
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [panelRef, chatOpen]);
  useEffect(() => {
    chat.setMessages([
      {
        id: "initial-prompt",
        role: "system",
        content: generateInitialPrompt(),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This should only run once.
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat.messages]);

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
        minSize={20}
        onCollapse={() => {
          setChatOpen(false);
        }}
        onExpand={() => {
          setChatOpen(true);
        }}
        ref={panelRef}
        style={{ overflow: "visible" }}
      >
        {chatOpen ? (
          <Card className="sticky top-[5.5rem] flex h-full max-h-[calc(100vh-7.5rem)] min-h-48 max-w-full flex-col overflow-hidden">
            <CardHeader className="py-3">
              <CardTitle className="items-between flex flex-row justify-between gap-2">
                <div className="flex w-max flex-row items-center gap-2">
                  <IconBrandOpenai className="h-4 w-4" />
                  AI Assistant
                </div>
                <div className="flex flex-row gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        className="aspect-square"
                        onClick={() => {
                          chat.setMessages([
                            {
                              id: "initial-prompt",
                              role: "system",
                              content: generateInitialPrompt(),
                            },
                          ]);
                        }}
                        size="icon"
                        variant="ghost"
                      >
                        <IconPlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>New chat</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        className="aspect-square"
                        onClick={() => {
                          panelRef.current?.collapse();
                        }}
                        size="icon"
                        variant="ghost"
                      >
                        <IconLayoutSidebarRightCollapse className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Collapse AI panel</TooltipContent>
                  </Tooltip>
                </div>
              </CardTitle>
            </CardHeader>
            <ScrollArea
              className="h-full px-6 py-0"
              ref={scrollRef}
              style={{
                maskImage: `linear-gradient(#000,#000,transparent 0,#000 10px,#000 calc(100% - 10px),transparent)`,
              }}
            >
              <div>
                {chat.messages.map((message, i) => {
                  if (message.role !== "assistant" && message.role !== "user")
                    return null;
                  return (
                    <>
                      {message.role !== chat.messages[i - 1]?.role &&
                      i !== 1 ? (
                        <div className="my-4 flex max-w-full flex-row flex-nowrap items-center gap-1">
                          {message.role === "assistant" ? (
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
                        className={cn(
                          "typography mb-2 break-words [&>*]:break-words",
                          {
                            "[&>*]:text-right": message.role === "user",
                          },
                        )}
                        key={message.content.substring(0, 10)}
                        remarkPlugins={[remarkGFM]}
                      >
                        {message.content}
                      </Markdown>
                    </>
                  );
                })}
              </div>
            </ScrollArea>
            <CardFooter className="pt-6">
              <form
                className="flex w-full items-center gap-2"
                onSubmit={chat.handleSubmit}
              >
                <Input
                  onChange={chat.handleInputChange}
                  placeholder="Type something..."
                  value={chat.input}
                />
                {chat.isLoading ? (
                  <Button
                    className="aspect-square"
                    onClick={() => {
                      chat.stop();
                    }}
                    size="icon"
                  >
                    <IconSquare className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="aspect-square" size="icon" type="submit">
                    <IconSend className="h-4 w-4" />
                  </Button>
                )}
              </form>
            </CardFooter>
          </Card>
        ) : null}
      </ResizablePanel>
    </>
  );

  function generateInitialPrompt(): string {
    return `You are an assistant for a student. I will provide you with the information for the student's assignment. I need you to help the student complete the assignment. You might accomplish this by, for example, providing an outline for an essay assignment, or describing how to complete an assignment. Format your response with markdown, but don't start it with \`\`\`. Don't use emojis. The student will see your response next to the assignment description. Don't start with an introduction, just get straight into the content. If you include any links, ALWAYS name them using markdown syntax: [link name](link url). Do not include any HTML tags in your response, and don't start your response with a heading. Keep your answer as short as possible, students don't like to read a lot of text.
    Remember, YOU MAY ONLY USE MARKDOWN FORMATTING! HTML FORMATTING IS NOT ACCEPTED!

---

Today's date: ${new Date().toLocaleDateString("en-us", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
Assignment name: ${assignment.name}
${assignment.rubric ? `Assignment rubric: ${JSON.stringify(assignment.rubric)}` : ""}
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
      )}`
    : ""
}
Assignment Description (DO NOT RESPOND TO THIS, just use it to help with your response): (See description below divider)

---

${assignment.description}
  `;
  }
}

// const mockResponse = `1. Familiarize yourself with the Bill of Rights by reading the transcript [here](https://www.archives.gov/founding-docs/bill-of-rights-transcript) and reviewing the presentation [linked here](https://docs.google.com/presentation/d/1G66MAa7cra4cuS8lleIxzGNVR62f43lRldDeClFgrmU/present).
// 2. Create a remix of the provided Google Doc [here](https://docs.google.com/document/d/1Vxqiw4fvGT8wgvcFipRyPzZ2L8-qLQfmv3YEd2wZPbc/view) to summarize each amendment in your own words.
// 3. Use the Bill of Rights one-pager [here](https://docs.google.com/document/d/1Z-NEqM9giBEVO4gjSTjJEg3PGiE624TU0x_Hr6w4pMg/view) for reference if needed.
// 4. Test your knowledge of the Bill of Rights using the "Do I Have a Right?" game on iCivics [here](https://www.icivics.org/games/do-i-have-right).`;
