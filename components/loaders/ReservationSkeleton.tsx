import { Skeleton } from "@/components/ui/skeleton";

export function CompleteReservationSkeleton() {
  return (
    <section className="lg:mt-[calc(var(--nav-height)+10px)] mt-(--mobile-nav-height) container-x flex flex-col gap-2">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-5 mt-4 gap-6">
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Guest Details */}
          <div className="p-6 bg-bg-mute rounded-2xl flex flex-col gap-5">
            <div className="w-full justify-between items-center flex">
              <span className="flex gap-2 items-center">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="h-4 w-28" />
              </span>
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>

            <Skeleton className="h-[52px] w-full rounded-md" />

            <div className="flex justify-between gap-4">
              <Skeleton className="h-[52px] flex-1 rounded-md" />
              <Skeleton className="h-[52px] flex-1 rounded-md" />
            </div>

            <div className="flex pb-3 border-b flex-col md:flex-row border-border gap-4">
              <Skeleton className="h-[52px] w-full rounded-md" />
              <Skeleton className="h-[52px] w-full rounded-md" />
            </div>

            <div className="flex gap-3 flex-col">
              <Skeleton className="h-3 w-56" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-16 rounded-full" />
                <Skeleton className="h-9 w-12 rounded-full" />
                <Skeleton className="h-9 w-20 rounded-full" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Skeleton className="h-[52px] w-full rounded-md" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 bg-bg-mute rounded-2xl flex flex-col gap-6">
            <span className="flex gap-2 items-center">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="h-4 w-32" />
            </span>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-full max-w-md" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col rounded-2xl border border-border shadow-md gap-4">
            <div className="flex flex-col gap-2 p-6">
              <div className="grid-cols-2 grid gap-3 pb-4 border-b border-border">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              <div className="flex mt-3 flex-col gap-4">
                <Skeleton className="h-3 w-28 mb-2" />

                <div className="flex justify-between w-full items-center">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex justify-between w-full items-center">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="flex justify-between w-full items-center">
                  <Skeleton className="h-3 w-24" />
                  <div className="flex flex-col items-end gap-1">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-2 w-20" />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2">
                  <Skeleton className="h-[52px] w-full rounded-md" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
          </div>

          {/* Registration reminder block placeholder */}
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
