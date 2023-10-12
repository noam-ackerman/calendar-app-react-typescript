import { useAuth } from "../../ctx/authCtx";
import { useNavigate } from "react-router-dom";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { format } from "date-fns";
import ReturnBtn from "./returnBtn";

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
    settingsOpen,
    setSettingsOpen,
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
        {(currentEvent || settingsOpen) &&
        singleDayDisplay &&
        !eventFormOpen ? (
          // case when display of current event details / settings resirected from single day display
          <ReturnBtn
            onClick={() => {
              currentEvent && setCurrentEvent(null);
              settingsOpen && setSettingsOpen(false);
            }}
            text={format(currentDate, "dd MMM yy")}
          />
        ) : singleDayDisplay && !currentEvent && eventFormOpen ? (
          // case when display of add event redirected from a single day calender
          <ReturnBtn
            onClick={() => setEventFormOpen(false)}
            text={format(currentDate, "dd MMM yy")}
          />
        ) : currentEvent && eventFormOpen ? (
          // case when display of edit event redirected from an event details page
          <ReturnBtn
            onClick={() => setEventFormOpen(false)}
            text={currentEvent.title}
          />
        ) : singleDayDisplay && !currentEvent && !eventFormOpen ? (
          // case when display of single day calender
          <ReturnBtn
            onClick={() => setSingleDayDisplay(false)}
            text={format(currentDate, "MMM yy")}
          />
        ) : (eventFormOpen || settingsOpen) &&
          !currentEvent &&
          !singleDayDisplay ? (
          // case when display of add event / settings redirected from monthly calender
          <ReturnBtn
            onClick={() => {
              eventFormOpen && setEventFormOpen(false);
              settingsOpen && setSettingsOpen(false);
            }}
            text="calendar"
          />
        ) : null}
      </div>
      <div className="actionsButtons">
        <button
          disabled={eventFormOpen}
          className="addEvent"
          onClick={() => {
            settingsOpen && setSettingsOpen(false);
            currentEvent && setCurrentEvent(null);
            setEventFormOpen(true);
          }}
        >
          <span className="material-icons">add</span>
        </button>
        <button
          className="settings"
          onClick={() => {
            eventFormOpen && setEventFormOpen(false);
            currentEvent && setCurrentEvent(null);
            setSettingsOpen(true);
          }}
        >
          <span className="material-icons">settings</span>
        </button>
        <button className="logout" onClick={handleLogout}>
          <span className="material-icons">logout</span>
        </button>
      </div>
    </div>
  );
}
