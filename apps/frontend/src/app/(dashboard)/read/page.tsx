"use client";

import Link from "next/link";
import { MenuCard } from "./menu-card";
import { Separator } from "@/app/_components/ui/separator";
import { queryOpts } from "@/lib/utils";
import { api } from "@/trpc/react";

export default function Page(): React.ReactElement {
  const readsData = api.user.getReads.useQuery(undefined, queryOpts);

  return (
    <div className="p-8 py-10">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Readings
      </h1>
      <Separator className="my-4 mb-8" />
      {readsData.data?.map((reading) => {
        return (
          <Link
            href={`/read/${reading.slug}/${reading.chapters[0]?.slug}`}
            key={reading.id}
          >
            <MenuCard reading={reading} />
          </Link>
        );
      })}
    </div>
  );
}
