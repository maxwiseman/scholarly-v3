"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

export function Options({
  setInfo,
}: {
  setInfo: string[];
}): React.ReactElement {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <IconDotsVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>View as...</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
              checked={Boolean(
                setInfo[1] !== "stack" &&
                  setInfo[1] !== "quiz" &&
                  setInfo[1] !== "multiple_choice",
              )}
              onClick={() => {
                router.push(`/study/sets/${setInfo[0]}/grid`);
              }}
            >
              Grid
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={Boolean(setInfo[1] === "stack")}
              onClick={() => {
                router.push(`/study/sets/${setInfo[0]}/stack`);
              }}
            >
              Stack
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={Boolean(setInfo[1] === "quiz")}
              onClick={() => {
                router.push(`/study/sets/${setInfo[0]}/quiz`);
              }}
            >
              Quiz
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={Boolean(setInfo[1] === "multiple_choice")}
              onClick={() => {
                router.push(`/study/sets/${setInfo[0]}/multiple_choice`);
              }}
            >
              Multiple Choice
            </DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem disabled>Edit set</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
