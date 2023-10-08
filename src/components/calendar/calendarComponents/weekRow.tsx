import { useCalendarCtx } from "../../../ctx/calendarCtx";
import { add, sub } from "date-fns";
import { returnFullWeek } from "../../../utils/helpers";

export default function WeekRow(): JSX.Element {
  const { currentDate, setCurrentDate } = useCalendarCtx();
  const selectedDate: number = currentDate.getDate();
  const week: Date[] = returnFullWeek(currentDate);

  const prevWeek = (): void => setCurrentDate(sub(currentDate, { weeks: 1 }));
  const nextWeek = (): void => setCurrentDate(add(currentDate, { weeks: 1 }));

  return (
    <div className="days weekDisplay">
      <div className="prevWeek" onClick={prevWeek}>
        <span className="material-icons">arrow_back</span>
      </div>
      <div className="nextWeek" onClick={nextWeek}>
        <span className="material-icons">arrow_forward</span>
      </div>
      {week.map((date) => {
        const day = date.getDate();
        return (
          <div
            className={`day ${selectedDate === day ? "selected" : ""}`}
            key={day}
            onClick={() => setCurrentDate(date)}
          >
            <span>{day}</span>
          </div>
        );
      })}
    </div>
  );
}
