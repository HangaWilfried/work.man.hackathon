import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)

export const getConvertedDate = (date: string): string => {
  return dayjs(date).utc(true).format('MMMM D, YYYY')
}
