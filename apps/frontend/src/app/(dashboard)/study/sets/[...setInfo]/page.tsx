"use client";

import { sets } from "../../sets";
import { Flashcard } from "./flashcard";
import { MultipleChoice } from "./multiple-choice";
import { QuizView } from "./quiz";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";

export default function Page({
  params,
}: {
  params: { setInfo: string[] };
}): React.ReactElement {
  const setData = sets.filter((set) => set.slug === params.setInfo[0])[0];
  if (!setData) {
    return <div>Set not found</div>;
  }
  if (params.setInfo[1] === "stack")
    return (
      <div className="flex w-full flex-row items-center justify-center">
        <Carousel className="w-full max-w-2xl py-8 pb-10">
          <CarouselContent>
            {setData.cards.map((card) => {
              return (
                <CarouselItem key={card.front.heading}>
                  <div className="flex items-center justify-center px-10 py-2">
                    <Flashcard card={card} />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute" />
          <CarouselNext className="absolute" />
        </Carousel>
      </div>
    );
  if (params.setInfo[1] === "quiz") return <QuizView cardSet={setData} />;
  if (params.setInfo[1] === "multiple_choice")
    return <MultipleChoice cardSet={setData} />;
  return (
    <div className="xl:gird-cols-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-6 xl:grid-cols-3 xl:gap-8">
      {setData.cards.map((card) => (
        <Flashcard card={card} key={card.front.heading} />
      ))}
    </div>
  );
}
