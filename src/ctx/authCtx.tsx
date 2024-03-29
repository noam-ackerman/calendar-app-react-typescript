import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { CurrentUserType } from "../utils/types";
import { AuthContextType, ChildrenProps } from "../utils/interfaces";
import firebaseApp from "../firebase";

const auth = getAuth(firebaseApp);
const AuthContext = React.createContext({} as AuthContextType);

const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [currentUser, setCurrentUser] = React.useState<CurrentUserType>(null);
  const [Loading, setLoading] = useState<boolean>(true);

  function SignupUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function LoginUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function LogoutUser() {
    return signOut(auth);
  }
  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }
  function UpdatePassword(password: string) {
    return updatePassword(currentUser!, password);
  }

  function reAuthenticateUser(providedPassword: string) {
    const credentials = EmailAuthProvider.credential(
      currentUser!.email!,
      providedPassword
    );
    return reauthenticateWithCredential(currentUser!, credentials);
  }

  function DeleteUser() {
    return deleteUser(currentUser!);
  }

  const ContextValue = {
    currentUser,
    SignupUser,
    LoginUser,
    LogoutUser,
    resetPassword,
    UpdatePassword,
    reAuthenticateUser,
    DeleteUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: CurrentUserType): void => {
        setCurrentUser(user);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={ContextValue}>
      {!Loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthContextProvider, AuthContext };
