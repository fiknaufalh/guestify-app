import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const convertDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

export function formatTimestampToDate(timestamp: string): string {
  return format(new Date(timestamp), "d MMMM yyyy", { locale: id });
}
