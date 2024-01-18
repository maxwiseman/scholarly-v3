import { CircularProgress } from "@nextui-org/react";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/_components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { type CourseData } from "@/server/api/routers/user/get-classes";

export function ClassCard({
  classData,
}: {
  classData: CourseData;
}): React.ReactElement {
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link
            className="rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            href={`/classes/${classData.id}`}
          >
            <Card className="shadow-sm">
              <CardHeader className="flex h-[3.25rem] flex-row items-center justify-between gap-2 space-y-0 py-3 pb-0">
                {/* <Avatar className="h-7 w-7">
                <AvatarFallback>
                  <IconUser />
                </AvatarFallback>
              </Avatar> */}
                <CardTitle className="mt-0 line-clamp-1 text-xl font-semibold">
                  {classData.name}
                </CardTitle>
                {classData.gradeAverage ? (
                  <CircularProgress
                    aria-label="Current term grade"
                    classNames={{
                      indicator:
                        // eslint-disable-next-line no-nested-ternary -- This isn't that confusing
                        classData.gradeAverage > 85
                          ? "stroke-success"
                          : classData.gradeAverage > 70
                            ? "stroke-warning"
                            : "stroke-error",
                      value: "text-xs text-[0.6rem]",
                    }}
                    color="warning"
                    showValueLabel
                    value={classData.gradeAverage}
                  />
                ) : null}
              </CardHeader>
              {/* <Separator className="my-2" /> */}
              <CardContent className="pb-3 text-muted-foreground">
                Content here <br />
                Content here <br />
                Content here <br />
              </CardContent>
            </Card>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <DialogTrigger asChild>
            <ContextMenuItem>
              <IconPencil className="mr-2 h-4 w-4" /> Edit class
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit class</DialogTitle>
          <DialogDescription>
            Make changes to the class here. Click save when you&lsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <Input />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
