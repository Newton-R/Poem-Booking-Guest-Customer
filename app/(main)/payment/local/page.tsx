import {
  PaymentinfoBlock,
  PaymentInfoSuspenseBlock,
} from "@/components/hotels/checkout/PaymentinfoBlock";
import React from "react";

const Infopage = () => {
  return (
    <div className="py-[calc(var(--nav-height)+24px)]">
      <PaymentInfoSuspenseBlock />
    </div>
  );
};

export default Infopage;
