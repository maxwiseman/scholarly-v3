// import { createEnv } from "@t3-oss/env-nextjs";
// import { z } from "zod";

// export const env = createEnv({
//   /**
//    * Specify your server-side environment variables schema here. This way you can ensure the app
//    * isn't built with invalid env vars.
//    */
//   server: {
//     DATABASE_URL: z
//       .string()
//       .url()
//       .refine(
//         (str) => !str.includes("YOUR_SQLITE_URL_HERE"),
//         "You forgot to change the default URL"
//       ),
//     DATABASE_AUTH_TOKEN: z
//       .string(),
//     NODE_ENV: z
//       .enum(["development", "test", "production"])
//       .default("development"),
//     NEXTAUTH_SECRET:
//       process.env.NODE_ENV === "production"
//         ? z.string()
//         : z.string().optional(),
//     NEXTAUTH_URL: z.preprocess(
//       // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
//       // Since NextAuth.js automatically uses the VERCEL_URL if present.
//       (str) => process.env.VERCEL_URL ?? str,
//       // VERCEL_URL doesn't include `https` so it cant be validated as a URL
//       process.env.VERCEL ? z.string() : z.string().url()
//     ),
//     // Add ` on ID and SECRET if you want to make sure they're not empty
//     DISCORD_CLIENT_ID: z.string(),
//     DISCORD_CLIENT_SECRET: z.string(),
//     GITHUB_CLIENT_ID: z.string(),
//     GITHUB_CLIENT_SECRET: z.string(),
//     BROWSERLESS_API_KEY: z.string()
//   },

//   /**
//    * Specify your client-side environment variables schema here. This way you can ensure the app
//    * isn't built with invalid env vars. To expose them to the client, prefix them with
//    * `NEXT_PUBLIC_`.
//    */
//   client: {
//     // NEXT_PUBLIC_CLIENTVAR: z.string(),
//   },

//   /**
//    * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
//    * middlewares) or client-side so we need to destruct manually.
//    */
//   runtimeEnv: {
//     DATABASE_URL: process.env.DATABASE_URL,
//     DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
//     NODE_ENV: process.env.NODE_ENV,
//     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//     DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
//     DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
//     GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
//     GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
//     BROWSERLESS_API_KEY: process.env.BROWSERLESS_API_KEY
//   },
//   /**
//    * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
//    * useful for Docker builds.
//    */
//   skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
//   /**
//    * Makes it so that empty strings are treated as undefined.
//    * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
//    */
//   emptyStringAsUndefined: true,

// });

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_SQLITE_URL_HERE"),
        "You forgot to change the default URL",
      ),
    DATABASE_AUTH_TOKEN: z.string(),
    BACKEND_URL: z.string().url(),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production" ?
        z.string()
      : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    // Add ` on ID and SECRET if you want to make sure they're not empty
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    UNSPLASH_ACCESS_KEY: z.string(),
    UNSPLASH_SECRET_KEY: z.string(),
    DISCORD_CHANNEL_ID: z.string(),
    DISCORD_BOT_TOKEN: z.string(),
    DISCORD_PING_ID: z.string().optional(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_AXIOM_DATASET: z.string().optional(),
    NEXT_PUBLIC_AXIOM_TOKEN: z.string().optional(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    BACKEND_URL: process.env.BACKEND_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
    NEXT_PUBLIC_AXIOM_DATASET: process.env.NEXT_PUBLIC_AXIOM_DATASET,
    NEXT_PUBLIC_AXIOM_TOKEN: process.env.NEXT_PUBLIC_AXIOM_TOKEN,
    DISCORD_CHANNEL_ID: process.env.DISCORD_CHANNEL_ID,
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    DISCORD_PING_ID: process.env.DISCORD_PING_ID,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation:
    Boolean(process.env.CI) ||
    Boolean(process.env.SKIP_ENV_VALIDATION) ||
    process.env.npm_lifecycle_event === "lint",
});
