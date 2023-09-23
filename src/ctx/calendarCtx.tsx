import React, { useContext, useState } from "react";
import { ChildrenProps, CalendarContextType } from "../utils/interfaces";

const CalendarContext = React.createContext({} as CalendarContextType);

const useCalendarCtx = (): CalendarContextType => {
  return useContext(CalendarContext);
};

const CalendarContextProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [singleDayDisplay, setSingleDayDisplay] = useState<boolean>(false);

  const fakeData: any = {
    "2023": {
      "8": {
        "12": [
          {
            id: 1,
            startingTime: "12:00",
            endingTime: "14:15",
            allDay: false,
            title: "mock up",
          },
          {
            id: 3,
            startingTime: "14:00",
            endingTime: "15:15",
            allDay: false,
            title: "mock up",
          },
          {
            id: 2,
            startingTime: "7:15",
            endingTime: "8:00",
            allDay: false,
            title: "mock up",
          },
        ],
        "23": [
          {
            id: 3,
            startingTime: "14:15",
            endingTime: "15:30",
            allDay: false,
            title: "mock up",
          },
          {
            id: 4,
            startingTime: "18:35",
            endingTime: "19:00",
            allDay: false,
            title: "mock up",
          },
        ],
      },
      "9": {
        "12": [
          {
            id: 5,
            startingTime: "0:00",
            endingTime: "0:00",
            allDay: true,
            title: "mock up",
          },
          {
            id: 6,
            startingTime: "0:00",
            endingTime: "0:00",
            allDay: true,
            title: "mock up",
          },
        ],
      },
    },
  };

  const ContextValue = {
    currentDate,
    setCurrentDate,
    singleDayDisplay,
    setSingleDayDisplay,
    fakeData,
  };
  return (
    <CalendarContext.Provider value={ContextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export { useCalendarCtx, CalendarContextProvider };
