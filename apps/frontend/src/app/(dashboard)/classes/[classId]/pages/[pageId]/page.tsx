import { Actions } from "./client";
import { api } from "@/trpc/server";
import { Separator } from "@/app/_components/ui/separator";

export default async function Page({
  params,
}: {
  params: { classId: string; pageId: string };
}): Promise<React.ReactElement> {
  const pageData = await api.canvas.getPage.query(params);

  if (!pageData.body) {
    console.log(pageData);
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="mt-0 text-3xl font-bold">{pageData.title}</h1>
          </div>
          <Actions page={pageData} />
        </div>
        <Separator className="my-6" />
        <div
          className="typography"
          dangerouslySetInnerHTML={{
            __html:
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Sometimes this is empty
              pageData.body?.replaceAll(
                /href="https:\/\/knoxschools\.instructure\.com\/courses\/[^/]*/g,
                `href="/classes/${params.classId}`,
              ) || "",
          }}
        />
      </div>
    </div>
  );
}
