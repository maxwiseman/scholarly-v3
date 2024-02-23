import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { LinkButton } from "@/app/_components/ui/button";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { ResizablePanel } from "@/app/_components/ui/resizable";
import { Chat } from "@/app/(dashboard)/classes/[classId]/assignments/[assignmentId]/chat";

export async function generateStaticParams(): Promise<
  { reading: string; chapter: string }[]
> {
  const data = await db.query.readings.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      slug: true,
    },
    with: {
      chapters: {
        columns: { slug: true, name: true },
      },
    },
  });
  const params: { reading: string; chapter: string }[] = [];
  data.forEach((reading) => {
    reading.chapters.forEach((chapter) => {
      params.push({ reading: reading.slug, chapter: chapter.slug });
    });
  });

  return params;
}
export default async function Page({
  params,
}: {
  params: { reading: string; chapter: string };
}): Promise<React.ReactElement> {
  const chapterData = await api.user.getChapter.query({ slug: params.chapter });
  const readData = await api.user.getRead.query({ slug: params.reading });

  return (
    <>
      <ResizablePanel
        className="flex max-w-full grow justify-center py-8"
        defaultSize={85}
      >
        <div className="flex flex-col gap-4">
          <div
            className="typography w-full max-w-prose"
            dangerouslySetInnerHTML={{ __html: chapterData?.content || "" }}
          />
          <div className="flex w-full justify-between">
            <Tooltip>
              <TooltipContent>
                {
                  readData?.chapters[
                    readData.chapters.findIndex(
                      (data) => data.slug === chapterData?.slug,
                    ) - 1
                  ]?.name
                }
              </TooltipContent>
              <TooltipTrigger asChild>
                <LinkButton
                  disabled={
                    readData?.chapters[
                      readData.chapters.findIndex(
                        (data) => data.slug === chapterData?.slug,
                      ) - 1
                    ]?.slug === undefined
                  }
                  href={`/read/${readData?.slug}/${
                    readData?.chapters[
                      readData.chapters.findIndex(
                        (data) => data.slug === chapterData?.slug,
                      ) - 1
                    ]?.slug || ""
                  }`}
                  variant="outline"
                >
                  <IconArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </LinkButton>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip>
              <TooltipContent>
                {
                  readData?.chapters[
                    readData.chapters.findIndex(
                      (data) => data.slug === chapterData?.slug,
                    ) + 1
                  ]?.name
                }
              </TooltipContent>
              <TooltipTrigger asChild>
                <LinkButton
                  disabled={
                    readData?.chapters[
                      readData.chapters.findIndex(
                        (data) => data.slug === chapterData?.slug,
                      ) + 1
                    ]?.slug === undefined
                  }
                  href={`/read/${readData?.slug}/${
                    readData?.chapters[
                      readData.chapters.findIndex(
                        (data) => data.slug === chapterData?.slug,
                      ) + 1
                    ]?.slug || ""
                  }`}
                  variant="outline"
                >
                  Next <IconArrowRight className="ml-2 h-4 w-4" />
                </LinkButton>
              </TooltipTrigger>
            </Tooltip>
          </div>
        </div>
      </ResizablePanel>
      <Chat
        //     initialPrompt={`You are a helpful AI assistant who is helping a student with their coursework. The student is currently reading something. Answer all of their questions in the context of what they're reading.
        //   \n The student is currently reading a reading called ${readData?.name}, and they're on the chapter called ${chapterData?.name}. This is the content of that chapter:
        //   \n ---
        //   \n ${NodeHtmlMarkdown.translate(chapterData?.content || "")}
        //  `}
        initialPrompt={`You're a helpful AI assistant. The user is currently reading the following content. Answer all questions in the context of this content. Feel free to use markdown formatting. Just make sure if you include any links, you name them using makdown syntax. \n---\n\n${NodeHtmlMarkdown.translate(chapterData?.content || "")}`.toString()}
      />
    </>
  );
}
