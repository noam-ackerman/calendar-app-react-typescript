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

export interface ChangePasswordFormData {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
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
  UpdatePassword: (password: string) => Promise<void>;
  reAuthenticateUser: (providedPassword: string) => Promise<UserCredential>;
  DeleteUser: () => Promise<void>;
}

export interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  singleDayDisplay: boolean;
  setSingleDayDisplay: Dispatch<SetStateAction<boolean>>;
  eventFormOpen: boolean;
  setEventFormOpen: Dispatch<SetStateAction<boolean>>;
  userEvents: Event[];
  setUserEvents: Dispatch<SetStateAction<Event[]>>;
  addEvent: (data: Event) => Promise<void>;
  currentEvent: Event | null;
  setCurrentEvent: Dispatch<SetStateAction<Event | null>>;
  deleteEvent: () => Promise<void>;
  settingsOpen: boolean;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  deleteUserDatabase: (userId: string) => Promise<void>;
}

export interface Event {
  id: string;
  starting: Date;
  ending: Date;
  allDay: boolean;
  title: string;
}
