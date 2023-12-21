import {Event} from './EventsTypes';

export enum EventsReducerActionType {
  loaded = 'loaded',
  added = 'added',
  updated = 'updated',
}

export type EventsReducerActionLoaded = {
  type: EventsReducerActionType.loaded;
  payload: Event[];
};

export type EventsReducerActionAdded = {
  type: EventsReducerActionType.added;
  payload: Event;
};

export type EventsReducerActionUpdated = {
  type: EventsReducerActionType.updated;
  payload: Event;
};

export type EventsReducerAction =
  | EventsReducerActionLoaded
  | EventsReducerActionAdded
  | EventsReducerActionUpdated;

export type EventsReducerState = Event[];

function sortEvents(events: Event[] = []) {
  return events.sort(
    (eventA, eventB) => eventB.startTimestamp - eventA.startTimestamp,
  ); //latest events first
}

export function eventsReducer(events: Event[], action: EventsReducerAction) {
  let list = [];

  switch (action.type) {
    case 'loaded': {
      list = action.payload;
      break;
    }
    case 'added': {
      list = events.concat(action.payload);
      break;
    }
    case 'updated': {
      list = events.map(event => {
        if (action.payload && event.id === action.payload.id) {
          return action.payload;
        }
        return event;
      });
      break;
    }
    default:
      list = events;
  }

  return sortEvents(list);
}
