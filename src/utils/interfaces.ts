import { CurrentUserType } from "./types";
import { UserCredential } from "firebase/auth";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  currentUser: CurrentUserType;
  SignupUser: (email: string, password: string) => Promise<UserCredential>;
  LoginUser: (email: string, password: string) => Promise<UserCredential>;
  LogoutUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
