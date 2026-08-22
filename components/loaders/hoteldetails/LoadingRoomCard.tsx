import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const LoadingRoomAccommodationCard = () => {
  return (
    <div
      className={cn(
        "flex overflow-hidden w-full p-2 flex-col max-h-80 md:max-h-60  md:flex-row gap-4 border border-border rounded-xl",
      )}
    >
      <Skeleton className="w-full md:w-60 lg:w-80 h-full relative overflow-hidden"></Skeleton>
      <div className="flex flex-col gap-2 flex-1 p-4 px-2 ">
        <div className="flex justify-between items-end">
          <Skeleton className="flex w-50 h-8 flex-col gap-px"></Skeleton>
        </div>
        <p className="text-sm flex flex-col text-muted-foreground pb-3 border-b mt-4 border-border">
          <Skeleton className="flex w-[80%] h-8 flex-col gap-px"></Skeleton>
          <Skeleton className="w-[50%]" />
        </p>
        <div className="flex mt-auto justify-between items-center mt-3">
          <div className="flex gap-2 w-full justify-between items-end">
            <Skeleton className="h-10 w-30" />
            <Skeleton className="h-10 w-30" />
          </div>
        </div>
      </div>
    </div>
  );
};
