"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { useLogin } from "@/lib/public/useRegister";
import { authKeys } from "@/lib/query-keys/user";
import { LoginPayload } from "@/lib/types/auth";
import { useTokens } from "@/lib/useTokens";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useSessionModal } from "@/lib/useSessionModal";

const InitialData: LoginPayload = {
  phoneNumber: "",
  password: "",
};

export const LoginForm = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useLogin();
  const [formData, setFormData] = useState<LoginPayload>(InitialData);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { setTokens } = useTokens();
  const { closeModal } = useSessionModal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (response) => {
        toast.success("Login successfull 🎉");
        setTokens({
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken,
        });
        Cookies.set(
          "token",
          JSON.stringify({
            refreshToken: response.data.refreshToken,
            accessToken: response.data.accessToken,
          }),
          {
            secure: true,
            expires: 7,
            sameSite: "strict",
          },
        );
        closeModal();

        router.push(callbackUrl ? callbackUrl : "/account");
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      },
      onError: (e) => {
        toast.error(e.message ?? "There was an error login in");
        console.log(e);
      },
    });
  };

  return (
    <div className="p-4 w-full text-[14px]">
      <form onSubmit={handleFormSubmit} className="form-block">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue your curated journey.
          </p>
          {/* <div className="flex flex-col gap-2.5 mt-4">
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
          </div> */}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Phone Number
            </label>
            <Input
              disabled={isPending}
              onChange={handleInputChange}
              value={formData.phoneNumber}
              name="phoneNumber"
              placeholder="Number"
              type="number"
              className="p-5 px-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Password</label>
            <Input
              disabled={isPending}
              onChange={handleInputChange}
              value={formData.password}
              name="password"
              placeholder="Password"
              type="password"
              className="p-5 px-4"
            />
          </div>
          <div className="w-full flex justify-between my-4 items-center">
            <span className="flex items-center gap-2">
              <Input type="checkbox" className="w-4 h-4" />
              Keep me signed In
            </span>
            <Link href={"/auth/forgot-password"}>
              <Button variant={"link"}>Forgot Password ?</Button>
            </Link>
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className={"w-full p-6 rounded-md"}
          >
            {isPending ? <Loader /> : "Sign In"}
          </Button>
        </div>
        <span className="text-center">
          Don't have an account ?{" "}
          <Link href={"/auth/register"}>
            <Button type="button" variant={"link"}>
              Create Account
            </Button>
          </Link>
        </span>
      </form>
    </div>
  );
};

export const LoginSuspenseBlock = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};
