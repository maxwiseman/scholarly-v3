"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { api } from "@/trpc/react";
import { Input } from "@/app/_components/ui/input";
import { type Quiz } from "@/server/api/routers/canvas/get-quiz";
import { cn, queryOpts } from "@/lib/utils";
import { type QuizSubmission } from "@/server/api/routers/canvas/create-quiz-submission";
import { QuizQuestion } from "@/server/api/routers/canvas/get-quiz-questions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Label } from "@/app/_components/ui/label";
import { Separator } from "@/app/_components/ui/separator";
import { TipTap } from "@/app/_components/ui/tiptap";
import { Checkbox } from "@/app/_components/ui/checkbox";

export function Take({
  quiz,
  params,
}: {
  quiz: Quiz;
  params: { classId: string; quizId: string };
}): React.ReactElement {
  const [isActive, setIsActive] = useState(false);
  // const [currentAnswers, setCurrentAnswers] = useState([]);
  const [accessCode, setAccessCode] = useState("");

  const quizSubmission = api.canvas.createQuizSubmission.useMutation();
  const quizSubmissions = api.canvas.getQuizSubmissions.useQuery(
    params,
    queryOpts,
  );

  return (
    <>
      {isActive && quizSubmission.data ? (
        <QuizTaker quizSubmission={quizSubmission.data} />
      ) : (
        <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                // disabled={
                //   quiz.allowed_attempts !== 0 &&
                //   quizSubmissions.data?.length !== undefined &&
                //   quizSubmissions.data.length >= quiz.allowed_attempts
                // }
                loading={!quizSubmissions.isFetched}
              >
                Take Quiz
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you ready?</AlertDialogTitle>
                <AlertDialogDescription>
                  Once you start a quiz, your teacher can see how long you take,
                  when you pause the quiz, and when you submit it.
                </AlertDialogDescription>
                {quiz.has_access_code ? (
                  <Input
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                    }}
                    placeholder="Access code..."
                    value={accessCode}
                  />
                ) : null}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Please, no</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setIsActive(true);
                    quizSubmission.mutate(params);
                  }}
                >
                  Yes, I got this
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
}

function QuizTaker({
  quizSubmission,
}: {
  quizSubmission: QuizSubmission;
}): React.ReactElement {
  const quizQuestions = api.canvas.getQuizQuestions.useQuery({
    submissionId: quizSubmission.id.toString() || "",
  });
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {quizQuestions.data?.map((question) => {
        return <QuizQuestion key={question.id} question={question} />;
      })}
    </div>
  );
}

function QuizQuestion({
  question,
}: {
  question: QuizQuestion;
}): React.ReactElement {
  if (question.question_type === "text_only_question")
    return <Separator className="col-span-1 md:col-span-2 xl:col-span-3" />;

  return (
    <Card
      className={cn("flex h-full flex-col overflow-x-scroll", {
        "col-span-1 md:col-span-2 xl:col-span-3":
          question.question_type === "essay_question",
      })}
    >
      <CardHeader>
        <CardTitle>{question.question_name}</CardTitle>
      </CardHeader>
      <CardContent className="h-full grow">
        <div
          className="typography"
          dangerouslySetInnerHTML={{ __html: question.question_text }}
        />
      </CardContent>
      <CardFooter>
        <QuizQuestionAnswers question={question} />
      </CardFooter>
    </Card>
  );
}

function QuizQuestionAnswers({
  question,
}: {
  question: QuizQuestion;
}): React.ReactElement {
  const [answer, setAnswer] = useState<string>();

  if (question.question_type === "short_answer_question")
    return (
      <Input
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        placeholder="Type your answer here..."
        value={answer}
      />
    );
  if (question.question_type === "multiple_choice_question")
    return (
      <RadioGroup>
        {question.answers.map((questionAnswer) => {
          return (
            <div
              className="flex items-center space-x-2"
              key={questionAnswer.id}
            >
              <RadioGroupItem
                id={`answer_${questionAnswer.id}`}
                value={questionAnswer.id.toString()}
              />
              <Label
                dangerouslySetInnerHTML={{
                  __html:
                    questionAnswer.html !== ""
                      ? questionAnswer.html
                      : questionAnswer.text,
                }}
                htmlFor={`answer_${questionAnswer.id}`}
              />
            </div>
          );
        })}
      </RadioGroup>
    );
  if (question.question_type === "true_false_question")
    return (
      <RadioGroup>
        {question.answers.map((QuestionAnswer) => {
          return (
            <div
              className="flex items-center space-x-2"
              key={QuestionAnswer.id}
            >
              <RadioGroupItem
                id={`answer_${QuestionAnswer.id}`}
                value={QuestionAnswer.id.toString()}
              />
              <Label htmlFor={`answer_${QuestionAnswer.id}`}>
                {QuestionAnswer.text}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    );
  if (question.question_type === "essay_question")
    return (
      <TipTap
        className="w-full"
        content={answer}
        onUpdate={(val) => {
          setAnswer(val.editor.getHTML());
        }}
      />
    );
  if (question.question_type === "numerical_question")
    return (
      <Input
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        placeholder="Type your answer here..."
        type="number"
        value={answer}
      />
    );
  if (question.question_type === "calculated_question")
    return (
      <Input
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        placeholder="Type your answer here..."
        type="number"
        value={answer}
      />
    );
  if (question.question_type === "multiple_answers_question") {
    return (
      <div className="flex flex-col gap-2">
        {question.answers.map((questionAnswer) => {
          return (
            <div
              className="flex items-center space-x-2"
              key={questionAnswer.id}
            >
              <Checkbox id={`answer_${questionAnswer.id}`} />
              <Label htmlFor={`answer_${questionAnswer.id}`}>
                {questionAnswer.text}
              </Label>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="text-muted-foreground">
      Submission type could not be loaded
    </div>
  );
}
