import { AppartmentDetailsBlock } from "@/components/appartements/details/AppartmentDetailsBlock";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default async function AppartmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

  return <AppartmentDetailsBlock id={id} />;
}
