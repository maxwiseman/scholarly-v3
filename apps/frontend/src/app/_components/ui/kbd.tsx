import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Kbd({
  className,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>): React.ReactElement {
  return (
    <kbd
      className={cn(
        "pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex",
        className,
      )}
      {...props}
    />
  );
}
