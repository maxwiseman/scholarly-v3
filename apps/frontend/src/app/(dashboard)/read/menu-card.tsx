import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export function MenuCard({
  reading,
}: {
  reading: {
    id: string;
    name: string;
    description: string;
    slug: string;
    chapters: {
      name: string;
      slug: string;
    }[];
  };
}): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{reading.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="card" />
        <p className="text-muted-foreground">{reading.description}</p>
      </CardContent>
    </Card>
  );
}
