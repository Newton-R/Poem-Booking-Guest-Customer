import React from "react";
import { DashIntro } from "../DashIntro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown,
  CalendarCheck,
  Circle,
  CircleAlert,
  CustomerService01Icon,
  Down,
  Download,
  Filter,
  Plane,
  Search,
  TrendingUp,
} from "@hugeicons/core-free-icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";

const UsedHistory = () => {
  return (
    <div className="w-full rounded-2xl flex flex-col border-border border overflow-hidden">
      <div className="p-2 bg-bg-mute/10 border-b border-border md:p-6 flex flex-col md:flex-row gap-2 justify-between items-start md:items-end">
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold">Redemption Logs</span>
          <p className="text-xs text-muted-foreground">
            Showing last 12 months of activity
          </p>
        </div>
        <div className="flex gap-4">
          <Button className={"p-4"} variant={"outline"}>
            <HugeiconsIcon icon={Download} size={14} />
            Filters
          </Button>
          <Button className={"p-4"} variant={"outline"}>
            <HugeiconsIcon icon={Download} size={14} />
            Export CSV
          </Button>
        </div>
      </div>
      <table className="">
        <thead className="bg-bg-mute/50 border-b border-border">
          <tr>
            <td className="p-6">Date</td>
            <td>Description</td>
            <td>Service Type</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-6">Oct 24, 2023</td>
            <td>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold">Booking Discount Applied</span>
                <span className="text-muted-foreground">
                  Hotel Akwa Palace, Douala
                </span>
              </div>
            </td>
            <td>
              <span className="bg-primary/20 p-1 px-2 rounded-full text-xs text-primary font-bold">
                Booking Discount
              </span>
            </td>
            <td>
              <span className="text-destructive">-2,500 XP</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="p-6 flex justify-center text-primary bg-bg-mute/40 items-center gap-2">
        <span>LOAD MORE ENTRIES</span>
        <HugeiconsIcon icon={ArrowDown} size={18} />
      </div>
    </div>
  );
};

interface FeatCard {
  icon: IconSvgObject;
  heading: string;
  description: string;
}

const SmallFeatCard = ({ icon, heading, description }: FeatCard) => {
  return (
    <div className="p-6 rounded-xl bg-bg-mute/40 border border-border flex flex-col gap-2">
      <HugeiconsIcon icon={icon} size={20} className="text-primary" />
      <span>{heading}</span>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

const EarnedHistory = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row w-full md:w-fit gap-3">
          <InputGroup className="rounded-full h-9">
            <InputGroupInput className="p-2" placeholder="Search..." />
            <InputGroupAddon>
              <HugeiconsIcon icon={Search} size={20} />
            </InputGroupAddon>
          </InputGroup>
          <Button className={"p-4 rounded-full"} variant={"outline"}>
            <HugeiconsIcon icon={Filter} /> Filter by service
          </Button>
        </div>
        <Button
          className={"bg-secondary-foreground text-white p-4 rounded-full"}
        >
          <HugeiconsIcon icon={Download} size={20} />
          Export Statement
        </Button>
      </div>
      <div className="border-border border rounded-2xl flex flex-col overflow-hidden">
        <table>
          <thead className="border-b border-border bg-bg-mute/30">
            <tr>
              <td className="p-6">Date</td>
              <td>Description</td>
              <td>Category</td>
              <td>Points Gained</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-6">Oct 24, 2023</td>
              <td>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold">Booking Discount Applied</span>
                  <span className="text-muted-foreground">
                    Hotel Akwa Palace, Douala
                  </span>
                </div>
              </td>
              <td>
                <span className="bg-primary/20 p-1 px-2 rounded-full text-xs text-primary font-bold">
                  Booking Discount
                </span>
              </td>
              <td>
                <span className="text-destructive">-2,500 XP</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SmallFeatCard
          icon={TrendingUp}
          heading="Next Tier in 2,550 XP"
          description="Book 2 more nights in Douala or
Yaoundé to reach Platinum level."
        />
        <SmallFeatCard
          icon={CalendarCheck}
          heading="Points Expiry"
          description="Your current balance is protected
until December 2025. Keep
traveling!"
        />
        <SmallFeatCard
          icon={CustomerService01Icon}
          heading="Missing Points"
          description="Points usually appear 24h after
check-out. Contact support for
help."
        />
      </div>
    </div>
  );
};

