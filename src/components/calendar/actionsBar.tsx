import { useAuth } from "../../ctx/authCtx";
import { useNavigate } from "react-router-dom";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { format } from "date-fns";

export default function ActionsBar(): JSX.Element {
  const { LogoutUser } = useAuth();
  const {
    currentDate,
    addEventOpen,
    setAddEventOpen,
    singleDayDisplay,
    setSingleDayDisplay,
  } = useCalendarCtx();
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
    <div className="actionsBar">
      <div className="returnButtons">
        {addEventOpen && (
          <button className="goBack" onClick={() => setAddEventOpen(false)}>
            <span className="material-icons">arrow_back</span>{" "}
            <span className="text">calendar</span>
          </button>
        )}
        {singleDayDisplay && (
          <button className="goBack" onClick={() => setSingleDayDisplay(false)}>
            <span className="material-icons">arrow_back</span>{" "}
            <span className="text">{format(currentDate, "MMM yy")}</span>
          </button>
        )}
      </div>
      <div className="actionsButtons">
        <button
          className="addEvent"
          onClick={() => {
            setAddEventOpen(true);
            singleDayDisplay && setSingleDayDisplay(false);
          }}
        >
          <span className="material-icons">add</span>
        </button>
        <button className="settings">
          <span className="material-icons">settings</span>
        </button>
        <button className="logout" onClick={handleLogout}>
          <span className="material-icons">logout</span>
        </button>
      </div>
    </div>
  );
}
