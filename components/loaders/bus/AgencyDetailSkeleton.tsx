import { Skeleton } from "@/components/ui/skeleton";

export const AgencyDetailSkeleton = () => {
  return (
    <section className="container-x flex flex-col mt-(--mobile-nav-height) lg:mt-(--nav-height) gap-10 md:gap-20">
      {/* Header bar */}
      <div className="bg-secondary-foreground flex flex-col md:flex-row gap-4 justify-between md:items-center p-6 rounded-2xl">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-40 bg-white/20" />
          <Skeleton className="h-4 w-56 bg-white/10" />
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Skeleton className="h-9 w-48 rounded-full" />
          <Skeleton className="h-4 w-36 bg-white/10" />
        </div>
      </div>

      <div className="min-h-screen gap-4 md:gap-6 grid grid-cols-1 lg:grid-cols-4">
        {/* Sidebar filters */}
        <div className="sticky hidden top-[calc(var(--nav-height)+10px)] lg:flex flex-col gap-6 h-[calc(100vh-13%)]">
          <div className="flex flex-col gap-6 bg-bg-mute/50 border-2 flex-1 border-border rounded-2xl p-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <div className="flex flex-col gap-3 mt-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-20" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
          <div className="p-6 bg-primary/10 flex flex-col rounded-2xl gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Main column */}
        <div className="flex col-span-3 flex-col gap-6">
          {/* Branch nav */}
          <div className="bg-bg-mute rounded-xl text-xs p-4 flex justify-between items-center">
            <Skeleton className="h-8 w-24 rounded-md" />
            <div className="flex flex-col items-center gap-1">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>

          {/* Voyage cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-6 md:p-8 rounded-xl border-2 h-fit md:h-60 border-border grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <div className="w-full flex items-center md:justify-center md:flex-col gap-4">
                <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full" />
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-14 rounded-full" />
                </div>
              </div>

              <div className="flex-1 md:pl-6 border-b md:border-b-0 md:border-l-2 border-border flex col-span-3 flex-col gap-6">
                <div className="grid grid-cols-3 gap-6 md:grid-cols-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Skeleton className="h-0.5 w-full" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>

                <div className="w-full flex border-t border-border pt-4 md:pt-0 md:border-none justify-between items-center flex-col md:flex-row gap-4">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <Skeleton className="h-4 w-14" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-6 w-16 md:hidden" />
                  </div>
                  <Skeleton className="h-11 w-full md:w-40 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
