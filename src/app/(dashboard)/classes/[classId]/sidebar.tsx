"use client";

import { LinkButton } from "@/app/_components/ui/button";
import { usePathname } from "next/navigation";

export function Sidebar({ classId }: { classId: string }): React.ReactNode {
  const pathName = usePathname();
  console.log("pathname", pathName);

  return (
    <div className="sticky top-20 flex w-48 flex-col gap-2">
      <LinkButton
        href={`/classes/${classId}`}
        className="justify-start"
        variant={pathName == `/classes/${classId}` ? "secondary" : "ghost"}
      >
        Overview
      </LinkButton>
      <LinkButton
        href={`/classes/${classId}/assignments`}
        disabled
        className="justify-start"
        variant={
          pathName.startsWith(`/classes/${classId}/assignments`)
            ? "secondary"
            : "ghost"
        }
      >
        Assignments
      </LinkButton>
      <LinkButton
        href={`/classes/${classId}/grades`}
        className="justify-start"
        variant={
          pathName.startsWith(`/classes/${classId}/grades`)
            ? "secondary"
            : "ghost"
        }
      >
        Grades
      </LinkButton>
      <LinkButton
        href={`/classes/${classId}/quizzes`}
        disabled
        className="justify-start"
        variant={
          pathName.startsWith(`/classes/${classId}/quizzes`)
            ? "secondary"
            : "ghost"
        }
      >
        Quizzes
      </LinkButton>
      <LinkButton
        href={`/classes/${classId}/discussions`}
        disabled
        className="justify-start"
        variant={
          pathName.startsWith(`/classes/${classId}/discussions`)
            ? "secondary"
            : "ghost"
        }
      >
        Discussions
      </LinkButton>
    </div>
  );
}
