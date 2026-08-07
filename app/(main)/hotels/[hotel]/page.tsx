import { DetailsContent } from "@/components/hotels/details/DetailsContent";
import { DetailsHero } from "@/components/hotels/details/DetailsHero";
import React from "react";

const HotelsDetails = () => {
  return (
    <div className="flex flex-col gap-20">
      <DetailsHero />
      <DetailsContent />
    </div>
  );
};

export default HotelsDetails;
