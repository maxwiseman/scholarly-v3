import { z } from "zod";
import { eq } from "drizzle-orm";
import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { getServerAuthSession } from "@/server/auth";

export const miscRouter = createTRPCRouter({
  getUnsplashImage: publicProcedure.query(async () => {
    const url =
      "https://api.unsplash.com/photos/random?topics=6sMVjTLSkeQ,M8jVbLbTRws,bo8jQKTaE0Y,CDwuwXJAbEw,Fzo3zuOHN6w,xHxYTMHLgOc,iUIsnVtjB0Y,hmenvQhUmxM,Jpg6Kidl-Hk&content_filter=high";

    return await fetch(url, {
      headers: {
        Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}`,
      },
      cache: "no-cache",
    }).then((res) => res.json() as Promise<Image>);
  }),
  getArbitraryUrl: publicProcedure
    .input(z.object({ url: z.string(), options: z.any() }))
    .query(async ({ input }) => {
      const session = await getServerAuthSession();
      const user = await db.query.users.findFirst({
        where: eq(users.id, session?.user.id || ""),
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- it has to be any
      return await fetch(
        input.url,
        (input.options as RequestInit | undefined) || {
          headers: {
            Authorization: `Bearer ${user?.canvasApiKey}`,
          },
        },
      ).then((res) => res.json());
    }),
});

interface Image {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  categories: [];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: [];
  sponsorship: null;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string;
    portfolio_url: string;
    bio: string;
    location: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
  };
  exif: {
    make: string;
    model: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    title: string;
    name: string;
    city: string;
    country: string;
    position: {
      latitude: number;
      longitude: number;
    };
  };
  views: number;
  downloads: number;
}
