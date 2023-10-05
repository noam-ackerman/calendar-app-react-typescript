// import { useCalendarCtx } from "../../ctx/calendarCtx";
import { useState, useEffect, useRef } from "react";
import { add, startOfDay } from "date-fns";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Event } from "../../utils/interfaces";
import { roundToNearest5 } from "../../utils/helpers";
import { OvalBtn } from "../../utils/spinners";
import { uid } from "uid";
import Switch from "@mui/material/Switch";
import enGB from "date-fns/locale/en-GB";

export default function EventForm(): JSX.Element {
  const {
    currentDate,
    setCurrentDate,
    setSingleDayDisplay,
    setEventFormOpen,
    addEvent,
    currentEvent,
    setCurrentEvent,
  } = useCalendarCtx();

  const [allDay, setAllday] = useState<boolean>(currentEvent?.allDay || false);
  const [dateStart, setDateStart] = useState<Date | null>(
    currentEvent?.starting ||
      (currentDate.toDateString() === new Date().toDateString()
        ? roundToNearest5(new Date())
        : roundToNearest5(currentDate))
  );
  const [dateEnd, setDateEnd] = useState<Date | null>(
    currentEvent?.ending ||
      (!allDay ? add(dateStart!, { hours: 1 }) : dateStart)
  );
  const [errorPickers, setErrorPickers] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const eventTitle = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !currentEvent && setDateEnd(add(dateStart!, { hours: 1 }));
  }, [dateStart, currentEvent]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const newEvent: Event = {
      id: currentEvent?.id || uid(32),
      starting: allDay ? startOfDay(dateStart!) : dateStart!,
      ending: allDay ? startOfDay(dateEnd!) : dateEnd!,
      allDay: allDay,
      title: eventTitle.current?.value ? eventTitle.current.value : "New Event",
    };
    try {
      await addEvent(newEvent);
      setCurrentDate(startOfDay(dateStart!));
      setSingleDayDisplay(true);
      setCurrentEvent(null);
      setEventFormOpen(false);
    } catch {
      setError("Failed to add event!");
    }
    setLoading(false);
  };

  return (
    <div className="actionsComponentWrapper">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label htmlFor="eventTitle">Event title</label>
          <input
            ref={eventTitle}
            id="eventTitle"
            type="text"
            defaultValue={currentEvent ? currentEvent.title : ""}
          />
        </div>
        <div>
          <span className="allDay-label">All Day</span>
          <Switch
            onChange={(event) => setAllday(event.target.checked)}
            defaultChecked={currentEvent?.allDay ? true : false}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <div className="input-group picker-group">
            <label>Starts</label>
            {allDay ? (
              <MobileDatePicker
                value={dateStart}
                onError={(err) =>
                  err ? setErrorPickers(true) : setErrorPickers(false)
                }
                onChange={(newValue) => setDateStart(newValue)}
              />
            ) : (
              <MobileDateTimePicker
                value={dateStart}
                minutesStep={5}
                onError={(err) =>
                  err ? setErrorPickers(true) : setErrorPickers(false)
                }
                onChange={(newValue) => setDateStart(newValue)}
              />
            )}
          </div>
          <div className="input-group picker-group">
            <label>Ends</label>
            {allDay ? (
              <MobileDatePicker
                value={dateEnd}
                minDate={dateStart}
                onError={(err) =>
                  err ? setErrorPickers(true) : setErrorPickers(false)
                }
                onChange={(newValue) => setDateEnd(newValue)}
              />
            ) : (
              <MobileDateTimePicker
                value={dateEnd}
                minDateTime={dateStart}
                minutesStep={5}
                onError={(err) =>
                  err ? setErrorPickers(true) : setErrorPickers(false)
                }
                onChange={(newValue) => setDateEnd(newValue)}
              />
            )}
          </div>
        </LocalizationProvider>
        <button
          disabled={errorPickers || loading}
          className={`submitBtn ${errorPickers ? "error-disabled" : ""}`}
          type="submit"
        >
          {loading && <OvalBtn color="#3a86ff" />}
          <span>{currentEvent ? "Save Changes" : "Add Event"}</span>
        </button>
      </form>
    </div>
  );
}
