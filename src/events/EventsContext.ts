import {Dispatch, createContext} from 'react';
import {EventsReducerAction} from './EventsReducer';

export const EventsDispatchContext =
  createContext<Dispatch<EventsReducerAction> | null>(null);
