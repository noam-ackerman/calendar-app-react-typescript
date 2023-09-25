// import { useCalendarCtx } from "../../ctx/calendarCtx";
import { useState, useEffect, useRef } from "react";
import { add, startOfDay } from "date-fns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Event } from "../../utils/interfaces";
import { uid } from "uid";
import { roundToNearest5 } from "../../utils/helpers";
import Switch from "@mui/material/Switch";
import enGB from "date-fns/locale/en-GB";

export default function AddEvent(): JSX.Element {
  const {
    setUserEvents,
    setCurrentDate,
    setSingleDayDisplay,
    setAddEventOpen,
  } = useCalendarCtx();
  const [dateStart, setDateStart] = useState<Date | null>(
    roundToNearest5(new Date())
  );
  const [dateEnd, setDateEnd] = useState<Date | null>(
    add(dateStart!, { hours: 1 })
  );
  const [allDay, setAllday] = useState<boolean>(false);

  const eventTitle = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDateEnd(add(dateStart!, { hours: 1 }));
  }, [dateStart]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent: Event = {
      id: uid(32),
      starting: dateStart!,
      ending: dateEnd!,
      allDay: allDay,
      title: eventTitle.current?.value ? eventTitle.current.value : "New Event",
    };
    setUserEvents((prevState) => [...prevState, newEvent]);
    setCurrentDate(startOfDay(dateStart!));
    setSingleDayDisplay(true);
    setAddEventOpen(false);
  };

  return (
    <div className="eventFormWrapper">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="eventTitle">Event title</label>
          <input ref={eventTitle} id="eventTitle" type="text" />
        </div>
        <div className="input-group">
          <Switch onChange={(event) => setAllday(event.target.checked)} />
          <span>All Day</span>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <div className="input-group">
            <label>Starts</label>
            {allDay ? (
              <DatePicker
                label="Controlled picker"
                value={dateStart}
                minDate={new Date()}
                onChange={(newValue) => setDateStart(newValue)}
              />
            ) : (
              <DateTimePicker
                label="Controlled picker"
                value={dateStart}
                minDateTime={new Date()}
                onChange={(newValue) => setDateStart(newValue)}
              />
            )}
          </div>
          <div className="input-group">
            <label>Ends</label>
            {allDay ? (
              <DatePicker
                label="Controlled picker"
                value={dateEnd}
                minDate={dateStart}
                onChange={(newValue) => setDateEnd(newValue)}
              />
            ) : (
              <DateTimePicker
                label="Controlled picker"
                value={dateEnd}
                minDateTime={dateStart}
                onChange={(newValue) => setDateEnd(newValue)}
              />
            )}
          </div>
        </LocalizationProvider>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
