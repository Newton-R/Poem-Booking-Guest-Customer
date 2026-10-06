import Link from "next/link";
import React from "react";
import { PlatformReviewsFormModal } from "../ReviewsFormModal";

export const Footer = () => {
  const links = [
    {
      head: "Discover",
      links: [
        {
          label: "Hotels",
          link: "/hotels",
        },
        {
          label: "Appartments",
          link: "/appartment",
        },
        {
          label: "Bus Routes",
          link: "/buses",
        },
        {
          label: "Restaurants",
          link: "/restaurants",
        },
      ],
    },
    {
      head: "Support",
      links: [
        {
          label: "Support Centre",
          link: "",
        },
        {
          label: "Terms & Conditions",
          link: "",
        },
        {
          label: "Privacy Policy",
          link: "",
        },
      ],
    },
    // {
    //   head: "Settings",
    //   links: [
    //     {
    //       label: "Hotels",
    //       link: "",
    //     },
    //     {
    //       label: "Appartments",
    //       link: "",
    //     },
    //     {
    //       label: "Bus Routes",
    //       link: "",
    //     },
    //   ],
    // },
  ];
  return (
    <footer className="py-20 hidden mt-20 lg:flex flex-col gap-8 bg-[#e6e2d8]">
      <div className="container-x flex  gap-2 flex-col">
        <div className="w-full flex flex-col lg:flex-row border-b border-border justify-between">
          <div className="flex flex-col gap-6 w-full lg:w-[40%]">
            <h2 className="text-2xl font-bold">POEM</h2>
            <p>
              Curated comfort in Cameroon. Your premuim platform for travel and
              hospitality across the nation.
            </p>
          </div>
          {links.map((link, i) => (
            <div className="flex flex-col gap-6" key={i}>
              <span className="font-bold">{link.head}</span>
              <div className="flex flex-col gap-2">
                {link.links.map((l, i) => (
                  <Link
                    href={l.link}
                    className="text-muted-foreground hover:text-primary text-[14px]"
                    key={i}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex pt-6 border-secondary-foreground/40 mt-4 text-[14px] text-muted-foreground border-t justify-between items-center">
          <span>
            &copy; {new Date().getFullYear()} POEM Booking platform. All rights
            Reserved
          </span>
          <div className="flex items-center gap-4">
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
