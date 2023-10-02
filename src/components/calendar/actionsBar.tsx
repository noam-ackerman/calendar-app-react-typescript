import { useAuth } from "../../ctx/authCtx";
import { useNavigate } from "react-router-dom";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { format } from "date-fns";

export default function ActionsBar(): JSX.Element {
  const { LogoutUser } = useAuth();
  const {
    currentDate,
    eventFormOpen,
    setEventFormOpen,
    singleDayDisplay,
    setSingleDayDisplay,
    currentEvent,
    setCurrentEvent,
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
        {currentEvent && !eventFormOpen ? (
          // case when display of current event details
          <button className="goBack" onClick={() => setCurrentEvent(null)}>
            <span className="material-icons">arrow_back</span>{" "}
            <span className="text">{format(currentDate, "dd MMM yy")}</span>
          </button>
        ) : singleDayDisplay && !currentEvent && eventFormOpen ? (
          // case when display of add event redirected from a single day calender
          <button className="goBack" onClick={() => setEventFormOpen(false)}>
            <span className="material-icons">arrow_back</span>{" "}
            <span className="text">{format(currentDate, "dd MMM yy")}</span>
          </button>
        ) : currentEvent && eventFormOpen ? (
          // case when display of edit event redirected from an event details page
          <button className="goBack" onClick={() => setEventFormOpen(false)}>
            <span className="material-icons">arrow_back</span>{" "}
            <span className="text">{currentEvent.title}</span>
          </button>
        ) : singleDayDisplay && !currentEvent && !eventFormOpen ? (
          // case when display of single day calender
          <button className="goBack" onClick={() => setSingleDayDisplay(false)}>
            <span className="material-icons">arrow_back</span>{" "}
            <span className="text">{format(currentDate, "MMM yy")}</span>
          </button>
        ) : eventFormOpen && !currentEvent && !singleDayDisplay ? (
          // case when display of add event redirected from monthly calender
          <button className="goBack" onClick={() => setEventFormOpen(false)}>
            <span className="material-icons">arrow_back</span>{" "}
            <span className="text">calendar</span>
          </button>
        ) : null}
      </div>
      <div className="actionsButtons">
        <button
          disabled={eventFormOpen}
          className="addEvent"
          onClick={() => {
            currentEvent && setCurrentEvent(null);
            setEventFormOpen(true);
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
