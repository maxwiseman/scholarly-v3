"use server";

import { env } from "@/env";

export async function sendDiscordLog(
  message: string,
  opts?: { ping?: boolean },
): Promise<void> {
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
        `Error in ${env.VERCEL_ENV || "dev"}: ` +
        message,
    }),
  }).catch(() => {
    console.error("Failed to send Discord log:", message);
  });
}
