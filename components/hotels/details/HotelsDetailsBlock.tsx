"use client"
import React, { useEffect, useState } from 'react'
import { DetailsHero } from './DetailsHero';
import { DetailsContent } from './DetailsContent';
import { Hotel, RoomCategory } from '@/lib/types';


export const HotelsDetailsBlock = ({ Hotel }: { Hotel: Hotel }) => {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 4000)
    }, [])

    return (
        <div className="flex flex-col gap-20">
            <DetailsHero isLoading={loading} hotel={Hotel} />
            <DetailsContent isLoading={loading} hotel={Hotel} />
        </div>
    )
}
