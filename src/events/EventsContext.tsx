import React, {Dispatch, createContext, useContext, useReducer} from 'react';
import {EventsReducerAction, eventsReducer} from './EventsReducer';
import {Event} from './EventsTypes';

type Props = {
  children: React.JSX.Element | React.JSX.Element[];
};

const EventsContext = createContext<Event[]>([]);

const EventsDispatchContext =
  createContext<Dispatch<EventsReducerAction> | null>(null);

export function useEvents() {
  return useContext(EventsContext);
}

export function useEventsDispatch(): Dispatch<EventsReducerAction> | null {
  return useContext(EventsDispatchContext);
}

export function EventsProvider({children}: Props) {
  const [eventsList, dispatch] = useReducer(eventsReducer, []);

  return (
    <EventsContext.Provider value={eventsList}>
      <EventsDispatchContext.Provider value={dispatch}>
        {children}
      </EventsDispatchContext.Provider>
    </EventsContext.Provider>
  );
}
