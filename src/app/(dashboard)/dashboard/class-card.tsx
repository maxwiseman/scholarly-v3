import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import Link from "next/link";

export function ClassCard({
  classData,
}: {
  classData: {
    id: string | undefined;
    name: string;
    schedule: string | undefined;
    term: string | undefined;
    teachers: string[] | undefined;
    teacherEmail: string | undefined;
    termGrade: number;
    absences: number;
    tardies: number;
    dismissals: number;
  };
}) {
  return (
    <Link href={`/classes/${classData.id}`}>
      <Card>
        <CardHeader className="py-3 pb-0">
          <CardTitle className="line-clamp-1 text-xl font-bold">
            {classData.name}
          </CardTitle>
        </CardHeader>
        <Separator className="my-3" />
        <CardContent className="pb-3 text-muted-foreground">
          Content here <br />
          Content here <br />
          Content here <br />
        </CardContent>
      </Card>
    </Link>
  );
}
