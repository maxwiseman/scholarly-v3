import { CircularProgress } from "@nextui-org/react";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
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
import { Label } from "@/app/_components/ui/label";
import { api } from "@/trpc/react";

export function ClassCard({
  classData,
  onUpdate,
}: {
  classData: CourseData;
  onUpdate?: () => void;
}): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(classData.name || "");
  const updateName = api.user.updateClasses.useMutation();

  return (
    <Dialog
      onOpenChange={(val) => {
        setOpen(val);
      }}
      open={open}
    >
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
                {process.env.NODE_ENV === "development" ? (
                  <CircularProgress
                    classNames={{
                      indicator: "stroke-success",
                      value: "text-xs text-[0.6rem]",
                    }}
                    showValueLabel
                    value={100}
                  />
                ) : null}
                {process.env.NODE_ENV !== "development" &&
                classData.gradeAverage ? (
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
              <CardContent className="min-h-[84px] pb-3 text-muted-foreground">
                <span className="line-clamp-1">
                  {classData.teachers?.join(", ")}
                  <br />
                </span>
                <span className="line-clamp-1">
                  {classData.teacherEmail} <br />
                </span>
                <span className="line-clamp-1">
                  {classData.term && classData.schedule
                    ? `${classData.term} - ${classData.schedule}`
                    : ""}{" "}
                  <br />
                </span>
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
        <Label>Class Name</Label>
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Type something..."
          value={name}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              toast.promise(
                async () => {
                  await updateName.mutateAsync([{ id: classData.id, name }]);
                  if (onUpdate) onUpdate();
                  setOpen(false);
                },
                {
                  loading: "Saving...",
                  success: "Saved!",
                  error: "Failed to save.",
                },
              );
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
