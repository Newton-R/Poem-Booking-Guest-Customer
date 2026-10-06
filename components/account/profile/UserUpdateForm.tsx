"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Pen, Pen01FreeIcons } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/Loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ProfileFormValues } from "@/lib/types/user";

interface ProfileUpdateDialogProps {
  defaultValues: ProfileFormValues;
  onSubmit: (values: ProfileFormValues) => Promise<void> | void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProfileUpdateDialog({
  defaultValues,
  onSubmit,
}: ProfileUpdateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState<ProfileFormValues>(defaultValues);
  const [errors, setErrors] = useState<Partial<ProfileFormValues>>({});

  const handleChange = (field: keyof ProfileFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // reset form to latest defaults whenever dialog opens
      setValues(defaultValues);
      setErrors({});
    }
    setIsOpen(open);
  };

  const validate = (): boolean => {
    const nextErrors: Partial<ProfileFormValues> = {};

    if (!values.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    }
    if (!values.lastName.trim()) {
      nextErrors.lastName = "Last name is required";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!values.preferredLanguage) {
      nextErrors.preferredLanguage = "Select a preferred language";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(values);
      toast.success("Profile updated successfully");
      setIsOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button className="flex gap-1 items-center text-xs h-9 cursor-pointer">
          <HugeiconsIcon icon={Pen01FreeIcons} size={18} />
          Update Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update Profile
          </DialogTitle>
          <DialogDescription>
            Make changes to your personal details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="First name"
                value={values.firstName}
                className="h-9"
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {errors.firstName && (
                <span className="text-xs text-destructive">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                className="h-9"
                placeholder="Last name"
                value={values.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              {errors.lastName && (
                <span className="text-xs text-destructive">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              className="h-9"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <span className="text-xs text-destructive">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="preferredLanguage">Preferred Language</Label>
            <Select
              value={values.preferredLanguage}
              onValueChange={(value) =>
                handleChange("preferredLanguage", value ?? "")
              }
            >
              <SelectTrigger className="w-full min-h-9" id="preferredLanguage">
                <SelectValue
                  className={"h-9"}
                  placeholder="Select a language"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (EN)</SelectItem>
                <SelectItem value="fr">French (FR)</SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredLanguage && (
              <span className="text-xs text-destructive">
                {errors.preferredLanguage}
              </span>
            )}
          </div>

          <DialogFooter className="mt-2 flex flex-row gap-2">
            <DialogClose>
              <Button type="button" variant="outline" className="flex-1 h-9">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-9"
            >
              {isSubmitting ? <Loader /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
