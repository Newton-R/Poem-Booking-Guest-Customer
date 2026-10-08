import { Skeleton } from "@/components/ui/skeleton";

export const LoyaltyPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Balance card */}
      <div className="p-6 rounded-2xl bg-secondary-foreground flex flex-col gap-4 md:gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-40 rounded-full bg-white/20" />
            <Skeleton className="h-3 w-28 bg-white/10" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
        </div>

        {/* Lifetime points (FCFA) */}
        <Skeleton className="h-8 md:h-10 w-40 bg-white/20" />

        {/* Points balance (XP) */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Skeleton className="h-8 md:h-10 w-48 bg-white/20" />
        </div>
      </div>

      {/* Points history */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-white"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
