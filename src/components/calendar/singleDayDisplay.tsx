import { lastDayOfWeek, startOfWeek, add } from "date-fns";
import { useCalendarCtx } from "../../ctx/calendarCtx";

export default function SingleDayDisplay(): JSX.Element {
  const { currentDate, setCurrentDate } = useCalendarCtx();
  const startWeek = startOfWeek(currentDate);
  const lastWeek = lastDayOfWeek(currentDate);
  const selectedDate = currentDate.getDate();
  const week = [startWeek];

  const addDaysToWeek = (): void => {
    let value = add(week[week.length - 1], { days: 1 });
    if (value.toString() === lastWeek.toString()) {
      week.push(lastWeek);
      return;
    } else {
      week.push(value);
      addDaysToWeek();
    }
  };
  addDaysToWeek();

  const handleDayClick = (date: Date): void => {
    setCurrentDate(date);
  };

  return (
    <>
      <div className="days singleDayDisplay">
        {week.map((date) => {
          const day = date.getDate();
          return (
            <div
              className={`day ${selectedDate === day ? "selected" : ""}`}
              key={day}
              onClick={() => handleDayClick(date)}
            >
              <span>{day}</span>
            </div>
          );
        })}
      </div>
      <div>
        single day {currentDate.getDate()}-{currentDate.getMonth() + 1}-
        {currentDate.getFullYear()}
      </div>
    </>
  );
}
