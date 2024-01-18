"use client";

import { useState } from "react";
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
import { queryOpts } from "@/lib/utils";

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
  const quizQuestions = api.canvas.getQuizQuestions.useQuery({
    submissionId: quizSubmission.data?.id.toString() || "",
  });

  return (
    <>
      {isActive ?
        <>
          <h1>Quiz</h1>
          {quizQuestions.data?.map((question) => {
            return JSON.stringify(question);
          })}
        </>
      : <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={
                  quiz.allowed_attempts !== 0 &&
                  quizSubmissions.data?.length !== undefined &&
                  quizSubmissions.data.length >= quiz.allowed_attempts
                }
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
                {quiz.has_access_code ?
                  <Input
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                    }}
                    placeholder="Access code..."
                    value={accessCode}
                  />
                : null}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Please, no</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setIsActive(true);
                    quizSubmission.mutate(params);
                    quizQuestions.refetch().catch(() => {
                      console.error("Something went wrong!");
                    });
                  }}
                >
                  Yes, I got this
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      }
    </>
  );
}
