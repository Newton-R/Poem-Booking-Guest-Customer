"use client"
import React from 'react'
import { Button } from './button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Plus } from '@hugeicons/core-free-icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const DishCard = () => {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div className='w-full flex overflow-hidden h-80 flex-col gap-3'>
            <div className='w-full flex flex-1 overflow-hidden rounded-2xl gap-2'>
                <Image
                    src={"/restau.jpg"}
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                    alt="image"
                />
            </div>
            <div className='w-full flex flex-col'>
                <div className="flex flex-col text-[14px] gap-0.5">
                    <span className="text-primary font-bold"></span>
                    <Link href={"/"}>
                        <Button className={"font-bold text-[14px] px-0"} variant={"link"}>
                            Yassa Spiced Calamari
                        </Button>
                    </Link>
                    <p>Traditional steamed bean cake with palm oil and
                        spinach leaves.</p>
                </div>
                <div className="w-full justify-between mt-2 flex items-center">
                    <span className="text-primary text-xs">XAF 4,500</span>
                    <Button onClick={() => router.push(`${pathname}/1`)} className={"text-xs p-1 px-3 rounded-md"}>
                        <HugeiconsIcon icon={Plus} size={18} />
                        ADD TO CART
                    </Button>
                </div>
            </div>
        </div>
    )
}