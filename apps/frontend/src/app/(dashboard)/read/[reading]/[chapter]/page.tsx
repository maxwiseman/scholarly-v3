import { api } from "@/trpc/server";

export async function generateStaticParams(): Promise<
  { reading: string; chapter: string }[]
> {
  const params = [];
  for (let i = 1; i <= 42; i++) {
    params.push({ reading: "apush", chapter: `ch_${i.toString()}` });
  }

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
