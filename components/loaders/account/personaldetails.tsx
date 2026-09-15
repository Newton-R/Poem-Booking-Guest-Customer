import { Skeleton } from "@/components/ui/skeleton";

export function PersonalDetailsSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl md:col-span-2 flex flex-col gap-6">
      <div className="flex justify-between items-center gap-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
