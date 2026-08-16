import React from "react";

interface DashIntroCont {
  children?: React.ReactNode;
  heading: String;
  description: String;
}

export const DashIntro = ({
  children,
  heading,
  description,
}: DashIntroCont) => {
  return (
    <div className="flex flex-col md:flex-row pb-4 border-b border-border gap-4 justify-between items-end">
      <div className="flex gap-1 flex-col">
        <h1 className="text-2xl md:text-4xl font-bold">{heading}</h1>
        <p className="text-muted-foreground text-[14px]">{description}</p>
      </div>
      {children}
    </div>
  );
};
