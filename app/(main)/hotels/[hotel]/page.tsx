import { DetailsContent } from "@/components/hotels/details/DetailsContent";
import { DetailsHero } from "@/components/hotels/details/DetailsHero";
import { HotelsDetailsBlock } from "@/components/hotels/details/HotelsDetailsBlock";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { hotels } from "@/lib/data";
import { AlertTriangle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export default async function HotelsDetails({
  params,
}: {
  params: Promise<{ hotel: string }>;
}) {
  const { hotel } = await params;
  const Hotel = hotels.find((h) => h.id === hotel);

  if (!Hotel) {
    return (
      <div className="mt-[calc(var(--nav-height)+20px)]">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={AlertTriangle} size={40} />
            </EmptyMedia>
            <EmptyTitle>Hotel not found</EmptyTitle>
            <EmptyDescription>
              This hotel doesn't seem to exist please try refreshing the page or
              going back
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <HotelsDetailsBlock Hotel={Hotel} />
  );
}
