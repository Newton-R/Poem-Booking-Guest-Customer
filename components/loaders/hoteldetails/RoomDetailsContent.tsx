import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

export const LoadingRoomDetailsContent = () => {
    return (
        <div className="container-x mb-20 flex gap-8">
            <div className="flex flex-col gap-20 flex-1">
                <div className="flex flex-col gap-4 text-[14px]">

                    <div className="flex flex-col gap-3">
                        <Skeleton className="w-[80%] h-6" />
                        <Skeleton className="w-[40%] h-6" />
                        <Skeleton className="w-[20%] h-6" />
                    </div>
                </div>

                {/* Amenities section */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold pb-2">Amenities </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 4].map((_, i) => (
                            <div
                                key={i}
                                className="flex gap-4 items-center text-center p-4 border border-border rounded-lg"
                            >
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <Skeleton className="font-semibold h-10 w-[80%]"></Skeleton>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Guest Experience */}

            </div>
            <div className="flex flex-col w-full max-w-90 gap-4">
                <div className="flex flex-col border border-border rounded-2xl overflow-hidden">
                    <div className="p-6 flex justify-between">
                        <Skeleton className="h-8 w-30" />
                        <Skeleton className="h-8 w-20" />
                    </div>

                    {/* filter forms */}

                    <div className="p-4">
                        <Skeleton className="flex h-70 flex-col gap-4 p-6"></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    )
}
