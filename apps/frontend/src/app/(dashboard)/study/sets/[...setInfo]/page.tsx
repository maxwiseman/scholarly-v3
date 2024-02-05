"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowForward } from "@tabler/icons-react";
import { type CardSet } from "../../page";
import { sets } from "../../sets";
import { Flashcard } from "./flashcard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

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
  return (
    <div className="xl:gird-cols-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-6 xl:grid-cols-3 xl:gap-8">
      {setData.cards.map((card) => (
        <Flashcard card={card} key={card.front.heading} />
      ))}
    </div>
  );
}

export function QuizView({
  cardSet,
}: {
  cardSet: CardSet;
}): React.ReactElement {
  const [correctWord, setCorrectWord] = useState("");
  const [promptWord, setPromptWord] = useState("Prompt");

  const formSchema = z.object({
    guess: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guess: "",
    },
  });

  useEffect(() => {
    const CardNumber = Math.floor(Math.random() * cardSet.cards.length);
    if (Math.random() <= 0.5) {
      setPromptWord(cardSet.cards[CardNumber]?.front.heading ?? "");
      setCorrectWord(cardSet.cards[CardNumber]?.back.heading ?? "");
    } else {
      setPromptWord(cardSet.cards[CardNumber]?.back.heading ?? "");
      setCorrectWord(cardSet.cards[CardNumber]?.front.heading ?? "");
    }
  }, [cardSet.cards]);

  function onSubmit({ guess }: { guess: string }): void {
    form.reset();
    if (guess.toUpperCase() !== correctWord.toUpperCase()) {
      form.setError("guess", { message: correctWord }, { shouldFocus: true });
    } else {
      const CardNumber = Math.floor(Math.random() * cardSet.cards.length);
      if (Math.random() <= 0.5) {
        setPromptWord(cardSet.cards[CardNumber]?.front.heading ?? "");
        setCorrectWord(cardSet.cards[CardNumber]?.back.heading ?? "");
      } else {
        setPromptWord(cardSet.cards[CardNumber]?.back.heading ?? "");
        setCorrectWord(cardSet.cards[CardNumber]?.front.heading ?? "");
      }
    }
  }

  return (
    <div className="absolute flex h-72 w-full flex-col items-center justify-center gap-5">
      <h2 className="scroll-m-20 pb-2 text-center text-4xl font-semibold tracking-tight first:mt-0">
        {promptWord}
      </h2>
      <Form {...form}>
        <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="guess"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      autoComplete="off"
                      className="w-96 rounded-full pr-10 shadow-lg"
                      placeholder="Type something..."
                      {...field}
                    />
                    <Button
                      className="absolute bottom-1 right-1 top-1 h-7 w-7 rounded-full"
                      size="icon"
                      type="submit"
                    >
                      <IconArrowForward className="h-4 w-4" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
