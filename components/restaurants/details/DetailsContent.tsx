import { Button } from '@/components/ui/button';
import { DishCard } from '@/components/ui/restaurantdishcard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Location, Phone, Plus, Star } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import React from 'react'



const TestimonialCard = () => {
    return <div className="w-full flex flex-col gap-4 pb-4 border-b border-border mb-3">
        <div className="w-full flex justify-between items-start">
            <div className="flex gap-2 items-center">
                <div className="w-13 h-13 rounded-full flex items-center justify-center bg-secondary-foreground text-white font-bold text-2xl">
                    SM
                </div>
                <div className="flex flex-col gap-0.5">
                    <span>Samuel M</span>
                    <span className="text-muted-foreground">Gourmet Member • Oct 2023</span>
                </div>
            </div>
            <div className="flex items-center gap-1">
                {
                    Array.from({ length: 5 }).map((_, i) =>
                        <HugeiconsIcon icon={Star} size={18} className="fill-primary text-primary" key={i} />
                    )
                }
            </div>
        </div>
        <p className="italic mt-3 text-muted-foreground">
            "The Ndolé is easily the best I've had in Douala. The balance of flavors is incredible. Delivery was
            prompt and the food arrived piping hot."
        </p>
    </div>
}

const ReviewsBlock = () => {
    const ratings = [
        {
            rate: 5,
            percentage: 92
        },
        {
            rate: 4,
            percentage: 0.5
        },
        {
            rate: 3,
            percentage: 10
        },
        {
            rate: 2,
            percentage: 20
        },
        {
            rate: 1,
            percentage: 15
        }
    ]
    return <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="col-span-3 flex flex-col gap-4">
            <div className="w-full gap-6 grid pb-4 border-b border-border grid-cols-3">
                <div className="flex items-center justify-center flex-col gap-2 p-6">
                    <span className="text-6xl font-bold text-secondary-foreground">4.9</span>
                    <div className="flex items-center gap-1">
                        {
                            Array.from({ length: 5 }).map((_, i) =>
                                <HugeiconsIcon icon={Star} size={18} className="fill-primary text-primary" key={i} />
                            )
                        }
                    </div>
                    <p className="text-xs text-muted-foreground w-[80%] text-center">Based on 1,248
                        reviews</p>
                </div>
                <div className="border-l border-border pl-12 col-span-2 flex items-center justify-center flex-col gap-1.5">
                    {
                        ratings.map((rating, i) =>
                            <div className="text-[12px] w-full flex items-center gap-2" key={i}>
                                <span>{rating.rate}</span>
                                <div className="flex-1 h-2 rounded-full overflow-hidden bg-bg-mute">
                                    <div style={{ width: `${rating.percentage}%` }} className="h-full bg-primary" />
                                </div>
                                <span className="text-muted-foreground">{rating.percentage}%</span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col mt-12 gap-6">
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
            </div>
        </div>
        <div className="flex gap-8 flex-col">
            <span className="font-bold text-primary text-xl">Restaurant Info</span>
            <div className="flex flex-col gap-6">
                <div className="flex gap-2 items-start">
                    <HugeiconsIcon icon={Location} className="text-secondary-foreground" size={17} />
                    <div className="flex flex-col text-xs gap-0.5">
                        <span className="text-secondary-foreground font-bold">Douala, Akwa</span>
                        <span className="text-muted-foreground">Rue 1245, Commercial District</span>
                        <span className="text-primary">VIEW ON MAP</span>
                    </div>
                </div>

                <div className="flex gap-2 items-start">
                    <HugeiconsIcon icon={Clock} className="text-secondary-foreground" size={17} />
                    <div className="flex flex-col text-xs gap-1 w-full">
                        <span className="text-secondary-foreground font-bold">Opening Hours</span>
                        <div className="w-full flex justify-between items-center">
                            <span className="text-muted-foreground">Mon - Fri</span>
                            <span className="text-muted-foreground">11:00 - 23:00</span>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <span className="text-muted-foreground">Sat - Sun</span>
                            <span className="text-muted-foreground">10:00 - 00:00</span>
                        </div>

                    </div>
                </div>

                <div className="flex gap-2 items-start">
                    <HugeiconsIcon icon={Phone} className="text-secondary-foreground" size={17} />
                    <div className="flex flex-col text-xs gap-0.5">
                        <span className="text-secondary-foreground font-bold">Contact Details</span>
                        <span className="text-muted-foreground">+237 678 123 456</span>
                        <span className="text-muted-foreground">concierge@terangabistro.cm</span>

                    </div>
                </div>
            </div>
        </div>
    </div>
}
export const DetailsContent = () => {
    return (
        <Tabs defaultValue="menu" className="flex flex-col container-x gap-4">

            <div className="w-full border-b border-border pb-4">
                <TabsList className={""} variant={"line"}>
                    <TabsTrigger value="menu">Menu</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="menu">
                <div className='w-full flex flex-col gap-4'>
                    <h2 className="text-3xl font-bold">Signature Starters</h2>
                    <div className="grid grid-cols-3 gap-8 mt-4">
                        {
                            Array.from({ length: 3 }).map((_, i) =>
                                <DishCard key={i} />
                            )
                        }
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="review">
                <ReviewsBlock />
            </TabsContent>
            {/* <div className="w-full flex gap-6">
                <span>Menu</span>
                <span>Reviews</span>
            </div>
             */}

        </Tabs>
    )
}
