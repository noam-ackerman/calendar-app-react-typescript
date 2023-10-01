import { useCalendarCtx } from "../../ctx/calendarCtx";
import ActionsBar from "./actionsBar";
import Calendar from "./calendar";
import EventForm from "./eventForm";
import EventDetails from "./eventDetails";

export default function CalendarPage(): JSX.Element {
  const { eventFormOpen, currentEvent } = useCalendarCtx();
  return (
    <div className="calendarPage">
      <div className="container">
        <ActionsBar />
        {currentEvent && !eventFormOpen ? (
          <EventDetails />
        ) : eventFormOpen ? (
          <EventForm />
        ) : (
          <Calendar />
        )}
      </div>
    </div>
  );
}
