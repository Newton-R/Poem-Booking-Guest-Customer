import { Skeleton } from "@/components/ui/skeleton";

export function PopularRestaurantsSkeleton() {
  return (
    <section className="flex flex-col container-x gap-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-full flex flex-col gap-3">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-full" />
              <div className="flex items-center justify-between mt-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
