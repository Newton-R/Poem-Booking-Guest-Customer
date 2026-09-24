import { EmptyBusRoutes } from "@/components/emptystuff";
import { LoadingDetailedBus } from "@/components/loaders/bus/LoadingDetailedBus";
import { AgencyCard } from "@/components/ui/busrouteCard";
import { Agency } from "@/lib/types/agency";
import { useAgencies } from "@/lib/useAgency";
import { useEffect } from "react";

export const Hubs = ({
  agencies,
  isLoading,
}: {
  agencies: Agency[];
  isLoading: boolean;
}) => {
  const { setAgency } = useAgencies();
  useEffect(() => {
    if (agencies) {
      setAgency(agencies);
    }
  }, [agencies]);

  if (isLoading) {
    return (
      <div className="container-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <LoadingDetailedBus key={i} />
        ))}
      </div>
    );
  }

  if (agencies.length === 0) {
    return <EmptyBusRoutes />;
  }

  return (
    <section>
      <div className="grid container-x grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agencies.map((agency, i) => (
          <AgencyCard agency={agency} key={i} />
        ))}
      </div>
    </section>
  );
};
