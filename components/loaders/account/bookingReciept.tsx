import { Skeleton } from "@/components/ui/skeleton";

export function BookingReceiptSkeleton() {
  return (
    <div className="flex items-center overflow-hidden w-full text-[14px] justify-center bg-white shadow-md rounded-2xl flex-col">
      {/* Header */}
      <div className="flex justify-between flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full p-4 md:p-6">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
        <div className="flex flex-col md:items-end gap-2.5">
          <Skeleton className="h-5 w-20 rounded-full" />
          <div className="flex flex-col md:items-end gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="grid md:grid-cols-3 bg-bg-mute/30 border-y border-border w-full gap-2 md:gap-6 grid-cols-1">
        <div className="flex flex-col gap-2 p-4 md:p-6 border-r border-border">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex flex-col gap-2 p-4 md:p-4">
          <Skeleton className="h-3 w-20" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
        <div className="flex flex-col gap-1 p-4 md:p-6 border-l border-border">
          <Skeleton className="h-3 w-28" />
          <div className="flex flex-col gap-1 mt-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Reservation summary */}
      <div className="flex flex-col gap-4 w-full p-6">
        <div className="flex flex-col w-full gap-3">
          <Skeleton className="h-3 w-36" />
          <div className="flex p-6 w-full bg-primary/10 rounded-2xl flex-col gap-4 md:flex-row">
            <Skeleton className="rounded-2xl h-[100px] w-[100px] shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-28" />
              <div className="flex gap-4 flex-col md:flex-row mt-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing breakdown */}
      <div className="p-6 w-full">
        <div className="flex flex-col w-full gap-4">
          <Skeleton className="h-3 w-36" />
          <div className="rounded-2xl p-6 flex flex-col gap-4 bg-bg-mute">
            <div className="w-full flex items-center justify-between gap-4">
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* QR code */}
      <div className="p-6 w-full">
        <div className="flex flex-col w-full gap-4">
          <Skeleton className="h-3 w-20" />
          <div className="w-full flex items-center justify-center">
            <Skeleton className="h-[160px] w-[160px] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-white flex-col-reverse md:flex-row gap-4 text-center bg-secondary-foreground p-6 flex justify-between">
        <div className="text-[10px] flex flex-col md:text-start gap-1.5">
          <Skeleton className="h-3 w-40 bg-white/20" />
          <Skeleton className="h-3 w-32 bg-white/10" />
        </div>
        {/* <div className="flex gap-4">
          <Button className="p-4 flex-1" disabled>
            <HugeiconsIcon icon={Download} size={18} />
            Download PDF
          </Button>
          <Button size="icon-lg" variant="outline" disabled>
            <HugeiconsIcon icon={Printer} size={20} />
          </Button>
        </div> */}
      </div>
    </div>
  );
}
