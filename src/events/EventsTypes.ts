enum Locations {
  livingroom = 'livingroom',
  bedroom = 'bedroom',
}

export const EVENTS = ['boil', 'fry', 'oven', 'window', 'laundry'];
export const LOCATIONS = [Locations.livingroom, Locations.bedroom];

export const LocationIcons = {
  [Locations.bedroom]: 'bed',
  [Locations.livingroom]: 'cafe',
};

export type EventType = (typeof EVENTS)[number];

export type EventLocation = Locations.livingroom | Locations.bedroom;

export type Event = {
  id?: string;
  eventType: EventType;
  locationId: EventLocation;
  startTimestamp: number;
  endTimestamp?: number;
};

export enum EventModals {
  addEvent = 'addEvent',
  stopTime = 'stopTime',
}

export type EventModalStateString = EventModals.addEvent | EventModals.stopTime;

type TimeStamp = {
  label: string;
  value: number;
};

export const TIMESTAMPS: TimeStamp[] = [
  {label: 'now', value: 0},
  {label: '5m ago', value: 5 * 60},
  {label: '10m ago', value: 10 * 60},
  {label: '20m ago', value: 20 * 60},
  {label: '30m ago', value: 30 * 60},
  {label: '40m ago', value: 40 * 60},
  {label: '50m ago', value: 50 * 60},
  {label: '1h ago', value: 60 * 60},
];
