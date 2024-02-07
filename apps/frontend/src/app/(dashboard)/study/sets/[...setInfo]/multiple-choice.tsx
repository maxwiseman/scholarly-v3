"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type Card as Flashcard, type CardSet } from "../../page";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export function MultipleChoice({
  cardSet,
}: {
  cardSet: CardSet;
}): React.ReactElement {
  const [value, setValue] = useState("");
  const [promptCard, setPromptCard] = useState<Flashcard | undefined>();
  const [direction, setDirection] = useState<"forwards" | "backwards">(
    "forwards",
  );
  const [choices, setChoices] = useState<{ name: string; correct: boolean }[]>(
    [],
  );

  const numberOfAnswers = 4;

  useEffect(() => {
    setPromptCard(
      cardSet.cards[Math.floor(Math.random() * cardSet.cards.length)],
    );
  }, [cardSet.cards]);

  useEffect(() => {
    pickChoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- this could cause some rerenders
  }, [cardSet, promptCard]);

  return (
    <div className="absolute flex h-72 w-full flex-col items-center gap-5">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">
            {direction === "forwards"
              ? promptCard?.front.heading
              : promptCard?.back.heading ?? "Loading..."}
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <RadioGroup onValueChange={setValue} value={value}>
            {choices.map((choice, index) => (
              <div
                className="flex items-center space-x-2"
                key={JSON.stringify(choice)}
              >
                <RadioGroupItem
                  id={JSON.stringify(choice)}
                  value={index.toString()}
                />
                <Label htmlFor={JSON.stringify(choice)}>{choice.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={nextQuestion} variant="outline">
            Skip
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  function handleSubmit(): void {
    if (choices[Number(value)]?.correct) {
      toast.success("Correct! Nice job!");
      nextQuestion();
    } else {
      toast.error("Not quite! Try again.");
    }
  }

  function nextQuestion(): void {
    setValue("");
    setChoices([]);
    // setDirection(direction === "forwards" ? "backwards" : "forwards");
    // setPromptCard(
    //   cardSet.cards[Math.floor(Math.random() * cardSet.cards.length)],
    // );
    pickChoices();
  }

  function pickChoices(): void {
    const newPromptCard =
      cardSet.cards[Math.floor(Math.random() * cardSet.cards.length)];
    const newDirection = direction === "forwards" ? "backwards" : "forwards";
    const newChoices: { name: string; correct: boolean }[] = [];
    const newCorrectNumber = Math.floor(Math.random() * numberOfAnswers);

    if (cardSet.cards.length <= numberOfAnswers) {
      setChoices([]);
      toast.error("Not enough cards to play multiple choice");
      return;
    }

    for (let i = 0; i < numberOfAnswers; i++) {
      if (i === newCorrectNumber) {
        newChoices.push(
          newDirection === "forwards"
            ? {
                name: newPromptCard?.back.heading ?? "Loading...",
                correct: true,
              }
            : {
                name: newPromptCard?.front.heading ?? "Loading...",
                correct: true,
              },
        );
      } else {
        let proposedCard: { name: string; correct: false } = {
          name:
            cardSet.cards[Math.floor(Math.random() * cardSet.cards.length)]?.[
              newDirection === "backwards" ? "front" : "back"
            ].heading || "",
          correct: false,
        };
        while (
          newChoices.map((choice) => choice.name).includes(proposedCard.name) ||
          proposedCard.name === newPromptCard?.front.heading ||
          proposedCard.name === newPromptCard?.back.heading
        ) {
          proposedCard = {
            name:
              cardSet.cards[Math.floor(Math.random() * cardSet.cards.length)]?.[
                newDirection === "backwards" ? "front" : "back"
              ].heading || "",
            correct: false,
          };
        }
        newChoices.push(proposedCard);
      }
    }
    setDirection(newDirection);
    setPromptCard(newPromptCard);
    setChoices(newChoices);
  }
}
