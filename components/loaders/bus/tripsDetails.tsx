import { Skeleton } from "@/components/ui/skeleton";
import { SeatPickerSkeleton } from "@/components/loaders/bus/loadingSeatPicker";

export function TripDetailsBlockSkeleton() {
  return (
    <main className="container-x flex flex-col mt-(--mobile-nav-height) md:mt-(--nav-height) gap-10 md:gap-20">
      {/* Header card */}
      <div className="p-6 w-full flex-col md:flex-row gap-4 rounded-2xl bg-bg-mute/50 flex md:items-end justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-7 w-64 mt-3" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="bg-white flex gap-2 p-2 rounded-xl">
          <Skeleton className="w-10 h-10 rounded-md" />
          <div className="flex flex-col gap-2 justify-center">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Left column — seat selection */}
        <div className="flex flex-col md:col-span-3 gap-4">
          <div className="w-full flex-col md:flex-row flex justify-between gap-2 md:items-center">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-3 w-48" />
            </div>
            <div className="flex gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>
          </div>

          <div className="w-full p-4 bg-bg-mute rounded-2xl">
            <SeatPickerSkeleton />
          </div>

          <div className="p-6 bg-bg-mute/50 flex rounded-2xl gap-2">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
        </div>

        {/* Right column — sticky booking sidebar */}
        <div className="sticky top-[calc(var(--nav-height)+10px)] flex flex-col gap-6 h-fit md:h-[calc(100vh+9%)]">
          <div className="flex h-fit flex-col gap-6 p-6 bg-white border-border border rounded-2xl">
            <Skeleton className="h-4 w-32" />

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 pb-2 border-b border-border">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-3 w-40" />
              </div>

              <div className="flex flex-col gap-2 pb-2 border-b border-border">
                <Skeleton className="h-3 w-24" />
                <div className="flex gap-1 mt-1">
                  <Skeleton className="h-9 w-10 rounded-md" />
                  <Skeleton className="h-9 w-10 rounded-md" />
                </div>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-3 w-20" />
                  <div className="flex flex-col items-end gap-1">
                    <Skeleton className="h-2.5 w-14" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
            </div>

            <div className="flex w-full justify-between mt-auto pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-[30px] h-[30px] rounded-md" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-2xl bg-secondary-foreground">
            <Skeleton className="h-4 w-28 bg-white/20" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-full bg-white/10" />
              <Skeleton className="h-3 w-full bg-white/10" />
              <Skeleton className="h-3 w-4/5 bg-white/10" />
            </div>
          </div>

          <div className="p-6 flex text-center rounded-2xl flex-col gap-3 border items-center justify-center border-primary bg-primary/10">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </main>
  );
}
