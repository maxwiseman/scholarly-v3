"use client";

import {
  IconCheck,
  IconFile,
  IconFileText,
  IconFold,
  IconFoldDown,
  IconLink,
  IconPencil,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { Button, LinkButton } from "@/app/_components/ui/button";
import { api } from "@/trpc/react";
import { Input } from "@/app/_components/ui/input";
import { queryOpts } from "@/lib/utils";

export default function Page({
  params,
}: {
  params: { classId: string; moduleId: string };
}): React.ReactElement {
  const moduleData = api.canvas.getModules.useQuery(params.classId, queryOpts);
  const [searchString, setSearchString] = useState("");
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          className="max-w-sm"
          onChange={(e) => {
            setSearchString(e.target.value);
            if (e.target.value.length > 0) {
              setAccordionValue(
                moduleData.data?.map((module) => module.name) ?? [],
              );
            }
          }}
          placeholder="Search..."
          value={searchString}
        />
        <Button
          onClick={() => {
            if (accordionValue.length === 0) {
              setAccordionValue(
                moduleData.data?.map((module) => module.name) ?? [],
              );
            } else if (accordionValue.length !== 0) {
              setAccordionValue([]);
            }
          }}
          size="icon"
          variant="outline"
        >
          <IconFold
            className="absolute h-4 w-4 transition-opacity"
            style={{ opacity: accordionValue.length !== 0 ? 1 : 0 }}
          />

          <IconFoldDown
            className="absolute h-4 w-4 transition-opacity"
            style={{ opacity: accordionValue.length === 0 ? 1 : 0 }}
          />
        </Button>
      </div>
      <Accordion
        className="px-1"
        onValueChange={(val) => {
          setAccordionValue(val);
        }}
        type="multiple"
        value={accordionValue}
      >
        {moduleData.data?.map((module) => {
          return (
            <AccordionItem className="py-2" key={module.id} value={module.name}>
              <AccordionTrigger>{module.name}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1">
                {module.items?.map((item) => {
                  if (
                    searchString.length > 0 &&
                    !item.title
                      .toUpperCase()
                      .includes(searchString.toUpperCase())
                  ) {
                    return null;
                  }
                  if (item.type !== "SubHeader")
                    return (
                      <LinkButton
                        className="flex flex-row justify-start gap-2 !px-2"
                        href={
                          item.type === "ExternalUrl"
                            ? item.external_url || ""
                            : `/classes/${params.classId}/${item.url?.replace(
                                /https:\/\/knoxschools\.instructure\.com\/api\/v1\/courses\/[^/]*\//,
                                "",
                              )}`
                        }
                        key={item.id}
                        style={{ marginLeft: `${item.indent * 1.5}rem` }}
                        variant="ghost"
                      >
                        {item.type === "Assignment" && (
                          <IconPencil className="h-5 w-5" />
                        )}
                        {item.type === "File" && (
                          <IconFile className="h-5 w-5" />
                        )}
                        {item.type === "Quiz" && (
                          <IconCheck className="h-5 w-5" />
                        )}
                        {item.type === "ExternalUrl" && (
                          <IconLink className="h-5 w-5" />
                        )}
                        {item.type === "Page" && (
                          <IconFileText className="h-5 w-5" />
                        )}
                        {item.title}
                      </LinkButton>
                    );
                  return (
                    <div className="mt-0 px-4 py-2 font-bold" key={item.id}>
                      {item.title}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
