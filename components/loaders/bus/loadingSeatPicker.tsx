import { Skeleton } from "@/components/ui/skeleton";

interface SeatPickerSkeletonProps {
  /** How many passenger rows to render as placeholders */
  rows?: number;
  /** How many columns on the left side of the aisle */
  leftCount?: number;
  /** How many columns on the right side of the aisle */
  rightCount?: number;
  /** Show the driver/attendant placeholder row */
  includeDriverRow?: boolean;
}

export function SeatPickerSkeleton({
  rows = 14,
  leftCount = 2,
  rightCount = 2,
  includeDriverRow = true,
}: SeatPickerSkeletonProps) {
  const rowIndexes = Array.from({ length: rows }, (_, i) => i);

  return (
    <div className="mx-auto w-full">
      <div className="rounded-xl">
        <div className="flex flex-col gap-1.5">
          {includeDriverRow && (
            <div
              className="grid items-center justify-center gap-1.5"
              style={{
                gridTemplateColumns: `repeat(${leftCount}, 40px) 20% repeat(${rightCount}, 40px)`,
              }}
            >
              <Skeleton className="h-[40px] w-full rounded-md" />
              {Array.from({ length: Math.max(leftCount - 1, 0) }).map(
                (_, i) => (
                  <span key={`left-fill-${i}`} />
                ),
              )}
              <span />
              <Skeleton className="h-[40px] w-[40px] rounded-md" />
              {Array.from({ length: Math.max(rightCount - 1, 0) }).map(
                (_, i) => (
                  <span key={`right-fill-${i}`} />
                ),
              )}
            </div>
          )}

          {rowIndexes.map((row) => (
            <div
              key={row}
              className="grid items-center justify-center gap-1.5"
              style={{
                gridTemplateColumns: `repeat(${leftCount}, 40px) 20% repeat(${rightCount}, 40px)`,
              }}
            >
              {Array.from({ length: leftCount }).map((_, i) => (
                <Skeleton
                  key={`left-${row}-${i}`}
                  className="h-[40px] w-[40px] rounded-md"
                />
              ))}
              <span />
              {Array.from({ length: rightCount }).map((_, i) => (
                <Skeleton
                  key={`right-${row}-${i}`}
                  className="h-[40px] w-[40px] rounded-md"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
