import { useAuth } from "../../ctx/authCtx";
import { useNavigate } from "react-router-dom";

export default function ActionsBar(): JSX.Element {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await LogoutUser();
      navigate("/login");
    } catch {
      alert("Failed to log out!");
    }
  };
  return (
    <div className="actions">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
