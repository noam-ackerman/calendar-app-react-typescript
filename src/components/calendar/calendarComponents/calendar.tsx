import { sub, add, format } from "date-fns";
import { useCalendarCtx } from "../../../ctx/calendarCtx";
import { daysWeek } from "../../../utils/helpers";
import DaysDisplay from "./daysDisplay";
import SingleDayDisplay from "./singleDayDisplay";

const Calendar = (): JSX.Element => {
  const { currentDate, setCurrentDate, singleDayDisplay } = useCalendarCtx();

  const prevMonth = (): void => setCurrentDate(sub(currentDate, { months: 1 }));
  const nextMonth = (): void => setCurrentDate(add(currentDate, { months: 1 }));
  const prevYear = (): void => setCurrentDate(sub(currentDate, { years: 1 }));
  const nextYear = (): void => setCurrentDate(add(currentDate, { years: 1 }));

  return (
    <>
      <div className="calendarHeader">
        <button className="prevYear" onClick={prevYear}>
          <span className="material-icons">keyboard_double_arrow_left</span>
        </button>
        <button className="prevMonth" onClick={prevMonth}>
          <span className="material-icons">chevron_left</span>
        </button>
        <div className="currentMonthYear">
          {format(currentDate, "LLLL yyyy")}
        </div>
        <button className="nextMonth" onClick={nextMonth}>
          <span className="material-icons">chevron_right</span>
        </button>
        <button className="nextYear" onClick={nextYear}>
          <span className="material-icons">keyboard_double_arrow_right</span>
        </button>
      </div>
      <div className="daysTitle">
        {daysWeek.map((day, i) => (
          <div key={i} className="dayTitle">
            {day}
          </div>
        ))}
      </div>
      {singleDayDisplay ? <SingleDayDisplay /> : <DaysDisplay />}
    </>
  );
};

export default Calendar;
