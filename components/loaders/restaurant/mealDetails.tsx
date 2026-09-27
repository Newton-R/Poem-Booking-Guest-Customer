import { Skeleton } from "@/components/ui/skeleton";

export const MealDetailsBlockSkeleton = () => {
  return (
    <main className="container-x flex flex-col gap-20 mt-(--mobile-nav-height) lg:mt-[calc(var(--nav-height)+10px)]">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 flex flex-col gap-5">
          {/* Image */}
          <Skeleton className="h-100 w-full rounded-2xl" />

          {/* Description */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>

          {/* Ingredients */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-28" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Title + price */}
          <div className="flex flex-col gap-2 pb-4 border-b border-border">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Meal customisation skeleton */}
          <div className="flex flex-col gap-4 w-full">
            <Skeleton className="h-4 w-40" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-20" />
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-border rounded-md p-3 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-3 w-16" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <div className="p-4 rounded-md bg-blue-50 flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="h-5 w-6" />
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
                <Skeleton className="h-[52px] w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* From the same kitchen */}
      <section className="flex flex-col gap-3">
        <div className="w-full flex flex-col md:flex-row items-start gap-2 md:justify-between md:items-end">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-full flex h-80 flex-col gap-3">
              <Skeleton className="w-full flex-1 rounded-2xl" />
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
                <div className="w-full justify-between mt-2 flex items-center">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-6 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
