"use client";

import { IconMessage, IconNotebook, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../_components/ui/button";
import { Kbd } from "../_components/ui/kbd";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../_components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../_components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { Input } from "../_components/ui/input";
import { Textarea } from "../_components/ui/textarea";
import { api } from "@/trpc/react";

export function Search(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const classes = api.user.getClasses.useQuery();
  const router = useRouter();
  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <>
      <Button
        className="relative flex w-48 justify-start text-muted-foreground"
        icon={<IconSearch className="h-4 w-4" />}
        onClick={() => {
          setOpen(true);
        }}
        variant="outline"
      >
        <span className="w-max">Search...</span>
        <Kbd className="absolute right-2">
          <span className="text-xs">⌘</span>K
        </Kbd>
      </Button>
      <CommandDialog
        onOpenChange={(val) => {
          setOpen(val);
        }}
        open={open}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Classes">
            {classes.data?.map((course) => {
              return (
                <CommandItem
                  key={course.id}
                  onSelect={() => {
                    router.push(`/classes/${course.id}`);
                    setOpen(false);
                  }}
                >
                  <IconNotebook className="mr-2 h-4 w-4" />
                  {course.name}
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandGroup heading="Misc">
            <Feedback />
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function Feedback(): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      onOpenChange={(val) => {
        setOpen(val);
      }}
      open={open}
    >
      <CommandItem
        onSelect={() => {
          setOpen(true);
        }}
      >
        <IconMessage className="mr-2 h-4 w-4" />
        Feedback
      </CommandItem>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>Found a problem? Let us know.</DialogDescription>
        </DialogHeader>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pick something..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bug">Bug</SelectItem>
            <SelectItem value="feature">Feature request</SelectItem>
            <SelectItem value="question">Question</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Type something..." />
        <Textarea placeholder="Type something..." />
        <DialogFooter>
          <Button
            onClick={() => {
              toast.promise(
                async () => {
                  console.log("Submitting");
                },
                {
                  loading: "Submitting...",
                  success: "Submitted!",
                  error: "Failed to submit.",
                  description: "Thanks, we'll look into that.",
                },
              );
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
