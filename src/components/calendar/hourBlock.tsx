import { useMemo } from "react";
import { Event } from "../../utils/interfaces";
import EventBlock from "./eventBlock";

interface Props {
  hour: string;
  events: Event[] | undefined;
}

export default function HourBlock({ hour, events }: Props): JSX.Element {
  const hourEvents = useMemo(
    () => events?.filter((event) => event.startingTime.split(":")[0] === hour),
    [events, hour]
  );

  return (
    <div className="hourBlock">
      <div className="hour">{hour}:00</div>
      <div className="box">
        {hourEvents?.map((event) => {
          const top = (+event.startingTime.split(":")[1] / 60) * 100;
          const startingHourInDecimels =
            +event.startingTime.split(":")[1] / 60 +
            +event.startingTime.split(":")[0];
          const endingHourInDecimels =
            +event.endingTime.split(":")[1] / 60 +
            +event.endingTime.split(":")[0];
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
      </div>
    </div>
  );
}
