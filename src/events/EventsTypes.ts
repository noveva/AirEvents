export const EVENTS = ['boil', 'fry', 'oven', 'window', 'laundry'] as const;
export const LOCATIONS = ['livingroom', 'bedroom'] as const;
export type EventType = (typeof EVENTS)[number];
export type EventLocation = (typeof LOCATIONS)[number];

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
