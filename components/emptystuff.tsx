import React from 'react'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './ui/empty';
import { HugeiconsIcon } from '@hugeicons/react';
import { AlertTriangle, NoMeetingRoomIcon } from '@hugeicons/core-free-icons';

export const EmptyHotelsRooms = () => {
    return (
        <div className="mt-[20px]">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <HugeiconsIcon icon={NoMeetingRoomIcon} size={40} />
                    </EmptyMedia>
                    <EmptyTitle>Hotel Room not found</EmptyTitle>
                    <EmptyDescription>
                        No room currently availability to match your specifications
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    )
}
