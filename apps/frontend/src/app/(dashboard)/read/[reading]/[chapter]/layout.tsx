import { Sidebar } from "./sidebar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { reading: string; chapter: string };
}): React.ReactElement {
  return (
    <div className="flex w-full gap-8 px-8">
      <div>
        <Sidebar params={params} />
      </div>
      <div className="flex max-w-full grow justify-center py-8">{children}</div>
    </div>
  );
}
