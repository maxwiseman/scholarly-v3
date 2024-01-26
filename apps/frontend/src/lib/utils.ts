import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/env";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const queryOpts = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
};

export function sendDiscordLog(
  message: string,
  opts?: { ping?: boolean },
): void {
  fetch(`https://discord.com/api/channels/${env.DISCORD_CHANNEL_ID}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      content:
        // eslint-disable-next-line prefer-template -- This is really confusing as a string concatenation
        (opts?.ping ? `<@${env.DISCORD_PING_ID}> ` : "") +
        `Error in ${env.VERCEL_ENV || "dev"}` +
        message,
    }),
  }).catch(() => {
    console.error("Failed to send Discord log:", message);
  });
}
