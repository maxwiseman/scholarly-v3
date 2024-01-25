"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { IconPlus } from "@tabler/icons-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { Input, PasswordInput } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import { Separator } from "../_components/ui/separator";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "../_components/ui/responsive-dialog";
import { api } from "@/trpc/react";

const formSchema = z.object({
  canvasApiKey: z.string().length(69, {
    message: "Tokens should be 69 characters (nice).",
  }),
  aspenUsername: z
    .string()
    .min(7, {
      message: "Username should be 7-8 characters.",
    })
    .max(8, { message: "Username should be 7-8 characters." }),
  aspenPassword: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function StepOne({
  onSubmit,
}: {
  onSubmit?: () => void;
}): React.ReactElement {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      canvasApiKey: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const updateSettings = api.user.updateSettings.useMutation();

  useEffect(() => {
    if (!updateSettings.isLoading) {
      setLoading(false);
      if (
        updateSettings.data?.aspenPassword === false &&
        !updateSettings.data.aspenUsername &&
        !updateSettings.data.canvasApiKey
      ) {
        if (onSubmit) onSubmit();
      }
      if (
        updateSettings.data?.aspenPassword ||
        updateSettings.data?.aspenUsername
      ) {
        form.setError("aspenUsername", {
          type: "custom",
          message: "Your Aspen credentials are incorrect",
        });
        form.setError("aspenPassword", {
          type: "custom",
          message: "Your Aspen credentials are incorrect",
        });
      }
      if (updateSettings.data?.canvasApiKey) {
        form.setError("canvasApiKey", {
          type: "custom",
          message: "Your API key was invalid",
        });
      }
    }
  }, [
    form,
    onSubmit,
    updateSettings.data?.aspenPassword,
    updateSettings.data?.aspenUsername,
    updateSettings.data?.canvasApiKey,
    updateSettings.isLoading,
  ]);
  return (
    <div className="flex w-full max-w-xl flex-col items-center">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
        Let&lsquo;s get you set up
      </h1>
      <Separator className="my-8 mt-4" />
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit((input) => {
            setLoading(true);
            updateSettings.mutate(input);
          })}
        >
          <ResponsiveDialog>
            <FormField
              control={form.control}
              name="canvasApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canvas Access Token</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="0910392403" {...field} />
                  </FormControl>
                  <ResponsiveDialogTrigger>
                    <FormDescription className="w-max cursor-pointer underline">
                      Click here for instructions on how to get your access
                      token
                    </FormDescription>
                  </ResponsiveDialogTrigger>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ResponsiveDialogContent>
              <ResponsiveDialogHeader>
                <ResponsiveDialogTitle>
                  Canvas Access Token Instructions
                </ResponsiveDialogTitle>
              </ResponsiveDialogHeader>
              <ol>
                <li>
                  1. Head to{" "}
                  <Link
                    className="underline"
                    href="https://knoxschools.instructure.com/login/saml"
                    target="_blank"
                  >
                    Canvas
                  </Link>{" "}
                  and log in
                </li>
                <li>2. Click your profile picture in the sidebar</li>
                <li>3. Click the Settings link</li>
                <li>
                  4. Scroll down, and click &ldquo;New Access Token&ldquo;
                  {/* <span style={ButtonStyle}>
                    <IconPlus />
                    New Access Token
                  </span> */}
                </li>
              </ol>
            </ResponsiveDialogContent>
          </ResponsiveDialog>
          <FormField
            control={form.control}
            name="aspenUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aspen Username</FormLabel>
                <FormControl>
                  <Input placeholder="s123456" {...field} />
                </FormControl>
                <FormDescription>
                  We will use this to get your grades from Aspen
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aspenPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aspen Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="mySecurePassword123" {...field} />
                </FormControl>
                <FormDescription>
                  We will use this to get your grades from Aspen
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="!mt-6 w-full"
            disabled={!form.formState.isValid}
            loading={loading}
            type="submit"
          >
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}

// const LinkStyle = {
//   BoxSizing: "border-box",
//   fontFamily:
//     'LatoWeb, "Lato Extended", Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
//   fontWeight: "400",
//   transition: "outline-color 0.2s ease 0s",
//   verticalAlign: "baseline",
//   outline: "transparent solid 0.125rem",
//   borderRadius: "0.125rem",
//   outlineOffset: "0.25rem",
//   cursor: "pointer",
//   color: "rgb(73, 128, 230)",
//   textDecoration: "none",
// };

// const ButtonStyle: {
//   background: "#33599f";
//   color: "#ffffff";
//   border: "1px solid";
//   borderColor: "#2C4C88";
//   borderRadius: "3px";
//   transition: "background-color .2s ease-in-out";
//   display: "inline-flex";
//   alignItems: "center";
//   justifyContent: "center";
//   gap: "0.5rem";
//   position: "relative";
//   padding: "8px 14px";
//   marginBottom: "0";
//   fontSize: "1rem";
//   lineHeight: "20px";
//   textAlign: "center";
//   verticalAlign: "middle";
//   cursor: "pointer";
//   textDecoration: "none";
//   overflow: "hidden";
//   textShadow: "none";
//   userSelect: "none";
// } = {
//   background: "#33599f",
//   color: "#ffffff",
//   border: "1px solid",
//   borderColor: "#2C4C88",
//   borderRadius: "3px",
//   transition: "background-color .2s ease-in-out",
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "0.5rem",
//   position: "relative",
//   padding: "8px 14px",
//   marginBottom: "0",
//   fontSize: "1rem",
//   lineHeight: "20px",
//   textAlign: "center",
//   verticalAlign: "middle",
//   cursor: "pointer",
//   textDecoration: "none",
//   overflow: "hidden",
//   textShadow: "none",
//   userSelect: "none",
// };
