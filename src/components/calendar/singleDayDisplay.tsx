import { useMemo } from "react";
import { add, sub, isBefore, isAfter, startOfDay } from "date-fns";
import { hours } from "../../utils/helpers";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { returnFullWeek } from "../../utils/helpers";
import HourBlock from "./hourBlock";

export default function SingleDayDisplay(): JSX.Element {
  const { currentDate, setCurrentDate, userEvents, setCurrentEvent } =
    useCalendarCtx();
  const selectedDate = currentDate.getDate();
  const week = returnFullWeek(currentDate);

  const dayEvents = useMemo(() => {
    return userEvents.filter(
      (event) =>
        event.starting.toDateString() === currentDate.toDateString() ||
        event.ending.toDateString() === currentDate.toDateString() ||
        (isBefore(event.starting, currentDate) &&
          isAfter(event.ending, currentDate))
    );
  }, [userEvents, currentDate]);

  const allDayEvent = useMemo(
    () =>
      dayEvents?.filter(
        (event) =>
          event.allDay ||
          (isBefore(event.starting, currentDate) &&
            isAfter(startOfDay(event.ending), currentDate))
      ),
    [dayEvents, currentDate]
  );

  const prevWeek = () => setCurrentDate(sub(currentDate, { weeks: 1 }));
  const nextWeek = () => setCurrentDate(add(currentDate, { weeks: 1 }));

  return (
    <>
      <div className="days singleDayDisplay">
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
      {allDayEvent.length ? (
        <div className="allDayWrapper">
          <div className="allDayText">all-day</div>
          <div className="allDayBlocks">
            {allDayEvent.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setCurrentEvent(event);
                }}
                className="allDayEventBlock"
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="dayWrapper">
        {hours.map((hour, i) => (
          <HourBlock key={i} hour={hour} events={dayEvents} />
        ))}
        <div className="midnight">
          <div className="hour">00:00</div>
          <div className="box"></div>
        </div>
      </div>
    </>
  );
}
