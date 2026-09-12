import { Skeleton } from "@/components/ui/skeleton";

const VoyagesBlockSkeleton = () => {
  return (
    <div className="p-6 md:p-8 rounded-xl border-2 h-fit md:h-60 border-border grid grid-cols-1 md:grid-cols-4 gap-6 md:flex-row">
      <div className="w-full flex items-center md:justify-center item md:flex-col gap-4">
        <Skeleton className="w-12 h-12 md:w-25 md:h-25 rounded-full" />
        <div className="flex flex-col gap-2 items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
      </div>
      <div className="flex-1 md:pl-6 border-b md:border-b-0 md:border-l-2 border-border flex col-span-3 flex-col gap-6">
        <div className="grid grid-cols-3 gap-6 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-14 hidden md:flex" />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-0.5 w-40" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-14 hidden md:flex" />
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <div className="w-full flex border-t border-border pt-4 md:pt-0 md:border-none justify-between mt-auto items-center flex-col md:flex-row gap-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-4 items-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>
            <Skeleton className="h-6 w-16 md:hidden" />
          </div>
          <Skeleton className="h-12 w-full md:w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const VoyagesListSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="flex col-span-3 flex-col gap-6">
      <div className="bg-bg-mute rounded-xl text-xs p-4 flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <VoyagesBlockSkeleton key={i} />
      ))}
    </div>
  );
};
