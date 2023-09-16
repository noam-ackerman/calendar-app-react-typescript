import { Navigate } from "react-router-dom";
import { useAuth } from "../../ctx/authCtx";
import { ChildrenProps } from "../../utils/interfaces";

export default function PrivateRoute({ children }: ChildrenProps): JSX.Element {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
