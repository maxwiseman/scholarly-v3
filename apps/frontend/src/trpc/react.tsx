/* eslint-disable react/hook-use-state -- It's ok */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpLink,
  loggerLink,
  splitLink,
  // eslint-disable-next-line camelcase -- Nothing I can do about that really
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import { getUrl, transformer } from "./shared";
import { type AppRouter } from "@/server/api/root";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  cookies: string;
}): React.ReactElement {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        splitLink({
          condition(op) {
            // check for context property `skipBatch`
            return op.path.startsWith("aspen");
          },
          // when condition is true, use normal request
          true: httpLink({
            url: getUrl(),
            headers() {
              return {
                cookie: props.cookies,
                "x-trpc-source": "react",
              };
            },
          }),
          // when condition is false, use batching
          false: unstable_httpBatchStreamLink({
            url: getUrl(),
            headers() {
              return {
                cookie: props.cookies,
                "x-trpc-source": "react",
              };
            },
          }),
        }),
        // unstable_httpBatchStreamLink({
        //   url: getUrl(),
        //   headers() {
        //     return {
        //       cookie: props.cookies,
        //       "x-trpc-source": "react",
        //     };
        //   },
        // }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
