"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
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
import { api } from "@/trpc/react";

const formSchema = z.object({
  canvasApiKey: z.string().length(69, {
    message: "API keys should by 69 characters (nice).",
  }),
  aspenUsername: z.string().min(7, {
    message: "Username should be 7 characters",
  }),
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
  const [enabled, setEnabled] = useState(false);
  const updateSettings = api.user.updateSettings.useMutation({});

  const canvasData = api.canvas.getClasses.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled,
  });
  const aspenData = api.aspen.getClasses.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled,
  });

  useEffect(() => {
    if (
      !updateSettings.isLoading &&
      !aspenData.isLoading &&
      !canvasData.isLoading
    ) {
      setLoading(false);
      if (
        !aspenData.isError &&
        !canvasData.isError &&
        aspenData.isFetched &&
        canvasData.isFetched
      ) {
        if (onSubmit) onSubmit();
      }
      if (aspenData.isError) {
        form.setError("aspenUsername", {
          type: "custom",
          message: "Your Aspen credentials are incorrect",
        });
        form.setError("aspenPassword", {
          type: "custom",
          message: "Your Aspen credentials are incorrect",
        });
      }
      if (canvasData.isError) {
        form.setError("canvasApiKey", {
          type: "custom",
          message: "Your API key is invalid",
        });
      }
    }
  }, [
    aspenData.isError,
    aspenData.isFetched,
    aspenData.isLoading,
    canvasData.isError,
    canvasData.isFetched,
    canvasData.isLoading,
    form,
    onSubmit,
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
            setEnabled(true);
            aspenData.refetch().catch(() => {
              console.error("Incorrect Aspen info");
            });
            canvasData.refetch().catch(() => {
              console.error("Incorrect Canvas info");
            });
          })}
        >
          <FormField
            control={form.control}
            name="canvasApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canvas API Key</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="0910392403" {...field} />
                </FormControl>
                <FormDescription>
                  You can generate this in your Canvas settings
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
