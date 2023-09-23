import { startOfMonth, endOfMonth, differenceInDays, setDate } from "date-fns";
import { useCalendarCtx } from "../../ctx/calendarCtx";

export default function DaysDisplay(): JSX.Element {
  const { currentDate, setCurrentDate, setSingleDayDisplay } = useCalendarCtx();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numDays = differenceInDays(endDate, startDate) + 1;
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();
  const selectedDate = currentDate.getDate();

  const handleDayClick = (index: number) => {
    const date = setDate(currentDate, index);
    setCurrentDate(date);
    setSingleDayDisplay(true);
  };

  return (
    <div className="days">
      {Array.from({ length: prefixDays }).map((_, index) => {
        const date = index + 1;
        return <div className="emptyDay" key={date}></div>;
      })}
      {Array.from({ length: numDays }).map((_, index) => {
        const date = index + 1;
        return (
          <div
            className={`day ${selectedDate === date ? "selected" : ""}`}
            key={date}
            onClick={() => handleDayClick(date)}
          >
            <span>{date}</span>
          </div>
        );
      })}
      {Array.from({ length: suffixDays }).map((_, index) => {
        const date = index + 1;
        return <div className="emptyDay" key={date}></div>;
      })}
    </div>
  );
}
