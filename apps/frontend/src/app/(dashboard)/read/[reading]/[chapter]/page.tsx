import { promises as fs } from "node:fs";

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
  const file = await fs.readFile(
    `${process.cwd()}/src/app/(dashboard)/read/content/${params.reading}/${params.chapter}.html`,
    "utf8",
  );

  return (
    <div className="flex w-full justify-center py-20">
      <div
        className="typography max-w-prose"
        dangerouslySetInnerHTML={{ __html: file }}
      />
    </div>
  );
}
