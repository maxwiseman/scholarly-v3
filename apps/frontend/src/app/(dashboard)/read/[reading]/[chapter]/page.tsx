import { promises as fs } from "node:fs";

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
