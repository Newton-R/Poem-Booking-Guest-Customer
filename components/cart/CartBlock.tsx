import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { CircleStar, Coupon01FreeIcons, Minus, Plus } from '@hugeicons/core-free-icons';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const CartItem = () => {
    return <div className="py-4 border-b border-border flex justify-between items-end">
        <div className="flex items-center gap-3">
            <div className="size-20 rounded-md overflow-hidden">
                <Image className="w-full h-full object-cover" width={200} height={200} alt="image" src="/restau.jpg" />
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-1">
                    <span className="font-bold">Ndole Royal</span>
                    <span className="text-xs text-muted-foreground">Premium beef, shrimp, and plantains</span>
                </div>
                <span className="font-bold text-primary mt-auto">12,000 XAF</span>
            </div>
        </div>
        <div className="bg-blue-50 flex p-2 gap-4 rounded-md items-center">
            <Button size={"icon-sm"} variant={"outline"} className={"border-none"}><HugeiconsIcon icon={Minus} size={20} /></Button>
            <span>2</span>
            <Button size={"icon-sm"} variant={"outline"} className={"border-none"}><HugeiconsIcon icon={Plus} size={20} /></Button>
        </div>
    </div>
}

const InputField = ({ label, children }: { label: String, children: React.ReactNode }) => {
    return <div className="flex flex-1 flex-col gap-1">
        <label className="uppercase text-[10px] font-bold text-muted-foreground">{label}</label>
        {children}
    </div>
}

export const CartBlock = () => {
    return (
        <main className="container-x mt-[calc(var(--nav-height)+10px)] gap-6 grid grid-cols-1 md:grid-cols-5">
            <div className="col-span-3 flex flex-col gap-6">
                <h1 className="text-4xl font-bold">Checkout</h1>

                {/* cart item */}
                <div className="rounded-md shadow-md bg-white p-6">
                    <div className="w-full items-center justify-between flex">
                        <span>Your Items</span>
                        <span className="p-1 bg-bg-mute rounded-full px-2 text-xs text-primary">2 items</span>
                    </div>
                    <div className="mt-6 flex flex-col">
                        <CartItem />
                        <CartItem />
                    </div>
                </div>

                {/* delivery location details */}
                <div className="rounded-md shadow-md bg-white p-6">
                    <span className="font-bold mb-4">
                        Delivery Address
                    </span>
                    <form className="mt-4 flex flex-col gap-4">
                        <InputField label={"Full Name"}>
                            <Input placeholder="Enter your full name" className="border p-4 bg-white h-10 px-4" />
                        </InputField>
                        <div className="flex flex-col md:flex-row gap-4">
                            <InputField label={"PHONE NUMBER"}>
                                <Input placeholder="237" type="number" className="border p-4 bg-white h-10 px-4" />
                            </InputField>
                            <InputField label={"CITY"}>
                                <Input placeholder="eg Douala" className="border p-4 bg-white h-10 px-4" />
                            </InputField>
                        </div>
                        <InputField label={"NEIGHBORHOOD / DISTRICT"}>
                            <Input placeholder="eg Douala" className="border p-4 bg-white h-10 px-4" />
                        </InputField>
                        <InputField label={"DELIVERY INSTRUCTIONS (STREET/HOUSE)"}>
                            <Input placeholder="Rue 124, near the bakery..." className="border p-4 bg-white h-10 px-4" />
                        </InputField>

                        <div className="pt-4 border-t border-border flex flex-col pb-4 border-b gap-4">
                            <div className="flex flex-col gap-4 text-xs">
                                <span className="text-xs font-bold">CONTACT PREFERENCES</span>
                                <div className="w-full grid grid-cols-2 md:grid-cols-3">
                                    <div className="flex items-center gap-2">
                                        <Input type="radio" className="w-4 h-4" />
                                        <label>Whatsapp</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input type="radio" className="w-4 h-4" />
                                        <label>Whatsapp</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input type="radio" className="w-4 h-4" />
                                        <label>Whatsapp</label>
                                    </div>
                                </div>
                                <div className="rounded-md bg-blue-50 p-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span>Same as phone number</span>
                                    </div>
                                    <Input className="h-10 px-4" placeholder="WhatsApp Number (Optional)" />
                                </div>
                            </div>
                        </div>
                        {/* Special requests */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold">SPECIAL REQUESTS (OPTIONAL)</span>
                            <Textarea className="h-14 bg-white" placeholder="Anything else we should know about your order?">

                            </Textarea>
                        </div>
                    </form>
                </div>


                {/* paymentoptions */}
                <div className="flex p-6 flex-col rounded-md shadow-md bg-white gap-4">
                    <span className="font-bold">
                        Payment Method
                    </span>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-border rounded-md flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                                <div className="size-5 rounded-md">
                                    <Image src={"/icon/lmomo.png"} width={100} height={100} className="w-full h-full object-cover" alt="icon" />
                                </div>
                                <span className="text-[14px]">Mobile Money</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Quick checkout with OM</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white col-span-2 p-6 flex flex-col h-fit rounded-2xl shadow-md">
                <span className="text-xl font-bold">Summary</span>
                <div className="mt-4 flex flex-col gap-4 pb-6 border-b border-border">
                    <div className="flex items-center text-muted-foreground text-xs justify-between">
                        <span>Subtotal</span>
                        <span>11,700 FCFA</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-xs justify-between">
                        <span>Delivery Fee</span>
                        <span>1,200 FCFA</span>
                    </div>
                    <div className="flex items-center text-green-500 text-xs justify-between">
                        <span className="flex items-center gap-1"> <HugeiconsIcon icon={Coupon01FreeIcons} size={12} /> PoemPay Discount</span>
                        <span>- 585 FCFA FCFA</span>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <span>Total</span>
                    <div className="flex flex-col items-end text-end">
                        <span className="text-primary text-xl">12,000 FCFA</span>
                        <span className="text-xs text-muted-foreground">TAXES INCLUDED</span>
                    </div>
                </div>
                <div className="p-4 mt-6 rounded-2xl border border-primary/40 bg-primary/10 flex items-center gap-2">
                    <div className="w-8 h-8 bg-bg-mute rounded-full flex items-center p-1 justify-center">
                        <HugeiconsIcon icon={CircleStar} size={20} className="text-primary" />
                    </div>
                    <div className="text-xs flex flex-col gap-0.5">
                        <span>Sign up and get 500 free points</span>
                        <span className="text-primary">JOIN REWARDS PROGRAM</span>
                    </div>
                </div>
                <Button className={"p-6 text-[16px] mt-6"}>
                    Place Order
                </Button>
                <span className="text-center mt-6 text-xs text-muted-foreground">
                    Need help with your order?
                </span>
            </div>
        </main>
    )
}
