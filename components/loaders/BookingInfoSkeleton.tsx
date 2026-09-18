import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function BookingInfoCardSkeleton() {
  return (
    <Card className="w-full max-w-md rounded-[11px]">
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col items-center gap-2 rounded-xl bg-muted p-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
