import { eq } from "drizzle-orm";
import { type CardSet } from "@/app/(dashboard)/study/page";
import { db } from "@/server/db";
import { studySets } from "@/server/db/schema";

export async function getStudySets(): Promise<CardSet[]> {
  return await db.query.studySets.findMany();
}

export async function getStudySet({
  slug,
}: {
  slug: string;
}): Promise<CardSet | undefined> {
  return await db.query.studySets.findFirst({
    where: eq(studySets.slug, slug),
  });
}
