import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ServerSessionProvider } from "./_components/serverSessionProvider";
import { ThemeProvider } from "./_components/themeProvider";
import { getServerAuthSession } from "@/server/auth";

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
}) {
  const session = await getServerAuthSession();
  console.log(session?.user.name);

  return (
    <html lang="en">
      <head />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ServerSessionProvider session={session}>
            <TRPCReactProvider cookies={cookies().toString()}>
              {children}
            </TRPCReactProvider>
          </ServerSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
