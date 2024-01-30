import { eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export async function getClasses(): Promise<Course[]> {
  const session = await getServerAuthSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });

  const data = await fetch(
    "https://knoxschools.instructure.com/api/v1/dashboard/dashboard_cards",
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<Course[]>);
  return data;
}

export interface Course {
  longName: string;
  shortName: string;
  originalName: string;
  courseCode: string;
  assetString: string;
  href: string;
  term: string;
  subtitle: string;
  enrollmentState: string;
  enrollmentType: string;
  observee: null;
  id: number;
  isFavorited: boolean;
  isK5Subject: boolean;
  isHomeroom: boolean;
  useClassicFont: boolean;
  canManage: boolean;
  canReadAnnouncements: boolean;
  image: string;
  color: null;
  position: null;
  published: boolean;
  links: [
    {
      css_class: string;
      icon: string;
      hidden: null;
      path: string;
      label: string;
    },
    {
      css_class: string;
      icon: string;
      hidden: null;
      path: string;
      label: string;
    },
  ];
  canChangeCoursePublishState: boolean;
  defaultView: string;
  pagesUrl: string;
  frontPageTitle: string;
}
