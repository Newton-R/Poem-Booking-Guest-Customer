import { IdVerifiedIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const Message = () => {
  const stats = [
    {
      icon: IdVerifiedIcon,
      head: "Verified Properties",
      description:
        "Every appartment is inspected by our team to guarantee comfort and safety.",
    },
    {
      icon: IdVerifiedIcon,
      head: "Verified Properties",
      description:
        "Every appartment is inspected by our team to guarantee comfort and safety.",
    },
    {
      icon: IdVerifiedIcon,
      head: "Verified Properties",
      description:
        "Every appartment is inspected by our team to guarantee comfort and safety.",
    },
  ];

  const methods = [
    {
      icon: "",
      label: "PoemPay",
    },
    {
      icon: "",
      label: "MTN",
    },
    {
      icon: "",
      label: "Orange",
    },
    {
      icon: "",
      label: "VISA / MASTER",
    },
  ];
  return (
    <section className="flex flex-col gap-4">
      <div className="w-full py-20 bg-secondary-foreground">
        <div className="container-x text-white flex justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <h2>The POEM standard</h2>
            <div className="flex flex-col gap-4">
              {stats.map((stat, i) => (
                <div className="flex gap-2" key={i}>
                  <HugeiconsIcon className="text-primary" icon={stat.icon} />
                  <div className="flex flex-col gap-0.5">
                    <span>{stat.head}</span>
                    <p className="text-[14px] text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 w-full max-w-150 rounded-2xl text-black flex flex-col bg-background">
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-xl font-bold">Get Exclusive Deals</span>
              <p className="text-[14px] text-muted-foreground">
                Join our mailing list for early access to new appartment
                launches and seasonal discounts.
              </p>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Input
                placeholder="Your email Address"
                className="p-6 px-3 bg-white"
              />
              <Button
                className={
                  "p-6 w-full flex items-center text-[14px] bg-secondary-foreground hover:bg-secondary-foreground/90 text-center"
                }
              >
                Subscribe Now
              </Button>
              <p className="text-center text-muted-foreground text-xs mt-4">
                We respect your privacy. Unsubscribe anytime
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-x flex flex-col gap-6 text-center justify-center items-center">
        <span>SECURE PAYMENT PARTNERS</span>
        <div className="w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, i) => (
            <div
              key={i}
              className="p-2 text-muted-foreground bg-white rounded-md border border-border flex gap-2 items-center"
            >
              {method.icon}
              {method.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
