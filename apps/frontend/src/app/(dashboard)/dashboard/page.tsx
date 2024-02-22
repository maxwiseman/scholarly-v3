"use client";

import { ClassCard } from "./class-card";
import { LinkButton } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { queryOpts } from "@/lib/utils";
import { api } from "@/trpc/react";

export default function Page(): React.ReactElement {
  const classFetcher = api.user.getClasses.useQuery(undefined, queryOpts);

  if (classFetcher.isFetched && classFetcher.data?.length === 0) {
    return (
      <div className="p-8 py-10">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Dashboard
        </h1>
        <Separator className="my-4 mb-8" />
        <div className="flex h-full w-full flex-col items-center justify-center py-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-xl text-muted-foreground">No classes found!</h2>
            <LinkButton href="/onboarding" variant="secondary">
              Add your classes
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 py-10">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Dashboard
      </h1>
      <Separator className="my-4 mb-8" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classFetcher.data?.map((classData) => {
          return (
            <ClassCard
              classData={{
                ...classData,
              }}
              key={classData.id}
              onUpdate={async () => {
                await classFetcher.refetch();
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
