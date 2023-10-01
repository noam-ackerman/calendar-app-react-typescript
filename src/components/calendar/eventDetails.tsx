import { useState, useRef } from "react";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { format } from "date-fns";
import { OvalBtn } from "../../utils/spinners";

export default function EventDetails(): JSX.Element {
  const { currentEvent, setCurrentEvent, setEventFormOpen, deleteEvent } =
    useCalendarCtx();
  const [deleteClickedOnce, setDeleteClickedOnce] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const deleteEventBtn = useRef<HTMLButtonElement>(null);

  const handleDeleteEvent = async () => {
    if (!deleteClickedOnce) {
      setError("");
      setDeleteClickedOnce(true);
      return;
    } else {
      setLoading(true);
      setDeleteClickedOnce(false);
      try {
        await deleteEvent();
        setCurrentEvent(null);
      } catch {
        setError("Failed to delete event!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="eventComponentWrapper">
      <div className="title">Event Details</div>
      <div className="eventDetails">
        {error && <div className="error-message small">{error}</div>}
        <div className="eventTitle">{currentEvent!.title}</div>
        {currentEvent?.starting.toDateString() ===
        currentEvent?.ending.toDateString() ? (
          <>
            <div className="eventDate">
              {format(currentEvent!.starting, "E, dd MMM yyyy")}{" "}
              {currentEvent?.allDay && "all day"}
            </div>
            {!currentEvent?.allDay && (
              <div className="eventDate">
                From {format(currentEvent!.starting, "HH:mm")} to{" "}
                {format(currentEvent!.ending, "HH:mm")}
              </div>
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="eventDate">
              From{" "}
              {!currentEvent?.allDay && format(currentEvent!.starting, "HH:mm")}{" "}
              {format(currentEvent!.starting, "E, dd MMM yyyy")}
              {currentEvent?.allDay && " all day"}
            </div>
            <div className="eventDate">
              Until{" "}
              {!currentEvent?.allDay && format(currentEvent!.ending, "HH:mm")}{" "}
              {format(currentEvent!.ending, "E, dd MMM yyyy")}
              {currentEvent?.allDay && " all day"}
            </div>
          </>
        )}
      </div>
      <div className="actions">
        <button onClick={() => setEventFormOpen(true)} className="editEvent">
          <span>Edit</span>
        </button>
        <button
          disabled={loading}
          ref={deleteEventBtn}
          onClick={handleDeleteEvent}
          className="deleteEvent"
        >
          {loading && <OvalBtn color="#3a86ff" />}
          <span>{deleteClickedOnce ? "U Sure? Y" : "Delete"} </span>
        </button>
      </div>
    </div>
  );
}
