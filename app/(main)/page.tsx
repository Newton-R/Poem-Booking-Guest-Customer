import { Destinations } from "@/components/home/Destination";
import { ExclusiveOffers } from "@/components/home/ExOffers";
import { Footer } from "@/components/home/Footer";
import { HomeHero } from "@/components/home/Hero";
import { Message } from "@/components/home/Message";
import { Restaurants } from "@/components/home/restaurants";
import { TopRated } from "@/components/home/TopRated";
import { HomeNavbar } from "@/components/ui/home_nav";
import { HotelCard } from "@/components/ui/hotelcard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <HomeHero />
      <TopRated />
      <Restaurants />
      <ExclusiveOffers />
      <Destinations />
      <Message />
    </main>
  );
}
