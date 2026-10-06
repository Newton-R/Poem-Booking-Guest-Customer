"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ThumbsUp } from "@hugeicons/core-free-icons";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { GeneralReviewGuestPayload } from "@/lib/types/reviews";
import { useSubmitReview } from "@/lib/public/form/useReview";
import { toast } from "sonner";
import { Loader } from "./ui/Loader";
import { useReviewStore } from "@/lib/useReviewState";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  service: "hotel" | "apartment" | "restaurant" | "bus";
  targetId: string;
}

export const PlatformReviewsFormModal = ({
  service,
  targetId,
}: ReviewFormProps) => {
  const { isOpen, close, open } = useReviewStore();
  const [formdata, setFormData] = useState<GeneralReviewGuestPayload>({
    comment: "",
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    rating: 1,
    serviceType: service,
    targetId: targetId,
  });
  const { mutate, isPending } = useSubmitReview();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formdata, {
      onSuccess: (response) => {
        toast.success("Review submitted 🎉");
        close();
        console.log({ response: response });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log({ review_error: error });
      },
    });
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger className={"items-start flex justify-items-start"}>
        <Button onClick={() => open()} className={"p-5"}>
          <HugeiconsIcon icon={ThumbsUp} />
          Rate Us!
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className={"p-6"}>
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
          <DialogDescription>Tell us about your experience.</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-4 justify-between items-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: n }))
                  }
                  className={cn(
                    "w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center",
                    formdata.rating === n && "bg-primary text-white font-bold",
                  )}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={formdata.comment}
              onChange={handleInput}
              name="comment"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName">Full name</Label>
            <Input
              id="customerName"
              onChange={handleInput}
              name="customerName"
              value={formdata.customerName}
              className="h-9"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              className="h-9"
              onChange={handleInput}
              value={formdata.customerEmail}
              name="customerEmail"
              type="email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone">Phone</Label>
            <Input
              id="customerPhone"
              className="h-9"
              name="customerPhone"
              onChange={handleInput}
              value={formdata.customerPhone}
              type="tel"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={"outline"}
              className={"h-9"}
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="flex-1 h-9">
              {isPending ? <Loader /> : "Submit review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
