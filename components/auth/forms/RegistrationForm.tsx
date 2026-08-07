import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export const RegistrationForm = () => {
  return (
    <div className="p-4 w-full text-[14px]">
      <form className="form-block">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">
            Start your curated journey across Cameroon.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Full Name</label>
            <Input placeholder="Full Name" className="p-5 px-4" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Email Address
            </label>
            <Input placeholder="Email" type="number" className="p-5 px-4" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Phone Number
            </label>
            <Input placeholder="Phone" type="number" className="p-5 px-4" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Password</label>
            <Input
              placeholder="Password"
              type="password"
              className="p-5 px-4"
            />
          </div>

          <Button className={"w-full p-6 rounded-md"}>Sign Up</Button>
        </div>
        <div className="flex text-xs text-muted-foreground mt-4 items-center gap-2">
          <div className="flex-1 h-px bg-border" />
          <span>OR SIGNUP WITH</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="flex md:flex-row  flex-col gap-2.5 mt-4">
          <Button className={"rounded-md flex-1 h-11"} variant={"outline"}>
            Google
          </Button>
          <Button className={"rounded-md h-11 flex-1"} variant={"outline"}>
            Apple
          </Button>
        </div>
        <span className="text-center">
          Don't have an account ?{" "}
          <span className="text-primary">Create Account</span>
        </span>
      </form>
    </div>
  );
};
