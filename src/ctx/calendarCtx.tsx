import React, { useContext, useState } from "react";
import { ChildrenProps, CalendarContextType, Event } from "../utils/interfaces";
import { useAuth } from "./authCtx";
import { formatEventDates } from "../utils/helpers";
import {
  getDatabase,
  ref as databaseRef,
  update,
  onValue,
  remove,
} from "firebase/database";

const CalendarContext = React.createContext({} as CalendarContextType);
const database = getDatabase();

const useCalendarCtx = (): CalendarContextType => {
  return useContext(CalendarContext);
};

const CalendarContextProvider = ({ children }: ChildrenProps): JSX.Element => {
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [singleDayDisplay, setSingleDayDisplay] = useState<boolean>(false);
  const [eventFormOpen, setEventFormOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [userEvents, setUserEvents] = useState<Event[]>([]);

  function addEvent(event: Event) {
    const eventRef = databaseRef(
      database,
      "users/" + currentUser!.uid + "/events/" + event.id
    );
    return update(eventRef, event);
  }

  function deleteEvent() {
    const eventRef = databaseRef(
      database,
      "users/" + currentUser!.uid + "/events/" + currentEvent!.id
    );
    return remove(eventRef);
  }

  function deleteUserDatabase(userId: string) {
    const userRef = databaseRef(database, "users/" + userId);
    return remove(userRef);
  }

  React.useEffect(() => {
    if (currentUser) {
      const userEventsRef = databaseRef(
        database,
        "users/" + currentUser.uid + "/events"
      );
      onValue(userEventsRef, (snapshot) => {
        let data = snapshot.val();
        if (data) {
          data = Object.values(data);
          data = data
            .map((event: Event) => formatEventDates(event))
            .sort(
              (a: Event, b: Event) =>
                a.starting.getTime() - b.starting.getTime()
            );
          setUserEvents(data);
        } else {
          setUserEvents([]);
        }
      });
    } else if (!currentUser) {
      setCurrentDate(new Date());
      setSingleDayDisplay(false);
      setEventFormOpen(false);
      setSettingsOpen(false);
      setCurrentEvent(null);
      setUserEvents([]);
    }
  }, [currentUser]);

  const ContextValue = {
    currentDate,
    setCurrentDate,
    singleDayDisplay,
    setSingleDayDisplay,
    eventFormOpen,
    setEventFormOpen,
    userEvents,
    setUserEvents,
    addEvent,
    currentEvent,
    setCurrentEvent,
    deleteEvent,
    settingsOpen,
    setSettingsOpen,
    deleteUserDatabase,
  };
  return (
    <CalendarContext.Provider value={ContextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export { useCalendarCtx, CalendarContextProvider };
