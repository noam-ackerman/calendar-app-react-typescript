import React, { useContext, useState } from "react";
import { ChildrenProps, CalendarContextType, Event } from "../utils/interfaces";

const CalendarContext = React.createContext({} as CalendarContextType);

const useCalendarCtx = (): CalendarContextType => {
  return useContext(CalendarContext);
};

const CalendarContextProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [singleDayDisplay, setSingleDayDisplay] = useState<boolean>(false);
  const [addEventOpen, setAddEventOpen] = useState<boolean>(false);
  const [userEvents, setUserEvents] = useState<Event[]>([]);

  // console.log(userEvents);

  const ContextValue = {
    currentDate,
    setCurrentDate,
    singleDayDisplay,
    setSingleDayDisplay,
    addEventOpen,
    setAddEventOpen,
    userEvents,
    setUserEvents,
  };
  return (
    <CalendarContext.Provider value={ContextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export { useCalendarCtx, CalendarContextProvider };
