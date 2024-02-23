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
import { Separator } from "@/app/_components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Spinner } from "@/app/_components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

export function Chat({
  initialPrompt,
}: {
  initialPrompt: string;
}): React.ReactElement {
  const [chatOpen, setChatOpen] = useState(false);
  const panelRef = useRef<ImperativePanelHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState("pplx");
  const chat = useChat({ api: `/api/chat/${model}` });
  // const chat = useChat();

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
        content: initialPrompt,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This should only run once.
  }, [initialPrompt]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [chat.messages]);

  return (
    <>
      <div>
        <ResizableHandle
          className={cn(
            "sticky top-[5.5rem] z-10 ml-8 h-[calc(100vh-7.5rem)] rounded-full",
            { "bg-transparent": chatOpen },
          )}
          withHandle
        />
      </div>
      <ResizablePanel
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
        style={{ overflow: "unset" }}
      >
        {chatOpen ? (
          <Card className="sticky top-[5.5rem] flex h-full max-h-[calc(100vh-7.5rem)] min-h-48 max-w-full flex-col overflow-hidden">
            <CardHeader className="py-3">
              <CardTitle className="items-between flex flex-row justify-between gap-2">
                <div className="flex w-max flex-row items-center gap-2">
                  <IconBrandOpenai className="h-4 w-4 min-w-4" />
                  <Select
                    defaultValue="pplx"
                    onValueChange={setModel}
                    value={model}
                  >
                    <SelectTrigger className="border-transparent px-2 shadow-none">
                      <SelectValue placeholder="Pick something..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pplx">Perplexity</SelectItem>
                      <SelectItem value="3.5t">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="4t">GPT-4 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
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
                              content: initialPrompt,
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
                        {message.role === "assistant" &&
                        chat.isLoading &&
                        chat.messages.indexOf(message) ===
                          chat.messages.length - 1
                          ? `${message.content}&#9612;`
                          : message.content}
                        {/* {initialPrompt} */}
                      </Markdown>
                    </>
                  );
                })}
                {chat.isLoading &&
                chat.messages[chat.messages.length - 1]?.role !==
                  "assistant" ? (
                  <>
                    <div className="my-4 flex max-w-full flex-row flex-nowrap items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Assistant
                      </span>
                      <Separator />
                    </div>
                    <Spinner />
                  </>
                ) : null}
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
}

// const mockResponse = `1. Familiarize yourself with the Bill of Rights by reading the transcript [here](https://www.archives.gov/founding-docs/bill-of-rights-transcript) and reviewing the presentation [linked here](https://docs.google.com/presentation/d/1G66MAa7cra4cuS8lleIxzGNVR62f43lRldDeClFgrmU/present).
// 2. Create a remix of the provided Google Doc [here](https://docs.google.com/document/d/1Vxqiw4fvGT8wgvcFipRyPzZ2L8-qLQfmv3YEd2wZPbc/view) to summarize each amendment in your own words.
// 3. Use the Bill of Rights one-pager [here](https://docs.google.com/document/d/1Z-NEqM9giBEVO4gjSTjJEg3PGiE624TU0x_Hr6w4pMg/view) for reference if needed.
// 4. Test your knowledge of the Bill of Rights using the "Do I Have a Right?" game on iCivics [here](https://www.icivics.org/games/do-i-have-right).`;
