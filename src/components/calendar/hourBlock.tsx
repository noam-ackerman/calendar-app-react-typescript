import { useMemo } from "react";
import { Event } from "../../utils/interfaces";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import EventBlock from "./eventBlock";

interface Props {
  hour: string;
  events: Event[];
}

export default function HourBlock({ hour, events }: Props): JSX.Element {
  const { currentDate } = useCalendarCtx();

  //for events starting on this current date and at this hour block
  const hourStartingEvents = useMemo(
    () =>
      events?.filter(
        (event) =>
          !event.allDay &&
          event.starting.getHours() === +hour &&
          event.starting.toDateString() === currentDate.toDateString()
      ),
    [events, hour, currentDate]
  );

  //for events starting before this current date and ending at this current date
  const endingDayEvent = useMemo(
    () =>
      events?.filter(
        (event) =>
          hour === "00" &&
          !event.allDay &&
          event.starting.toDateString() !== currentDate.toDateString() &&
          event.ending.toDateString() === currentDate.toDateString()
      ),
    [events, hour, currentDate]
  );

  return (
    <div className="hourBlock">
      <div className="hour">{hour}:00</div>
      <div className="box">
        {hourStartingEvents?.map((event) => {
          const top = (event.starting.getMinutes() / 60) * 100;
          const startingHourInDecimels =
            event.starting.getMinutes() / 60 + event.starting.getHours();
          const endingHourInDecimels =
            event.starting.toDateString() === event.ending.toDateString()
              ? event.ending.getMinutes() / 60 + event.ending.getHours()
              : 24;
          const height = (endingHourInDecimels - startingHourInDecimels) * 100;
          return (
            <EventBlock
              key={event.id}
              event={event}
              top={top}
              height={height}
            />
          );
        })}
        {endingDayEvent?.map((event) => {
          const endingHourInDecimels =
            event.ending.getMinutes() / 60 + event.ending.getHours();
          const height = endingHourInDecimels * 100;
          return (
            <EventBlock key={event.id} event={event} top={0} height={height} />
          );
        })}
      </div>
    </div>
  );
}
