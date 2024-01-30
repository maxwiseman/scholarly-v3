"use server";

import { env } from "@/env";

export async function sendDiscordLog(
  message: string,
  opts?: { ping?: boolean },
): Promise<void> {
  await fetch(
    `https://discord.com/api/channels/${env.DISCORD_CHANNEL_ID}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        content: (opts?.ping ? `<@${env.DISCORD_PING_ID}> ` : "") + message,
      }),
    },
  ).catch(() => {
    console.error("Failed to send Discord log:", message);
  });
}
