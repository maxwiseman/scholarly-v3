import { Separator } from "@/app/_components/ui/separator";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="p-8 py-10">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Settings
      </h1>
      <Separator className="my-4" />
      {children}
    </div>
  );
}
