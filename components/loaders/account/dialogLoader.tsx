import { Skeleton } from "@/components/ui/skeleton";

export function PointsSelectionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Balance card */}
      <div className="rounded-xl bg-secondary-foreground p-4 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-28 bg-white/20" />
          <Skeleton className="h-8 w-32 bg-white/20" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
      </div>

      {/* Input + Max */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-11 flex-1 rounded-md" />
          <Skeleton className="h-11 w-16 rounded-md" />
        </div>
      </div>

      {/* Slider */}
      <Skeleton className="h-2 w-full rounded-full" />

      {/* Quick select chips */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full rounded-md" />
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-bg-mute p-4 flex flex-col gap-3">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex justify-between pt-3 border-t border-border">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