const ExpiredHistory = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-border border rounded-2xl flex flex-col overflow-hidden">
        <table>
          <thead className="border-b border-border bg-bg-mute/30">
            <tr>
              <td className="p-6">Expiration Date</td>
              <td>DIgital Source</td>
              <td>Points Lost</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-6">Oct 24, 2023</td>
              <td>
                <div className="flex gap-1.5 items-center">
                  <div className="p-2 rounded-md flex bg-primary/20">
                    <HugeiconsIcon
                      icon={Plane}
                      size={20}
                      strokeWidth={2}
                      className="text-secondary-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold">Booking Discount Applied</span>
                    <span className="text-muted-foreground">
                      Hotel Akwa Palace, Douala
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-destructive">-460xp</span>
              </td>
              <td>
                <span className="text-destructive p-1 px-2 rounded-full bg-destructive/10">
                  -2,500 XP
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex border-l-3 p-6 border-primary bg-primary/20 rounded-2xl flex-col gap-4 md:flex-row">
        <HugeiconsIcon
          icon={CircleAlert}
          size={50}
          className="text-primary"
          strokeWidth={2}
        />
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground font-bold">
            Avoid losing points
          </span>
          <p className="text-xs text-muted-foreground">
            Points earned through travel and bookings expire exactly 12 months
            after your last activity. Stay active by booking or redeeming your
            points for exclusive vouchers to keep your balance growing.
          </p>
          <span className="text-primary">Learn more about XP policies</span>
        </div>
      </div>
    </div>
  );
};

export const AllHistory = () => {
  return (
    <table className="rounded-2xl overflow-hidden w-full">
      <thead className="bg-bg-mute text-start">
        <tr className="text-xs text-start text-muted-foreground">
          <td className="p-4">DATE</td>
          <td>TRANSACTION</td>
          <td>POINTS</td>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr>
          <td className="p-4">OCT 12, 2024</td>
          <td>Booking Douala Marina Suites</td>
          <td className="text-green-500">450 XP</td>
        </tr>
        <tr>
          <td className="p-4">OCT 12, 2024</td>
          <td>Booking Douala Marina Suites</td>
          <td className="text-green-500">450 XP</td>
        </tr>
      </tbody>
    </table>
  );
};

export const PointsHistoryBlock = () => {
  return (
    <div className="flex flex-col gap-6">
      <DashIntro
        heading={"Points History"}
        description={
          "Track your journey across Cameroon. All redemptions are applied directly to POEM bookings and internal service upgrades."
        }
      >
        <Button className={"rounded-full p-4 text-xs"}>HOW TO EARN XP</Button>
      </DashIntro>
      <Tabs className={"flex flex-col gap-6"}>
        <div className="">
          <TabsList
            variant={"line"}
            className={"mb-6 pb-4 border-b border-border"}
          >
            <TabsTrigger value={"all"}>All</TabsTrigger>
            <TabsTrigger value={"used"}>Used</TabsTrigger>
            <TabsTrigger value={"earned"}>Earned</TabsTrigger>
            <TabsTrigger value={"expired"}>Expired</TabsTrigger>
          </TabsList>
          <TabsContent value={"all"}>
            <AllHistory />
          </TabsContent>
          <TabsContent value={"used"}>
            <UsedHistory />
          </TabsContent>
          <TabsContent value={"earned"}>
            <EarnedHistory />
          </TabsContent>
          <TabsContent value={"expired"}>
            <ExpiredHistory />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
