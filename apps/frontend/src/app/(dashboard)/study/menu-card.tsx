import Link from "next/link";
import "./menu-card.css";
import { type CardSet } from "./page";
import { Card, CardDescription, CardTitle } from "@/app/_components/ui/card";
import { cn } from "@/lib/utils";

export function MenuCard({
  cardSet,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  cardSet: CardSet;
}): React.ReactElement {
  return (
    <Link
      aria-description={cardSet.description}
      aria-label={cardSet.title}
      className="max-w-full"
      href={`/study/sets/${cardSet.slug}`}
    >
      <Card
        className={cn(
          "h-48 min-h-min w-full min-w-full max-w-[580px] flex-row gap-6 p-4 md:flex",
          className,
        )}
        {...props}
      >
        <div className="cardSlot hidden w-full max-w-2 md:block">
          <div className="bottomCard" />
          <div className="middleCard" />
          <div className="topCard">{cardSet.cards[0]?.front.heading}</div>
        </div>
        <div>
          <CardTitle className="whitespace-break-spaces text-lg font-semibold">
            {cardSet.title}
          </CardTitle>
          <CardDescription className="line-clamp-5">
            {cardSet.description}
          </CardDescription>
        </div>
      </Card>
    </Link>
  );
}
