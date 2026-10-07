import { Skeleton } from "../ui/skeleton";

export function RefundPolicySkeleton() {
  return (
    <div className="flex flex-col gap-4 py-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 pb-4 border-b border-border last:border-b-0"
        >
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}
