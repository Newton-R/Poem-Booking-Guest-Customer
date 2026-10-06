import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { CancelProps, useCancelBooking } from '@/lib/public/form/useCancelBooking';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01FreeIcons } from '@hugeicons/core-free-icons';
import { Loader } from './ui/Loader';
import { useCancelCustomerBooking } from '@/lib/bearer/form/useCancelCustomerBooking';

interface CancelBookingModal {
    bookingReference: string;
    phoneNumber: string,
    redirectTo?: string,
    userRole: "guest" | "customer"
}

export const CancelBookingModal = ({ bookingReference, phoneNumber, redirectTo, userRole }: CancelBookingModal) => {
    const { mutate, isPending } = useCancelBooking();
    const { mutate: customerCancel, isPending: CustomerCancelling } = useCancelCustomerBooking()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const cancelData: CancelProps = { ref: bookingReference, number: phoneNumber }
    const mutatation = userRole === "customer" ? customerCancel : mutate
    const handleCancel = () => {
        mutatation(
            cancelData,
            {
                onSuccess: (response) => {
                    console.log({ response })
                    toast.success("Booking cancelled successfully..");
                    router.push(redirectTo ?? "/");
                },
                onError: (e) => {
                    console.log({ error: e })
                    toast.error(e.message ?? "Something went wrong");
                },
            },
        );
    };
    return (
        <Dialog open={isOpen}>
            <DialogTrigger className={"w-full"}>
                <Button
                    onClick={() => setIsOpen(true)}
                    className={"w-full h-10"}
                    variant={"destructive"}
                >
                    <HugeiconsIcon icon={Cancel01FreeIcons} /> Cancel Booking
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogTitle className={"text-xl font-bold"}>
                    Cancel Booking
                </DialogTitle>
                <DialogDescription>
                    Are you sure you want to cancel? This action can't be undone.
                </DialogDescription>
                <DialogFooter>
                    <Button
                        onClick={handleCancel}
                        type="button"
                        disabled={isPending || CustomerCancelling}
                        variant={"destructive"}
                        className={"h-9 min-w-30"}
                    >
                        {isPending || CustomerCancelling ? <Loader /> : "Cancel Booking"}
                    </Button>
                    <DialogClose>
                        <Button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className={"p-2 w-full h-9"}
                            variant={"outline"}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
