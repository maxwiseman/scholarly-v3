import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default async function Page(): Promise<React.ReactElement> {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-28" />
        </div>
        <Separator className="my-6" />
      </div>
    </div>
  );
}
