import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { readingChapters, readings } from "@/server/db/schema";

export async function getReads(): Promise<
  {
    id: string;
    name: string;
    description: string;
    slug: string;
    chapters: {
      name: string;
      slug: string;
    }[];
  }[]
> {
  // const data = await db.query.readings.findMany();
  const data = await db.query.readings.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      slug: true,
    },
    with: {
      chapters: {
        columns: { slug: true, name: true },
      },
    },
  });
  return data;
}
export async function getRead(slug: string): Promise<
  | {
      id: string;
      name: string;
      description: string;
      slug: string;
      chapters: {
        name: string;
        slug: string;
      }[];
    }
  | undefined
> {
  const data = await db.query.readings.findFirst({
    where: eq(readings.slug, slug),
    columns: {
      id: true,
      name: true,
      description: true,
      slug: true,
    },
    with: {
      chapters: {
        columns: { slug: true, name: true, id: true },
      },
    },
  });
  return data;
}
export async function getChapter(slug: string): Promise<
  | {
      number: string;
      id: string;
      name: string;
      slug: string;
      readingId: string;
      content: string;
    }
  | undefined
> {
  // const data = await db.query.readings.findMany();
  const data = await db.query.readingChapters.findFirst({
    where: eq(readingChapters.slug, slug),
  });
  return data;
}
