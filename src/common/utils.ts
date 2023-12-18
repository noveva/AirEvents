import {format} from 'date-fns';

export function formatHHmm(datString: number): string {
  return format(new Date(datString), 'HH:mm');
}

// number of seconds since epoch
export function getUnixTimestamp(JSTimestamp: number): number {
  return Math.floor(JSTimestamp / 1000);
}

export function getUnixNow() {
  const now = new Date().getTime();
  return getUnixTimestamp(now);
}
