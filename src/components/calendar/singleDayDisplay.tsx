import { useMemo } from "react";
import { lastDayOfWeek, startOfWeek, add, sub } from "date-fns";
import { useCalendarCtx } from "../../ctx/calendarCtx";
import { Event } from "../../utils/interfaces";
import HourBlock from "./hourBlock";

const hours: string[] = [
  "0",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

export default function SingleDayDisplay(): JSX.Element {
  const { currentDate, setCurrentDate, fakeData } = useCalendarCtx();
  const startWeek = startOfWeek(currentDate);
  const lastWeek = lastDayOfWeek(currentDate);
  const selectedDate = currentDate.getDate();
  const week = [startWeek];

  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString();
  const events: Event[] | undefined =
    fakeData[year] && fakeData[year][month]
      ? fakeData[year][month][selectedDate.toString()]
      : undefined;

  const allDayEvents = useMemo(() => {
    return events?.filter((event) => event.allDay === true);
  }, [events]);

  const notAlldayEvents = useMemo(
    () => events?.filter((event) => event.allDay === false),
    [events]
  );

  const addDaysToWeek = (): void => {
    let value = add(week[week.length - 1], { days: 1 });
    if (value.toString() === lastWeek.toString()) {
      week.push(lastWeek);
      return;
    } else {
      week.push(value);
      addDaysToWeek();
    }
  };
  addDaysToWeek();

  const prevWeek = () => setCurrentDate(sub(currentDate, { weeks: 1 }));
  const nextWeek = () => setCurrentDate(add(currentDate, { weeks: 1 }));

  const handleDayClick = (date: Date): void => {
    setCurrentDate(date);
  };

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
              onClick={() => handleDayClick(date)}
            >
              <span>{day}</span>
            </div>
          );
        })}
      </div>
      {allDayEvents?.length ? (
        <div className="allDayWrapper">
          <div className="allDayText">all-day</div>
          <div className="allDayBlocks">
            {allDayEvents.map((event) => (
              <div className="allDayEventBlock">{event.title}</div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="dayWrapper">
        {hours.map((hour, i) => (
          <HourBlock key={i} hour={hour} events={notAlldayEvents} />
        ))}
        <div className="midnight">
          <div className="hour">0:00</div>
          <div className="box"></div>
        </div>
      </div>
    </>
  );
}
