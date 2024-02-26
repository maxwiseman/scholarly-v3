"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import { IconRefresh } from "@tabler/icons-react";
import { useCarousel } from "../_components/ui/carousel";
import { Button } from "../_components/ui/button";
import { cn } from "@/lib/utils";

export function Item({
  page,
  index,
  hoverRef,
}: {
  page: { title: string; href: string };
  index: number;
  hoverRef?: RefObject<HTMLDivElement>;
}): React.ReactElement {
  const { api } = useCarousel();
  const [active, setActive] = useState(index === 0);
  const frameRef = useRef<HTMLIFrameElement>(null);

  api?.on("scroll", () => {
    setActive(api.selectedScrollSnap() === index);
  });

  useEffect(() => {
    function goNext(): void {
      if (!hoverRef?.current?.matches(":hover")) api?.scrollNext();
      setTimeout(goNext, 5000);
    }

    if (index === 0) {
      setTimeout(goNext, 5000);
    }
  }, [index, api, hoverRef]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- this is fine
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-xl opacity-50 shadow-lg transition-opacity",
        {
          "pointer-events-auto opacity-100": active,
        },
      )}
      onClick={() => {
        if (!active) {
          api?.scrollTo(index);
        }
      }}
    >
      <iframe
        className={cn("pointer-events-none relative h-full w-full", {
          "pointer-events-auto": active,
        })}
        ref={frameRef}
        src={page.href}
        title={page.title}
      />
      <Button
        className="absolute bottom-4 right-4 z-50"
        icon={<IconRefresh />}
        onClick={() => {
          frameRef.current?.setAttribute("src", page.href);
        }}
      >
        Reset
      </Button>
    </div>
  );
}
