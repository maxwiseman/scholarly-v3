import React from "react";
// import { Take } from "./take";
import { api } from "@/trpc/server";
import { Separator } from "@/app/_components/ui/separator";
import { LinkButton } from "@/app/_components/ui/button";

export default async function Page({
  params,
}: {
  params: { classId: string; quizId: string };
}): Promise<React.ReactElement> {
  const quizData = await api.canvas.getQuiz.query(params);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full">
        <div className="flex flex-col gap-2">
          <h1 className="mt-0 text-3xl font-bold">{quizData.title}</h1>
          <div>Points Possible: {quizData.points_possible}</div>
          <div>
            Date Due:{" "}
            {new Date(quizData.due_at || 0).toLocaleDateString("en-us", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div>
            Allowed Attempts: {}
            {quizData.allowed_attempts === 0 ? "∞" : quizData.allowed_attempts}
          </div>
        </div>
        <Separator className="my-4" />
        <div
          className="typography"
          dangerouslySetInnerHTML={{
            __html:
              quizData.description.replaceAll(
                /href="https:\/\/knoxschools\.instructure\.com\/courses\/[^/]*/g,
                `href="/classes/${params.classId}`,
              ) || "",
          }}
        />
        {quizData.description !== "" && <Separator className="my-4" />}
        {/* <Take params={params} quiz={quizData} /> */}
        <div className="flex justify-center">
          <LinkButton
            href={`${quizData.html_url}#:~:text=Take%20the%20Quiz`}
            target="_blank"
          >
            Take Quiz
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
