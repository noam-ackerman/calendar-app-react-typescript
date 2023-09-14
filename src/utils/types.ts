import { User as FirebaseUser } from "firebase/auth";

export type CurrentUserType = FirebaseUser | null;
