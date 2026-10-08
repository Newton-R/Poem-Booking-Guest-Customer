export interface RegistrationPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  referralCode?: string;
}

export interface RegistrationResponse {
  success: boolean;
  statusCode: number;
  data: { userId: string; message: string };
  timestamp: string;
}

export interface OTPPayload {
  phoneNumber: string;
  otp: string;
}

export interface OTPResponse {
  success: boolean;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    message: string;
  };
  timestamp: string;
}

export interface OTPResendPayload {
  phoneNumber: string;
}

export interface ForgotPasswordPayload {
  phoneNumber: string;
}

export interface ResetPasswordPayload {
  phoneNumber: string;
  otp: string;
  newPassword: string;
}

// Response types

export interface OTPResendResponse {
  success: boolean;
  statusCode: number;
  data: { message: string; otp: 483920 };
  timestamp: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  statusCode: string;
  data: { message: string };
  timestamp: string;
}

export interface LoginPayload {
  phoneNumber: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    message: string;
  };
  timestamp: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  statusCode: number;
  data: { message: string };
  timestamp: string;
}

export interface LogoutResponse {
  success: boolean;
  statusCode: number;
  data: { message: string };
  timestamp: string;
}
