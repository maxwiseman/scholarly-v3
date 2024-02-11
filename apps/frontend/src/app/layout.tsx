import "@/styles/globals.css";

import { Inter } from "next/font/google";
// import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";
import { AxiomWebVitals } from "next-axiom";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "./_components/ui/sonner";
import { ServerSessionProvider } from "./_components/server-session-provider";
import { ThemeProvider } from "./_components/theme-provider";
import { NextUIClientProvider } from "./_components/next-ui-provider";
import { TooltipProvider } from "./_components/ui/tooltip";
import { getServerAuthSession } from "@/server/auth";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Scholarly",
  description: "Aspen + Canvas = 😃",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
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
        className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <ServerSessionProvider session={session}>
            <TRPCReactProvider cookies={cookies().toString()}>
              <NextUIClientProvider>
                <TooltipProvider>
                  <div
                    className="overflow-hidden bg-background"
                    // eslint-disable-next-line react/no-unknown-property -- This is for vaul
                    vaul-drawer-wrapper=""
                  >
                    {children}
                  </div>
                </TooltipProvider>
              </NextUIClientProvider>
            </TRPCReactProvider>
          </ServerSessionProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
      <AxiomWebVitals />
    </html>
  );
}
