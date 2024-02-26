"use client";

import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../_components/ui/carousel";
import { Item } from "./item";

export default function Page(): React.ReactElement {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted">
      <Carousel
        className="max-w-screen h-full max-h-screen w-full"
        opts={{ loop: true }}
      >
        <CarouselContent
          className="h-full shrink grow p-4 px-16"
          ref={contentRef}
        >
          {demoPages.map((page, index) => (
            <CarouselItem className="p-10" key={page.title}>
              <Item hoverRef={contentRef} index={index} page={page} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="fixed left-5 shrink-0" />
        <CarouselNext className="fixed right-5 shrink-0" /> */}
      </Carousel>
    </div>
  );
}

const demoPages: { href: string; title: string }[] = [
  {
    href: "/home",
    title: "Home",
  },
  {
    href: "/classes/a158492d-1695-4bbd-8527-d36db9319b86/modules",
    title: "Modules",
  },
  {
    href: "/classes/a158492d-1695-4bbd-8527-d36db9319b86/assignments/9098256",
    title: "Assignment",
  },
  {
    href: "/classes/5b1e16cd-b4f0-457c-8a3c-167666b2b21a/grades",
    title: "Grades",
  },
  {
    href: "/read/american-pageant/ch-31",
    title: "Read",
  },
  {
    href: "/study",
    title: "Study",
  },
  {
    href: "/study/sets/bor-amendments",
    title: "Study Set",
  },
];
