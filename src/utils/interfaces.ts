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
