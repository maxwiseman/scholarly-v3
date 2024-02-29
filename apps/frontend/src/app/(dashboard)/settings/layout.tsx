import { Sidebar } from "../../_components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/_components/ui/resizable";
import { Separator } from "@/app/_components/ui/separator";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="p-8 pt-10">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Settings
      </h1>
      <Separator className="mt-4" />
      <ResizablePanelGroup
        className="relative h-min max-h-min w-full max-w-full overflow-auto"
        direction="horizontal"
        style={{ overflow: "unset" }}
      >
        <ResizablePanel
          defaultSize={15}
          minSize={10}
          style={{ overflow: "unset" }}
        >
          <Sidebar
            items={SettingsConfig.map((page) => {
              return {
                name: page.name,
                href: page.slug === "" ? "/settings" : `/settings/${page.slug}`,
                matchMethod: "equal",
              };
            })}
          />
        </ResizablePanel>
        <div>
          <ResizableHandle
            className="sticky top-[3.5rem] z-10 mx-8 ml-8 h-[calc(100vh-3.5rem)] rounded-full"
            withHandle
          />
        </div>
        <ResizablePanel className="py-8">{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

const SettingsConfig: {
  name: string;
  slug: string;
}[] = [
  {
    name: "General",
    slug: "",
  },
  {
    name: "Appearance",
    slug: "appearance",
  },
];
