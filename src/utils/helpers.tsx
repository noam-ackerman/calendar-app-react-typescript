import { lastDayOfWeek, startOfWeek, add } from "date-fns";
import { Event } from "./interfaces";

const daysWeek: string[] = ["S", "M", "T", "W", "T", "F", "S"];

const hours: string[] = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
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

const roundToNearest5 = (date: Date): Date => {
  const minutes = 5;
  const ms = 1000 * 60 * minutes;
  return new Date(Math.ceil(date.getTime() / ms) * ms);
};

const returnFullWeek = (currentDate: Date): Date[] => {
  const firstDayWeek = startOfWeek(currentDate);
  const lastDayWeek = lastDayOfWeek(currentDate);
  const week = [firstDayWeek];
  function addDaysToWeek() {
    let value = add(week[week.length - 1], { days: 1 });
    if (value.toString() === lastDayWeek.toString()) {
      week.push(lastDayWeek);
    } else {
      week.push(value);
      addDaysToWeek();
    }
  }
  addDaysToWeek();
  return week;
};

const formatEventDates = (event: Event): Event => {
  const starting = new Date(event.starting);
  const ending = new Date(event.ending);
  return {
    id: event.id,
    title: event.title,
    allDay: event.allDay,
    starting: starting,
    ending: ending,
  };
};

const calculateEventBlockDimentions = (
  event: Event,
  prevEvent: Event,
  index: number,
  count: number,
  currentDate: Date
): { top: number; width: string; height: number; count: number } => {
  let width = "100%";
  let top = 0;
  let height = 0;
  //calculating width for handling overlaing events cases
  if (
    event.starting.getTime() < prevEvent?.ending.getTime() &&
    event.starting.getTime() - prevEvent?.starting.getTime() >= 600000 &&
    event.starting.getTime() > prevEvent?.starting.getTime()
  ) {
    width = `calc(100% - ${count}rem)`;
    count += 0.7;
  } else if (
    event.starting.getTime() === prevEvent?.starting.getTime() ||
    (event.starting.getTime() - prevEvent?.starting.getTime() < 600000 &&
      event.starting.getTime() < prevEvent?.ending.getTime())
  ) {
    width = `calc(100% - ${count + 1}rem)`;
    count += 1.7;
  }
  //calculating top and height
  if (
    // case of starting that day
    event.starting.toDateString() === currentDate.toDateString()
  ) {
    top =
      (event.starting.getHours() / 24 + event.starting.getMinutes() / 1440) *
      100;
    const startingHourInDecimels =
      event.starting.getMinutes() / 60 + event.starting.getHours();
    const endingHourInDecimels =
      event.starting.toDateString() === event.ending.toDateString()
        ? event.ending.getMinutes() / 60 + event.ending.getHours()
        : 24;
    height = (endingHourInDecimels - startingHourInDecimels) * (100 / 24);
  } else if (
    // case of ending that day but starting before
    event.starting.toDateString() !== currentDate.toDateString() &&
    event.ending.toDateString() === currentDate.toDateString()
  ) {
    const endingHourInDecimels =
      event.ending.getMinutes() / 60 + event.ending.getHours();
    height = endingHourInDecimels * (100 / 24);
  }

  return { top, width, height, count };
};

export {
  roundToNearest5,
  daysWeek,
  hours,
  returnFullWeek,
  formatEventDates,
  calculateEventBlockDimentions,
};
