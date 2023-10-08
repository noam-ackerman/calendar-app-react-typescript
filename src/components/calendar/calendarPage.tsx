import { useCalendarCtx } from "../../ctx/calendarCtx";
import ActionsBar from "./actionsBar";
import Calendar from "./calendarComponents/calendar";
import EventForm from "./menuComponents/eventForm";
import EventDetails from "./menuComponents/eventDetails";
import Settings from "./menuComponents/settings";

export default function CalendarPage(): JSX.Element {
  const { eventFormOpen, currentEvent, settingsOpen } = useCalendarCtx();
  return (
    <div className="calendarPage">
      <div className="container">
        <ActionsBar />
        {currentEvent && !eventFormOpen ? (
          <EventDetails />
        ) : eventFormOpen ? (
          <EventForm />
        ) : settingsOpen ? (
          <Settings />
        ) : (
          <Calendar />
        )}
      </div>
    </div>
  );
}
