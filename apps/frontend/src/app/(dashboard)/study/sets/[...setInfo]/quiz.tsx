"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowForward } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type CardSet } from "../../page";
import { Input } from "@/app/_components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";

export function QuizView({
  cardSet,
}: {
  cardSet: CardSet;
}): React.ReactElement {
  const [correctWord, setCorrectWord] = useState("");
  const [promptWord, setPromptWord] = useState("Loading...");

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
