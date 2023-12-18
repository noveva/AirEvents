import {format} from 'date-fns';

export function formatHHmm(datString: number): string {
  return format(new Date(datString), 'HH:mm');
}
