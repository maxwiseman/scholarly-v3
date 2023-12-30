import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ServerSessionProvider } from "./_components/server-session-provider";
import { ThemeProvider } from "./_components/theme-provider";
import { NextUIClientProvider } from "./_components/next-ui-provider";
import { getServerAuthSession } from "@/server/auth";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Scholarly",
  description: "Aspen + Canvas = 😃",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <head />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <ServerSessionProvider session={session}>
            <TRPCReactProvider cookies={cookies().toString()}>
              <NextUIClientProvider>{children}</NextUIClientProvider>
            </TRPCReactProvider>
          </ServerSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
