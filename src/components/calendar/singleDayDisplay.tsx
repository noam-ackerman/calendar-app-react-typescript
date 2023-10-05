import { useMemo } from "react";
import { isBefore, isAfter, startOfDay } from "date-fns";
import { hours, calculateEventBlockDimentions } from "../../utils/helpers";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import EventBlock from "./eventBlock";
import WeekRow from "./weekRow";

export default function SingleDayDisplay(): JSX.Element {
  const { currentDate, userEvents, setCurrentEvent } = useCalendarCtx();
  let widthCount: number = 0.7;

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

  return (
    <>
      <WeekRow />
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
              <div key={i} className="box"></div>
            ))}
            {notAllDayEvent.map((event, index, array) => {
              const prevEvent = array[index - 1];
              const { top, width, height, count } =
                calculateEventBlockDimentions(
                  event,
                  prevEvent,
                  index,
                  widthCount,
                  currentDate
                );
              widthCount = count;
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
