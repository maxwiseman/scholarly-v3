"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";
import { IconLogout, IconMoonStars, IconUser } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export function UserButton(): React.ReactElement {
  const session = useSession();
  const { theme, setTheme } = useTheme();

  if (session.data)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="h-8 w-8">
            {session.data?.user.image && (
              <AvatarImage src={session.data?.user.image} />
            )}
            <AvatarFallback>
              <IconUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-2">
          <DropdownMenuLabel className="pb-0">
            {session.data?.user.name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="pt-0 text-xs font-normal text-muted-foreground">
            {session.data?.user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconMoonStars className="mr-2 h-4 w-4" /> Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={theme == "system"}
                  onClick={() => setTheme("system")}
                >
                  {/* <IconDeviceDesktop className="mr-2 h-4 w-4" /> */}
                  System
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme == "light"}
                  onClick={() => setTheme("light")}
                >
                  {/* <IconSun className="mr-2 h-4 w-4" /> */}
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme == "dark"}
                  onClick={() => setTheme("dark")}
                >
                  {/* <IconMoon className="mr-2 h-4 w-4" /> */}
                  Dark
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
            }}
          >
            <IconLogout className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <IconUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={async () => {
            await signIn();
          }}
        >
          Sign in
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}