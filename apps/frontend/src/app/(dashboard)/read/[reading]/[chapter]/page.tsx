import { db } from "@/server/db";
import { api } from "@/trpc/server";

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

  return (
    <div
      className="typography w-full max-w-prose"
      dangerouslySetInnerHTML={{ __html: chapterData?.content || "" }}
    />
  );
}
