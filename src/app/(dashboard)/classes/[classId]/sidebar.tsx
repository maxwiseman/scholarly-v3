import { Button } from "@/app/_components/ui/button";

export function Sidebar(): React.ReactNode {
  return (
    <div className="flex w-48 flex-col gap-2">
      <Button className="justify-start" variant={"ghost"}>
        Assignments
      </Button>
      <Button className="justify-start" variant={"secondary"}>
        Grades
      </Button>
      <Button className="justify-start" variant={"ghost"}>
        Quizzes
      </Button>
      <Button className="justify-start" variant={"ghost"}>
        Discussions
      </Button>
    </div>
  );
}
