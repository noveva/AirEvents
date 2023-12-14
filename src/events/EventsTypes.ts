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
