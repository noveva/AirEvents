export const EVENTS_API = {
  add: '/api/events',
  fetch: (from: number, to: number) => `/api/events?from=${from}&to=${to}`,
};
