import React from "react";

export const Footer = () => {
  const links = [
    {
      head: "Discover",
      links: [
        {
          label: "Hotels",
          link: "",
        },
        {
          label: "Appartments",
          link: "",
        },
        {
          label: "Bus Routes",
          link: "",
        },
      ],
    },
    {
      head: "Discover",
      links: [
        {
          label: "Hotels",
          link: "",
        },
        {
          label: "Appartments",
          link: "",
        },
        {
          label: "Bus Routes",
          link: "",
        },
      ],
    },
    {
      head: "Settings",
      links: [
        {
          label: "Hotels",
          link: "",
        },
        {
          label: "Appartments",
          link: "",
        },
        {
          label: "Bus Routes",
          link: "",
        },
      ],
    },
  ];
  return (
    <footer className="py-20 mt-20 flex flex-col gap-8 bg-[#e6e2d8]">
      <div className="container-x flex  gap-2 flex-col">
        <div className="w-full flex border-b border-border justify-between">
          <div className="flex flex-col gap-6 w-[40%]">
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
                  <span className="text-muted-foreground" key={i}>
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex pt-4 border-border border justify-between items-center">
          <span>
            &copy; {new Date().getFullYear()} POEM Booking platform. All rights
            Reserved
          </span>
          <span>LinkedIn</span>
        </div>
      </div>
    </footer>
  );
};
