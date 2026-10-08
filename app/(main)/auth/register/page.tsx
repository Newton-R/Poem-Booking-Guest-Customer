import {
  RegistrationForm,
  SuspenseRegistration,
} from "@/components/auth/forms/RegistrationForm";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="mt-(--mobile-nav-height)  md:mt-[calc(var(--nav-height)+24px)]">
      <SuspenseRegistration />
    </div>
  );
};

export default SignUpPage;
