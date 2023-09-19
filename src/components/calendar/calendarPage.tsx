import { useAuth } from "../../ctx/authCtx";
import { useNavigate } from "react-router-dom";
import Calendar from "./calendar";

export default function CalendarPage(): JSX.Element {
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
    <>
      <button onClick={handleLogout}>Logout</button>
      <Calendar />
    </>
  );
}
