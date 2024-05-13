"use client";

import {
  IconBrandOpenai,
  IconClipboardCopy,
  IconLayoutSidebarRightCollapse,
  IconPlus,
  IconSend,
  IconSquare,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";
import { useChat } from "ai/react";
import { AiMessage } from "./ai-message";
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
  const [model, setModel] = useState(
    process.env.NODE_ENV === "development" ? "llama" : "pplx",
  );
  const chat = useChat({ api: `/api/chat/${model}` });

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
  }, [initialPrompt, model]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat.isLoading]);

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
                    defaultValue={
                      process.env.NODE_ENV === "development"
                        ? "mistral"
                        : "pplx"
                    }
                    onValueChange={setModel}
                    value={model}
                  >
                    <SelectTrigger className="border-transparent px-2 shadow-none">
                      <SelectValue placeholder="Pick something..." />
                    </SelectTrigger>
                    <SelectContent>
                      {process.env.NODE_ENV === "development" ? (
                        <SelectItem value="llama">Llama 3</SelectItem>
                      ) : null}
                      <SelectItem value="pplx">Perplexity</SelectItem>
                      <SelectItem value="3.5t">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="4o">GPT-4o</SelectItem>
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
            {chat.messages.length < 2 ? (
              <div className="flex h-full cursor-default flex-col items-center justify-center gap-4 text-muted-foreground">
                No messages yet!
              </div>
            ) : (
              <ScrollArea
                className="h-full overflow-x-auto px-6 py-0"
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
                                <span className="mr-1 text-xs text-muted-foreground">
                                  Assistant
                                </span>
                                <Separator className="shrink grow rounded-full" />
                                <Button
                                  className="aspect-square h-6 w-6 rounded-sm p-1 text-muted-foreground"
                                  icon={
                                    <IconClipboardCopy className="h-3 w-3" />
                                  }
                                  onClick={async () => {
                                    await navigator.clipboard.writeText(
                                      message.content,
                                    );
                                  }}
                                  size="icon"
                                  variant="ghost"
                                />
                              </>
                            ) : (
                              <>
                                <Separator className="shrink grow" />
                                <span className="text-xs text-muted-foreground">
                                  User
                                </span>
                              </>
                            )}
                          </div>
                        ) : null}
                        <AiMessage
                          key={message.content.substring(0, 10)}
                          loading={
                            message.role === "assistant" && chat.isLoading
                              ? chat.messages.indexOf(message) ===
                                chat.messages.length - 1
                              : false
                          }
                          message={message}
                        />
                      </>
                    );
                  })}
                  {chat.isLoading &&
                  chat.messages[chat.messages.length - 1]?.role !==
                    "assistant" ? (
                    <>
                      <div className="my-4 flex max-w-full flex-row flex-nowrap items-center gap-1">
                        <span className="mr-1 text-xs text-muted-foreground">
                          Assistant
                        </span>
                        <Separator className="shrink grow rounded-full" />
                        <Button
                          className="aspect-square h-6 w-6 rounded-sm p-1 text-muted-foreground"
                          icon={<IconClipboardCopy className="h-3 w-3" />}
                          onClick={async () => {
                            await navigator.clipboard.writeText("Loading...");
                          }}
                          size="icon"
                          variant="ghost"
                        />
                      </div>
                      <Spinner />
                    </>
                  ) : null}
                </div>
              </ScrollArea>
            )}
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
