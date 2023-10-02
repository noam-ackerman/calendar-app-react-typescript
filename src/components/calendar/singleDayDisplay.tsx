import { useMemo } from "react";
import { add, sub, isBefore, isAfter, startOfDay } from "date-fns";
import { hours } from "../../utils/helpers";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { returnFullWeek } from "../../utils/helpers";
import EventBlock from "./eventBlock";

export default function SingleDayDisplay(): JSX.Element {
  const { currentDate, setCurrentDate, userEvents, setCurrentEvent } =
    useCalendarCtx();
  const selectedDate = currentDate.getDate();
  const week = returnFullWeek(currentDate);
  let count = 0.7;

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

  const notAllDayEvent = useMemo(
    () => dayEvents?.filter((event) => !allDayEvent.includes(event)),
    [dayEvents, allDayEvent]
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
        <div className="blocks">
          <div className="hours">
            {hours.map((hour, i) => (
              <div key={i} className="hourBlock">
                <div className="hour">{hour}:00</div>
              </div>
            ))}
          </div>
          <div className="boxes">
            {hours.map((_, i) => (
              <div className="box"></div>
            ))}
            {notAllDayEvent.map((event, index, array) => {
              const prevEvent = array[index - 1];
              let width = "100%";
              let top = 0;
              let height = 0;
              if (
                event.starting.getTime() < prevEvent?.ending.getTime() &&
                event.starting.getTime() - prevEvent?.starting.getTime() >=
                  600000 &&
                event.starting.getTime() > prevEvent?.starting.getTime()
              ) {
                width = `calc(100% - ${count}rem)`;
                count += 0.7;
              } else if (
                event.starting.getTime() === prevEvent?.starting.getTime() ||
                (event.starting.getTime() - prevEvent?.starting.getTime() <
                  600000 &&
                  event.starting.getTime() < prevEvent?.ending.getTime())
              ) {
                width = `calc(100% - ${count + 1}rem)`;
                count += 1.7;
              }
              if (
                // case of starting that day
                event.starting.toDateString() === currentDate.toDateString()
              ) {
                top =
                  (event.starting.getHours() / 24 +
                    event.starting.getMinutes() / 1440) *
                  100;
                const startingHourInDecimels =
                  event.starting.getMinutes() / 60 + event.starting.getHours();
                const endingHourInDecimels =
                  event.starting.toDateString() === event.ending.toDateString()
                    ? event.ending.getMinutes() / 60 + event.ending.getHours()
                    : 24;
                height =
                  (endingHourInDecimels - startingHourInDecimels) * (100 / 24);
              } else if (
                // case of ending that day but starting before
                event.starting.toDateString() !== currentDate.toDateString() &&
                event.ending.toDateString() === currentDate.toDateString()
              ) {
                const endingHourInDecimels =
                  event.ending.getMinutes() / 60 + event.ending.getHours();
                height = endingHourInDecimels * (100 / 24);
              }
              return (
                <EventBlock
                  key={event.id}
                  event={event}
                  top={top}
                  height={height}
                  width={width}
                />
              );
            })}
          </div>
        </div>
        <div className="midnight">
          <div className="hour">00:00</div>
          <div className="box"></div>
        </div>
      </div>
    </>
  );
}
