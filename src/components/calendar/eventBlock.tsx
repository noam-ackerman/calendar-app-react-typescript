import { Event } from "../../utils/interfaces";

interface Props {
  event: Event;
  top: number;
  height: number;
}

export default function EventBlock({ event, top, height }: Props): JSX.Element {
  return (
    <div
      className="event"
      style={{ top: `${top}%`, height: `calc(${height}% - 1px)` }}
    >
      <div
        className="eventText"
        style={{
          display: `${height < 16.5 ? "none" : "block"}`,
          padding: `${
            height > 16.5 && height < 16.7 ? "0 0.6rem" : "0.3rem 0.6rem 0.4rem"
          }`,
        }}
      >
        <span className="eventTitle">
          {event.title}{" "}
          <span className="eventTime">
            {event.startingTime} - {event.endingTime}
          </span>
        </span>
      </div>
    </div>
  );
}
