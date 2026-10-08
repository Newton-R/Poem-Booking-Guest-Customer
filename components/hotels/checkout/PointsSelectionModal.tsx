"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Gift } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useGetReferalCode } from "@/lib/bearer/useGetReferalCode";
import { PointsSelectionSkeleton } from "@/components/loaders/account/dialogLoader";

interface PointsSelectionDialogProps {
  orderTotal: number; // points can't exceed what's payable
  onApply: (points: number) => void;
}

const QUICK_PERCENTS = [25, 50, 75, 100];

export function PointsSelectionDialog({
  orderTotal,
  onApply,
}: PointsSelectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const { data: referralData, isLoading: referralLoading } =
    useGetReferalCode();

  const maxRedeemable = Math.min(
    Number(referralData?.data.stats.pointsEarned ?? 0),
    orderTotal,
  );
  const hasPoints = maxRedeemable > 0;

  const clamp = (value: number) =>
    Math.max(0, Math.min(Math.floor(value) || 0, maxRedeemable));

  const handleApply = () => {
    onApply(points);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) setPoints(0);
        setIsOpen(open);
      }}
    >
      <DialogTrigger className={"w-full"}>
        <Button variant="outline" className="h-9 w-full text-xs gap-1.5">
          <HugeiconsIcon icon={Gift} size={16} />
          Use points
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Use your points
          </DialogTitle>
          <DialogDescription>
            Redeem points to reduce what you pay for this booking.
          </DialogDescription>
        </DialogHeader>

        {referralLoading ? (
          <PointsSelectionSkeleton />
        ) : !referralData ? (
          <> </>
        ) : (
          <>
            {/* Balance card */}
            <div className="rounded-xl bg-secondary-foreground text-white p-4 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs opacity-70">AVAILABLE POINTS</span>
                <span className="text-2xl font-bold text-primary">
                  {referralData.data.stats.pointsEarned.toLocaleString()} px
                </span>
              </div>
              <span className="text-[11px] p-1 px-2 rounded-full bg-white/10">
                1 px = 1 XAF
              </span>
            </div>

            {hasPoints ? (
              <div className="flex flex-col gap-4">
                {/* Input + max */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="points"
                    className="text-xs text-muted-foreground"
                  >
                    POINTS TO USE
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="points"
                      type="number"
                      min={0}
                      max={maxRedeemable}
                      value={points || ""}
                      placeholder="0"
                      onChange={(e) => setPoints(clamp(Number(e.target.value)))}
                      className="h-11 text-lg font-bold"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 px-4"
                      onClick={() => setPoints(maxRedeemable)}
                    >
                      Max
                    </Button>
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min={0}
                  max={maxRedeemable}
                  value={points}
                  onChange={(e) => setPoints(clamp(Number(e.target.value)))}
                  className="w-full accent-primary"
                  aria-label="Points to use"
                />

                {/* Quick select */}
                <div className="grid grid-cols-4 gap-2">
                  {QUICK_PERCENTS.map((percent) => {
                    const value = Math.floor((maxRedeemable * percent) / 100);
                    return (
                      <button
                        key={percent}
                        type="button"
                        onClick={() => setPoints(value)}
                        className={cn(
                          "rounded-md border border-border py-2 text-xs font-semibold transition-colors",
                          points === value &&
                            "bg-primary/20 border-primary text-primary",
                        )}
                      >
                        {percent === 100 ? "Max" : `${percent}%`}
                      </button>
                    );
                  })}
                </div>

                {/* Summary */}
                <div className="rounded-xl bg-bg-mute p-4 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-bold text-green-600">
                      -{points.toLocaleString()} XAF
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Points remaining
                    </span>
                    <span className="font-semibold">
                      {(
                        Number(referralData.data.stats.pointsEarned) - points
                      ).toLocaleString()}{" "}
                      px
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border text-sm">
                    <span className="font-semibold">New total</span>
                    <span className="font-bold text-primary">
                      {(orderTotal - points).toLocaleString()} XAF
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                You don't have any points to redeem yet.
              </p>
            )}
          </>
        )}

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-10"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1 h-10"
            disabled={!hasPoints || points === 0}
            onClick={handleApply}
          >
            Apply points
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
