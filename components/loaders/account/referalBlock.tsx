import { Skeleton } from "@/components/ui/skeleton";

export const ReferalBlockSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero card */}
      <div className="p-6 bg-secondary-foreground flex flex-col gap-6 md:flex-row rounded-2xl">
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-4 w-36 bg-white/20" />
          <Skeleton className="h-8 w-3/4 bg-white/20" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-full bg-white/10" />
            <Skeleton className="h-3 w-2/3 bg-white/10" />
          </div>
        </div>
        <div className="border border-white/35 w-full md:w-[45%] flex rounded-2xl flex-col items-center justify-center gap-5 p-6 bg-white/10">
          <Skeleton className="h-3 w-40 bg-white/20" />
          <div className="flex items-center gap-2 rounded-md p-2 border border-primary/15 bg-white/10">
            <Skeleton className="h-8 w-44 bg-white/20" />
            <Skeleton className="size-10 rounded-md bg-white/20" />
          </div>
          <Skeleton className="h-3 w-20 bg-white/20" />
          <div className="flex gap-3 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="size-10 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="flex flex-col items-center gap-4 justify-center">
        <Skeleton className="h-5 w-28 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-bg-mute/50 p-6 items-center justify-center rounded-2xl flex flex-col gap-2"
            >
              <Skeleton className="size-10 mb-4 rounded-full" />
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="h-4 w-32" />
              <div className="flex flex-col items-center gap-1.5 w-full">
                <Skeleton className="h-3 w-full max-w-48" />
                <Skeleton className="h-3 w-3/4 max-w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral history */}
      <div className="border border-border rounded-2xl bg-white overflow-hidden flex flex-col">
        <div className="w-full flex items-center p-6 justify-between gap-6">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-xl w-full">
            <thead>
              <tr className="bg-primary/40 text-xs">
                <td className="p-6">
                  <Skeleton className="h-3 w-12" />
                </td>
                <td>
                  <Skeleton className="h-3 w-20" />
                </td>
                <td>
                  <Skeleton className="h-3 w-14" />
                </td>
                <td>
                  <Skeleton className="h-3 w-28" />
                </td>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td className="p-6">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-6">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td>
                    <Skeleton className="h-6 w-36 rounded-full" />
                  </td>
                  <td>
                    <Skeleton className="h-4 w-16" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
