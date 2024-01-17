"use client";

import { usePathname } from "next/navigation";
import { LinkButton } from "@/app/_components/ui/button";

export function Sidebar({ classId }: { classId: string }): React.ReactNode {
  const pathName = usePathname();

  return (
    <div className="sticky top-[5.5rem] flex w-[15vw] min-w-[12rem] max-w-xs flex-col gap-2">
      <LinkButton
        className="justify-start"
        href={`/classes/${classId}`}
        variant={pathName === `/classes/${classId}` ? "secondary" : "ghost"}
      >
        Overview
      </LinkButton>
      <LinkButton
        className="justify-start"
        href={`/classes/${classId}/modules`}
        variant={
          pathName.startsWith(`/classes/${classId}/modules`)
            ? "secondary"
            : "ghost"
        }
      >
        Modules
      </LinkButton>
      <LinkButton
        className="justify-start"
        href={`/classes/${classId}/assignments`}
        variant={
          pathName.startsWith(`/classes/${classId}/assignments`)
            ? "secondary"
            : "ghost"
        }
      >
        Assignments
      </LinkButton>
      <LinkButton
        className="justify-start"
        href={`/classes/${classId}/grades`}
        variant={
          pathName.startsWith(`/classes/${classId}/grades`)
            ? "secondary"
            : "ghost"
        }
      >
        Grades
      </LinkButton>
      <LinkButton
        className="justify-start"
        href={`/classes/${classId}/quizzes`}
        variant={
          pathName.startsWith(`/classes/${classId}/quizzes`)
            ? "secondary"
            : "ghost"
        }
      >
        Quizzes
      </LinkButton>
      <LinkButton
        className="justify-start"
        href={`/classes/${classId}/discussions`}
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
