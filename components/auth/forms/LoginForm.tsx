import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export const LoginForm = () => {
  return (
    <div className="p-4 w-full text-[14px]">
      <form className="form-block">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue your curated journey.
          </p>
          <div className="flex flex-col gap-2.5 mt-4">
            <Button className={"rounded-md h-11"} variant={"outline"}>
              Continue with Google
            </Button>
            <Button className={"rounded-md h-11"} variant={"outline"}>
              Continue with Apple
            </Button>
          </div>
          <div className="flex text-xs text-muted-foreground mt-4 items-center gap-2">
            <div className="flex-1 h-px bg-border" />
            <span>OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Phone Number
            </label>
            <Input placeholder="Number" type="number" className="p-5 px-4" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Password</label>
            <Input placeholder="Number" type="password" className="p-5 px-4" />
          </div>
          <div className="w-full flex justify-between my-4 items-center">
            <span className="flex items-center gap-2">
              <Input type="checkbox" className="w-4 h-4" />
              Keep me signed In
            </span>
            <span className="text-primary">Forgot Password ?</span>
          </div>
          <Button className={"w-full p-6 rounded-md"}>Sign In</Button>
        </div>
        <span className="text-center">
          Don't have an account ?{" "}
          <span className="text-primary">Create Account</span>
        </span>
      </form>
    </div>
  );
};
