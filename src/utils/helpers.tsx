import { lastDayOfWeek, startOfWeek, add } from "date-fns";

const daysWeek: string[] = ["S", "M", "T", "W", "T", "F", "S"];

const hours: string[] = [
  "00",
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

export { roundToNearest5, daysWeek, hours, returnFullWeek };
