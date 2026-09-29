"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { useRegister } from "@/lib/public/useRegister";
import { RegistrationPayload } from "@/lib/types/auth";
import { Eye, EyeClosedIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const InitialData: RegistrationPayload = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
};

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationPayload>(InitialData);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate, isPending } = useRegister();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.data.message);
        router.push(`/auth/otp?phoneNumber=${formData.phoneNumber}`);
        setFormData(InitialData);
      },
      onError: (e) => {
        toast.error(e.message);
        console.log(e.message);
      },
    });
  };

  return (
    <div className="p-4 w-full text-[14px]">
      <form className="form-block" onSubmit={handleFormSubmit}>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">
            Start your curated journey across Cameroon.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-2.5 md:flex-row">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">
                First Name
              </label>
              <Input
                placeholder="Full Name"
                onChange={handleInputChange}
                name="firstName"
                disabled={isPending}
                className="p-5 px-4"
                value={formData.firstName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Last Name</label>
              <Input
                placeholder="Last Name"
                onChange={handleInputChange}
                name="lastName"
                disabled={isPending}
                value={formData.lastName}
                className="p-5 px-4"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Email Address
            </label>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              disabled={isPending}
              value={formData.email}
              onChange={handleInputChange}
              className="p-5 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Phone Number
            </label>
            <Input
              placeholder="Phone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              type="number"
              disabled={isPending}
              className="p-5 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Password</label>
            <div className="w-full relative flex items-center justify-center">
              <Input
                disabled={isPending}
                placeholder="Password"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                className="p-5 px-4"
              />
              <Button
                size={"icon-sm"}
                onClick={() => setShowPassword(!showPassword)}
                variant={"ghost"}
                className="absolute cursor-pointer rounded-full text-primary hover:text-primary right-1 "
              >
                {showPassword ? (
                  <HugeiconsIcon icon={Eye} size={14} />
                ) : (
                  <HugeiconsIcon icon={EyeClosedIcon} size={14} />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className={"w-full p-6 rounded-md"}
          >
            {isPending ? <Loader /> : "Sign Up"}
          </Button>
        </div>
        {/* <div className="flex text-xs text-muted-foreground mt-4 items-center gap-2">
          <div className="flex-1 h-px bg-border" />
          <span>OR SIGNUP WITH</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="flex md:flex-row  flex-col gap-2.5 mt-4">
          <Button className={"rounded-md flex-1 p-3 h-11"} variant={"outline"}>
            Google
          </Button>
          <Button
            className={"rounded-md h-11 shrink-0 p-3 flex-1"}
            variant={"outline"}
          >
            Apple
          </Button>
        </div> */}
        <span className="text-center">
          Already have an account ?{" "}
          <Link href={"/auth"}>
            <Button variant={"link"}>Login</Button>
          </Link>
        </span>
      </form>
    </div>
  );
};
