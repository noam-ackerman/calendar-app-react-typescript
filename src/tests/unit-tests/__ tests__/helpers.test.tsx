import exp from "constants";
import {
  roundToNearest5,
  returnFullWeek,
  calculateEventBlockDimentions,
} from "../../../utils/helpers";
import { sub, add, startOfDay } from "date-fns";

interface Results {
  count: number;
  top: number;
  height: number;
  width: string;
}

test("round to nearest 5", () => {
  const date = new Date("1 october 2022");
  date.setHours(13, 12, 0);
  expect(roundToNearest5(date).getMinutes()).toBe(15);
});

test("return full week", () => {
  expect(returnFullWeek(new Date())).toHaveLength(7);
});

test("calculate Event Block Dimentions", () => {
  const date = startOfDay(new Date());
  let widthCount = 0.7;
  let results1: Results = { count: 0, top: 0, height: 0, width: "" };
  let results2 = results1;
  let results3 = results2;

  const testEvent1 = {
    id: "test event 1",
    title: "test event 1",
    allDay: false,
    starting: sub(date, { days: 1 }),
    ending: add(date, { hours: 3 }),
  };
  const testEvent2 = {
    id: "test event 2",
    title: "test event 2",
    allDay: false,
    starting: add(date, { hours: 1 }),
    ending: add(date, { hours: 2 }),
  };
  const testEvent3 = {
    id: "test event 3",
    title: "test event 3",
    allDay: false,
    starting: add(date, { hours: 1 }),
    ending: add(date, { hours: 2 }),
  };
  let events = [testEvent1, testEvent2, testEvent3];

  events.map((event, index, array) => {
    const prevEvent = array[index - 1];
    let results = calculateEventBlockDimentions(
      event,
      prevEvent,
      widthCount,
      date
    );
    if (index === 0) results1 = results;
    else if (index === 1) results2 = results;
    else results3 = results;
    widthCount = results.count;
  });

  expect(results1.top).toBe(0);
  expect(results1.width).toEqual("100%");
  expect(results1.height).toBe(12.5);

  expect(results2.top).toBe(4.166666666666666);
  expect(results2.width).toEqual("calc(100% - 0.7rem)");
  expect(results2.height).toBe(4.166666666666667);

  expect(results3.top).toBe(4.166666666666666);
  expect(results3.width).toEqual("calc(100% - 2.4rem)");
  expect(results3.height).toBe(4.166666666666667);
});
