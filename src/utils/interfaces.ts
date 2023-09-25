import React, { Dispatch, SetStateAction } from "react";
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

export interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  singleDayDisplay: boolean;
  setSingleDayDisplay: Dispatch<SetStateAction<boolean>>;
  addEventOpen: boolean;
  setAddEventOpen: Dispatch<SetStateAction<boolean>>;
  userEvents: Event[];
  setUserEvents: Dispatch<SetStateAction<Event[]>>;
}

export interface Event {
  id: string;
  starting: Date;
  ending: Date;
  allDay: boolean;
  title: string;
}
