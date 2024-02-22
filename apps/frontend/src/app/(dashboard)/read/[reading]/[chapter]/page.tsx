import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { LinkButton } from "@/app/_components/ui/button";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

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
          <TooltipTrigger>
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
          <TooltipTrigger>
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
  );
}
