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
            <div>Size: {formatBytes(fileData.size)}</div>
          </div>
        </div>
        <Separator className="my-6" />
        <FilePreview url={fileData.previewUrl} />
      </div>
    </div>
  );
}

// Courtesy of Stack Overflow Community Wiki: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes: string | number, decimals = 2): string {
  if (!Number(bytes)) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(Number(bytes)) / Math.log(k));

  return `${parseFloat((Number(bytes) / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
