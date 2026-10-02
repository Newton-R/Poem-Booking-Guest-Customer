import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePageSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header: avatar, name, status, edit button */}
      <div className="w-full flex flex-col gap-2 md:flex-row justify-between md:items-center">
        <div className="flex gap-2 items-center">
          <Skeleton className="size-14 rounded-full" />
          <div className="flex gap-1.5 flex-col">
            <div className="flex gap-2 flex-col md:flex-row md:items-center">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-32 rounded-full" />
            </div>
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
        <Skeleton className="h-10 w-full md:w-30 rounded-md" />
      </div>

      {/* Personal Details card */}
      <div className="bg-white p-6 rounded-2xl col-span-2 flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
