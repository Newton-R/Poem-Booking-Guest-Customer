import React from "react";

export const AllBusHero = () => {
  return (
    <section className="container-x mt-(--nav-height) items-center justify-center flex flex-col text-center h-120">
      <h1 className="text-3xl font-bold mb-4">Explore all Routes</h1>
      <p className="w-full md:w-[70%] text-center">
        Seamless inter-city connections across the heart of Cameroon. Experience
        curated comfort from departure to destination.
      </p>
      <div className="w-full md:w-[80%] p-6 grid grid-cols-1 mt-6 md:grid-cols-2 bg-white rounded-2xl lg:grid-cols-4 gap-6">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[14px]">Origin</span>
        </div>
      </div>
    </section>
  );
};
