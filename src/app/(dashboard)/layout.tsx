import { Navbar } from "./navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-3.5rem)]">{children}</div>
    </>
  );
}
