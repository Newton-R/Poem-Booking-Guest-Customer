import { AppartmentDetailsBlock } from "@/components/appartements/details/AppartmentDetailsBlock";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { apartments } from "@/lib/data";
import { Apartment } from "@/lib/types";
import { AlertTriangle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export default async function AppartmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const Apartment = apartments.find((a) => a.id === id);

  // if (!Apartment) {
  //   return (
  //     <div className="mt-[calc(var(--nav-height)+20px)]">
  //       <Empty>
  //         <EmptyHeader>
  //           <EmptyMedia variant="icon">
  //             <HugeiconsIcon icon={AlertTriangle} size={40} />
  //           </EmptyMedia>
  //           <EmptyTitle>Apartment not found</EmptyTitle>
  //           <EmptyDescription>
  //             This Apartment doesn't seem to exist please try refreshing the
  //             page or going back
  //           </EmptyDescription>
  //         </EmptyHeader>
  //       </Empty>
  //     </div>
  //   );
  // }

  return (
    <AppartmentDetailsBlock
      id={id}
      apartment={Apartment ?? ({} as Apartment)}
    />
  );
}
