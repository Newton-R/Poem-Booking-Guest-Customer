import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function OrderStatusPageSkeleton() {
  return (
    <div className="min-h-screen bg-muted/30 p-6 md:p-10 mt-[calc(var(--nav-height)+20px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 max-w-6xl mx-auto">
        {/* Left: Order status */}
        <Card className="p-8 rounded-2xl h-fit">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-7 w-32 rounded-md" />
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-10">
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" />
              <div className="relative flex justify-between">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 w-20"
                  >
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status message */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex items-start gap-2">
              <Skeleton className="h-1.5 w-1.5 rounded-full mt-2 shrink-0" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        </Card>

        {/* Right: Order summary */}
        <Card className="p-6 rounded-2xl h-fit">
          <Skeleton className="h-5 w-36 mb-4" />

          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between gap-2">
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-slate-800/40 px-4 py-4 flex items-center justify-between">
            <Skeleton className="h-4 w-20 bg-white/20" />
            <Skeleton className="h-5 w-24 bg-white/20" />
          </div>

          <div className="flex justify-center mt-4">
            <Skeleton className="h-3 w-40" />
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-2 mt-10">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
