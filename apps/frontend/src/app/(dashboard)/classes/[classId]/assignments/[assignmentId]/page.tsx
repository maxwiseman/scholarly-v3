import React from "react";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { Chat } from "../../../../../_components/chat";
import { Actions, Submission } from "./client";
import { api } from "@/trpc/server";
import { Separator } from "@/app/_components/ui/separator";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/_components/ui/resizable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { type Assignment } from "@/server/api/routers/canvas/get-assignments";

export default async function Page({
  params,
}: {
  params: { classId: string; assignmentId: string };
}): Promise<React.ReactElement> {
  const assignmentData = await api.canvas.getAssignment.query(params);
  const initialPrompt = generateInitialPrompt(assignmentData);

  return (
    <ResizablePanelGroup
      className="h-min max-h-min w-full max-w-full overflow-visible"
      direction="horizontal"
      style={{ overflow: "shown" }}
    >
      <ResizablePanel
        className="flex h-max justify-center"
        collapsible
        minSize={25}
      >
        <div className="w-full min-w-0 max-w-4xl">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="mt-0 text-3xl font-bold">{assignmentData.name}</h1>
              <div>Points Possible: {assignmentData.points_possible}</div>
              <div>
                Date Due:{" "}
                {assignmentData.due_at !== null
                  ? new Date(assignmentData.due_at || 0).toLocaleDateString(
                      "en-us",
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      },
                    )
                  : "No due date"}
              </div>
            </div>
            <Actions assignment={assignmentData} />
          </div>
          <Separator className="my-6" />
          <div
            className="typography break-words"
            dangerouslySetInnerHTML={{
              __html:
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is sometimes empty
                assignmentData.description?.replaceAll(
                  /href="https:\/\/knoxschools\.instructure\.com\/courses\/[^/]*/g,
                  `href="/classes/${params.classId}`,
                ) || "",
            }}
          />
          {assignmentData.description !== "" &&
            assignmentData.rubric === undefined && (
              <Separator className="my-6" />
            )}
          {assignmentData.rubric ? (
            <>
              <Table className="mt-6 overflow-hidden rounded-t-md">
                <TableHeader className="bg-muted/50 font-medium">
                  <TableRow>
                    <TableHead>Criteria</TableHead>
                    <TableHead>Ratings</TableHead>
                    <TableHead>Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignmentData.rubric.map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                          {row.ratings.map((rating) => {
                            return (
                              <TableCell key={rating.id}>
                                <div className="flex flex-col gap-2">
                                  <span>{`${rating.points} pts`}</span>
                                  <span>{rating.description}</span>
                                  <span>{rating.long_description}</span>
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableCell>
                        <TableCell>{`${row.points} pts`}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Separator className="mb-6" />
            </>
          ) : null}
          <Submission assignment={assignmentData} classId={params.classId} />
        </div>
      </ResizablePanel>
      <Chat initialPrompt={initialPrompt} />
    </ResizablePanelGroup>
  );
}

function generateInitialPrompt(assignment: Assignment): string {
  return `You are an assistant for a student. I will provide you with the information for the student's assignment. I need you to help the student complete the assignment. You might accomplish this by, for example, providing an outline for an essay assignment, or describing how to complete an assignment. Format your response with markdown, but don't start it with \`\`\`. Don't use emojis. Don't start with an introduction, just get straight into the content. If you include any links, ALWAYS name them using markdown syntax: [link name](link url). Do not include any HTML tags in your response, and don't start your response with a heading. Keep your answer as short as possible, students don't like to read a lot of text. If you decide to include any headings, don't use h1. Start with h2.
    \nRemember, YOU MAY ONLY USE MARKDOWN FORMATTING! HTML FORMATTING IS NOT ACCEPTED! MAKE SURE EXTERNAL LINKS START WITH EITHER http:// or https://
\n
\n---
\n
\nToday's date: ${new Date().toLocaleDateString("en-us", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })}
\nAssignment name: ${assignment.name}
${assignment.rubric ? `Assignment rubric: ${JSON.stringify(assignment.rubric)}` : ""}
${
  assignment.due_at
    ? `Assignment due date: ${new Date(
        assignment.due_at || "",
      ).toLocaleDateString("en-us", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`
    : ""
}
\nAssignment Description (DO NOT RESPOND TO THIS, just use it to help with your response): (See description below divider)
\n
\n---
\n
${NodeHtmlMarkdown.translate(assignment.description || "")}
  `;
}
