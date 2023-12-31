import Link from "next/link";
import { UserButton } from "../_components/ui/user-button";

export function Navbar(): React.ReactElement {
  return (
    <nav className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/95 px-8 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex flex-row items-center justify-start">
        <Link href="/dashboard">
          <span className="block font-bold">Scholarly</span>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end">
        <UserButton />
      </div>
    </nav>
  );
}
