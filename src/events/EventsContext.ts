import {Dispatch, createContext} from 'react';
import {EventsReducerAction} from './Events';

export const EventsDispatchContext =
  createContext<Dispatch<EventsReducerAction> | null>(null);
