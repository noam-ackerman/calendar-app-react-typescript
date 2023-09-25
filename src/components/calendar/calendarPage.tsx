import { useCalendarCtx } from "../../ctx/calendarCtx";
import ActionsBar from "./actionsBar";
import Calendar from "./calendar";
import AddEvent from "./addEvent";

export default function CalendarPage(): JSX.Element {
  const { addEventOpen } = useCalendarCtx();
  return (
    <div className="calendarPage">
      <div className="container">
        <ActionsBar />
        {addEventOpen ? <AddEvent /> : <Calendar />}
      </div>
    </div>
  );
}
