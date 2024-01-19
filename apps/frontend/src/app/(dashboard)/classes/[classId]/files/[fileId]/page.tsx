import React from "react";
import { FilePreview } from "./client";
import { api } from "@/trpc/server";
import { Separator } from "@/app/_components/ui/separator";

export default async function Page({
  params,
}: {
  params: { classId: string; fileId: string };
}): Promise<React.ReactElement> {
  const fileData = await api.canvas.getFile.query(params);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="mt-0 text-3xl font-bold">{fileData.display_name}</h1>
            <div>Size: {fileData.size}</div>
          </div>
        </div>
        <Separator className="my-6" />
        <FilePreview documents={[{ uri: fileData.url }]} />
      </div>
    </div>
  );
}
