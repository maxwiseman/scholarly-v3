"use client";

import {
  IconApple,
  IconFeather,
  IconLetterA,
  IconLetterB,
  IconLetterE,
  IconLetterG,
  IconLetterK,
  IconLetterQ,
  IconMessage,
  IconNotebook,
  IconSchool,
  IconSearch,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "../_components/ui/responsive-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { Input } from "../_components/ui/input";
import { Textarea } from "../_components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { api } from "@/trpc/react";
import { cn, queryOpts } from "@/lib/utils";
import { sendDiscordLog } from "@/lib/server-utils";

export function Search({
  className,
}: {
  className?: string;
}): React.ReactElement {
  const [open, setOpen] = useState(false);
  const classes = api.user.getClasses.useQuery(undefined, queryOpts);
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
        className={cn(
          "relative flex w-48 justify-start text-muted-foreground",
          className,
        )}
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
          <CommandGroup heading="Quick Links">
            <CommandItem
              onSelect={() => {
                window.open(`https://joinpd.com`);
                setOpen(false);
              }}
            >
              <IconApple className="mr-2 h-4 w-4" />
              Pear Deck
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(`https://app.edulastic.com`);
                setOpen(false);
              }}
            >
              <IconLetterE className="mr-2 h-4 w-4" />
              Pear Assessment (Edulastic)
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(
                  `https://apclassroom.collegeboard.org/33/assignments?status=assigned`,
                );
                setOpen(false);
              }}
            >
              <IconLetterA className="mr-2 h-4 w-4" />
              AP Classroom
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(`https://kahoot.it`);
                setOpen(false);
              }}
            >
              <IconLetterK className="mr-2 h-4 w-4" />
              Kahoot!
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(`https://blooket.com/play`);
                setOpen(false);
              }}
            >
              <IconLetterB className="mr-2 h-4 w-4" />
              Blooket
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(`https://gimkit.com/join`);
                setOpen(false);
              }}
            >
              <IconLetterG className="mr-2 h-4 w-4" />
              Gimkit
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(`https://deltamath.com`);
                setOpen(false);
              }}
            >
              <IconSchool className="mr-2 h-4 w-4" />
              Deltamath
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(`https://quizlet.com`);
                setOpen(false);
              }}
            >
              <IconLetterQ className="mr-2 h-4 w-4" />
              Quizlet
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(`https://www.quill.org/classes`);
                setOpen(false);
              }}
            >
              <IconFeather className="mr-2 h-4 w-4" />
              Quill
            </CommandItem>
          </CommandGroup>
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

  const formSchema = z.object({
    type: z.enum(["bug", "feature", "question"]),
    title: z.string(),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <ResponsiveDialog
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
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Feedback</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Found a problem? Let us know.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((data) => {
              toast.promise(
                async () => {
                  await sendDiscordLog(
                    `# ${data.type.charAt(0).toUpperCase() + data.type.substring(1)}: ${data.title} \n ${data.description}`,
                  );
                  setOpen(false);
                },
                {
                  loading: "Submitting...",
                  success: "Submitted!",
                  error: "Failed to submit.",
                  description: "Thanks, we'll look into that.",
                },
              );
            })}
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick something..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="feature">Feature request</SelectItem>
                        <SelectItem value="question">Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Type something..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type something..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResponsiveDialogFooter>
              <Button type="submit">Submit</Button>
            </ResponsiveDialogFooter>
          </form>
        </Form>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
