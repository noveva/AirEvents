import {format} from 'date-fns';

export function formatHHmm(datString: number | Date): string {
  return format(new Date(datString), 'HH:mm');
}
