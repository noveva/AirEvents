import {Dispatch, createContext} from 'react';
import {Event} from './EventsTypes';
import {EventsReducerAction} from './EventsReducer';

export const EventsContext = createContext<Event[]>([]);
export const EventsDispatchContext =
  createContext<Dispatch<EventsReducerAction> | null>(null);
