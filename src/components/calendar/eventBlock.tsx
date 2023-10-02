import { Event } from "../../utils/interfaces";
import { useCalendarCtx } from "../../ctx/calendarCtx";

interface Props {
  event: Event;
  top: number;
  height: number;
  width?: string;
}

export default function EventBlock({
  event,
  top,
  height,
  width,
}: Props): JSX.Element {
  const { setCurrentEvent } = useCalendarCtx();
  return (
    <div
      className="event"
      onClick={() => {
        setCurrentEvent(event);
      }}
      style={{
        top: `calc(${top}% + 1px)`,
        height: `calc(${height}% - 1px)`,
        width: width,
      }}
    >
      <div
        className="eventText"
        style={{
          display: `${height < 0.35 ? "none" : "block"}`,
          padding: `${
            height > 0.68 && height < 0.7 ? "0 0.6rem" : "0.4rem 0.6rem 0.3rem"
          }`,
        }}
      >
        <span className="eventTitle">{event.title} </span>
      </div>
    </div>
  );
}
