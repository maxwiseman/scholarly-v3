import { type Message } from "ai";
import { type HTMLProps, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function AiMessage({
  loading,
  message,
}: {
  loading: boolean;
  message: Message;
}): React.ReactElement {
  const [finished, setFinished] = useState<boolean>(loading);

  useEffect(() => {
    setTimeout(() => {
      setFinished(loading);
    }, 1000);
  }, [loading]);

  if (finished)
    return (
      <div className="block">
        <Markdown
          className={cn("typography mb-2 break-words [&>*]:break-words", {
            "[&>*]:text-right": message.role === "user",
          })}
          components={{ p: AnimatedWord }}
          remarkPlugins={[remarkGfm]}
        >
          {message.content}
        </Markdown>
      </div>
    );
  return (
    <Markdown
      className={cn("typography mb-2 break-words [&>*]:break-words", {
        "[&>*]:text-right": message.role === "user",
      })}
    >
      {message.content}
    </Markdown>
  );
}

function AnimatedWord(
  props: HTMLProps<HTMLParagraphElement>,
): React.ReactElement {
  const words =
    typeof props.children === "string"
      ? props.children.split(" ").map((word) => (
          <>
            <span
              className="inline-block duration-1000 animate-in fade-in-0"
              key={word}
            >
              {word}
            </span>{" "}
          </>
        ))
      : props.children;

  return <p>{words}</p>;
}
