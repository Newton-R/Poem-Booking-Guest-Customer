import { DashIntro } from "@/components/account/DashIntro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Book,
  Call,
  Chat01FreeIcons,
  CirclePlus,
  Clock,
  EllipsisIcon,
  EllipsisVertical,
  Menu01Icon,
  Paperclip,
  Send,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SupportCard = () => {
  return (
    <div className="p-4 flex flex-col gap-3 text-xs rounded-xl bg-white border border-border">
      <div className="w-full flex items-center justify-between">
        <span className="text-primary">#TK-8821</span>
        <span className="text-[10px] p-1 px-2 rounded-md bg-primary/40 font-bold">
          IN PROGRESS
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold">Double Booking at Kribi Resort</span>
        <p className="text-muted-foreground">
          I noticed two charges on my card for
        </p>
      </div>
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={Clock} size={16} />
        Updated 22m ago
      </div>
    </div>
  );
};

const SupportPage = () => {
  return (
    <main className="flex flex-col gap-4">
      <DashIntro
        heading={"Support Hub"}
        description={"How can we refine your Cameroonian journey today?"}
      >
        <Link href={"/account/support/create"}>
          <Button className={"p-5 px-7 rounded-full"}>
            <HugeiconsIcon icon={CirclePlus} size={18} />
            New support ticket
          </Button>
        </Link>
      </DashIntro>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-5">
        <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
          <div className="flex p-6 flex-col gap-5 border-border rounded-2xl border">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Active Tickets</span>
              <span className="bg-bg-mute p-1 rounded-full px-2 text-xs">
                3 Open
              </span>
            </div>
            <SupportCard />
            <SupportCard />
            <Link href={"/account/support/archive"}>
              <Button
                className={"p-6 w-full text-muted-foreground"}
                variant={"outline"}
              >
                VIEW ARCHIEVED TICKETS
              </Button>
            </Link>
          </div>
          <div className="flex gap-4">
            <div className="bg-bg-mute flex-1 gap-1 rounded-2xl p-6 flex flex-col">
              <HugeiconsIcon icon={Book} size={20} className="text-primary" />
              <span className="text-xs">Help Center</span>
            </div>
            <div className="bg-bg-mute flex-1 gap-1 rounded-2xl p-6 flex flex-col">
              <HugeiconsIcon
                icon={Chat01FreeIcons}
                size={20}
                className="text-primary"
              />
              <span className="text-xs">Live Chat</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-2 md:col-span-3 border border-border rounded-2xl overflow-hidden">
          <div className="w-full p-6 bg-white flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={"/default.png"}
                  width={200}
                  height={200}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5 text-muted-foreground">
                <span className="text-black">Amara (Senior Concierge)</span>
                <p className="text-xs">Typical reply time: 5 mins</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Call} size={17} />
              <HugeiconsIcon icon={EllipsisVertical} size={17} />
            </div>
          </div>
          <div className="mt-auto w-full p-6 bg-white flex flex-col">
            <div className="flex p-2 bg-primary/10 rounded-md items-center gap-2">
              <HugeiconsIcon icon={Paperclip} size={18} />
              <Input
                placeholder="Type your message here..."
                className="p-4 h-10"
              />
              <Button className={"rounded-md"} size={"icon-lg"}>
                <HugeiconsIcon icon={Send} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SupportPage;
