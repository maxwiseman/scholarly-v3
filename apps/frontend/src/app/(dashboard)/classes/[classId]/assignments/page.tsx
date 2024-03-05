"use client";

import { useState } from "react";
import { IconRefresh } from "@tabler/icons-react";
import { api } from "@/trpc/react";
import { Button, LinkButton } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { queryOpts } from "@/lib/utils";

export default function Page({
  params,
}: {
  params: { classId: string };
}): React.ReactElement {
  const assignmentData = api.canvas.getAssignments.useQuery(
    { classId: params.classId },
    queryOpts,
  );
  const [searchString, setSearchString] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Input
          className="max-w-sm"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          placeholder="Search..."
          value={searchString}
        />
        <Button
          icon={<IconRefresh />}
          loading={
            assignmentData.isFetching ||
            assignmentData.isRefetching ||
            assignmentData.isLoading
          }
          onClick={async () => {
            await assignmentData.refetch();
          }}
          size="icon"
          variant="outline"
        />
      </div>
      <div className="flex flex-col gap-1">
        {assignmentData.data?.map((assignment) => {
          if (
            !assignment.name.toUpperCase().includes(searchString.toUpperCase())
          ) {
            return null;
          }
          return (
            <LinkButton
              className="flex flex-row justify-start gap-2 !px-2"
              href={`/classes/${params.classId}/assignments/${assignment.id}`}
              key={assignment.id}
              variant="ghost"
            >
              {assignment.name}
            </LinkButton>
          );
        })}
      </div>
    </div>
  );
}
