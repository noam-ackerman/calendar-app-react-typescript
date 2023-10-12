import { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  differenceInDays,
  setDate,
  isSameMonth,
} from "date-fns";
import { useCalendarCtx } from "../../../ctx/calendarCtx";

export default function DaysDisplay(): JSX.Element {
  const { currentDate, setCurrentDate, setSingleDayDisplay, userEvents } =
    useCalendarCtx();
  const startDate: Date = startOfMonth(currentDate);
  const endDate: Date = endOfMonth(currentDate);
  const numDays: number = differenceInDays(endDate, startDate) + 1;
  const prefixDays: number = startDate.getDay();
  const suffixDays: number = 6 - endDate.getDay();
  const selectedDate: number = currentDate.getDate();
  const today = isSameMonth(new Date(), currentDate)
    ? new Date().getDate()
    : null;

  const monthlyEvents = useMemo(
    () =>
      userEvents.filter(
        (event) =>
          isSameMonth(currentDate, event.starting) ||
          isSameMonth(currentDate, event.ending)
      ),
    [userEvents, currentDate]
  );

  const handleDayClick = (index: number): void => {
    const date = setDate(currentDate, index);
    setCurrentDate(date);
    setSingleDayDisplay(true);
  };

  return (
    <div className="days monthDisplay">
      {Array.from({ length: prefixDays }).map((_, index) => {
        const date = index + 1;
        return <div className="emptyDay" key={date}></div>;
      })}
      {Array.from({ length: numDays }).map((_, index) => {
        const date = index + 1;
        const hasEvent = monthlyEvents.some(
          (event) =>
            event.starting.getDate() === date ||
            event.ending.getDate() === date ||
            (event.starting.getDate() <= date && event.ending.getDate() >= date)
        );
        return (
          <div
            className={`day ${selectedDate === date ? "selected" : ""} ${
              today === date ? "today" : ""
            }`}
            key={date}
            onClick={() => handleDayClick(date)}
          >
            <span>{date}</span>
            <div
              className="hasEvent"
              style={{ opacity: `${hasEvent ? "1" : "0"}` }}
            >
              ♥︎
            </div>
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
