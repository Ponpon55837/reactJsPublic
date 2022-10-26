import moment from 'moment-timezone'

const weekDays: string[] = ['日', '一', '二', '三', '四', '五', '六']

const momentTimezone = (datetime?: string | number): moment.Moment => {
  return moment(datetime).tz('Asia/Taipei')
}

const useYMDFormat = (time: string | number): string => {
  if (time === null) return '-'
  return momentTimezone(time).format('YYYY/MM/DD')
}

const useYMDCFormat = (time: string | number): string => {
  const date: string = useYMDFormat(time)
  const we: number = parseInt(momentTimezone(time).format('d'), 10)
  return `${date} (${weekDays[we]})`
}

const useTTFormat = (time: string | number): string => {
  if (time === null) return '-'
  return momentTimezone(time).format('hh:mm')
}

const useYMDTFormat = (time: string | number): string => {
  if (time === null) return '-'
  return momentTimezone(time).format('YYYY/MM/DD HH:mm')
}

const UseYMDTFormat = (time: string | number): string => {
  if (time === null) return '-'
  return momentTimezone(time).format('YYYY/MM/DD HH:mm')
}

const UseYMDForList = (time: string | number): string => {
  return momentTimezone(time).format('YYYY/MM/DD')
}

const UseYMDTFormatForIndex = (time: string | number): string => {
  if (!moment(time).isValid()) return ''
  return momentTimezone(time).format('YYYY/MM/DD HH:mm')
}

const useTKKFormat = (time: string | number): string => {
  return momentTimezone(time).format('YYYY-MM-DDTHH:mm')
}

const useYear = () => {
  return moment().tz('Asia/Taipei').format('YYYY')
}

const useMonth = () => {
  return moment().tz('Asia/Taipei').format('MM')
}

const useMonthOnly = () => {
  return moment().tz('Asia/Taipei').format('M')
}

const useDay = () => {
  return moment().tz('Asia/Taipei').format('DD')
}

const useNow = () => {
  return moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
}

const useBeforeWeek = () => {
  return moment().subtract(7, 'days').tz('Asia/Taipei').format('YYYY/MM/DD')
}

const useBeforeMonth = () => {
  return moment().subtract(30, 'days').tz('Asia/Taipei').format('YYYY/MM/DD')
}

const useGetWeekStartDate = () => {
  const startDate = moment().clone().weekday(0).tz('Asia/Taipei').format('YYYY/MM/DD')
  return startDate
}

const useGetWeekEndDate = () => {
  const endDate = moment().clone().weekday(6).tz('Asia/Taipei').format('YYYY/MM/DD')
  return endDate
}

const useDiffDays = (inputArr: string[]) => {
  let getDiffDays = moment(inputArr[1]).diff(moment(inputArr[0]), 'days')
  return getDiffDays + 1
}

const GetAllDays = (inputArr: string[]) => {
  const startDate = moment(inputArr[0])
  const endDate = moment(inputArr[1])
  const allYearMonthDays = []
  while (endDate > startDate || startDate.format('D') === endDate.format('D')) {
    allYearMonthDays.push(startDate.format('MM-DD'))
    startDate.add(1, 'days')
  }

  return allYearMonthDays
}

const GetAllWeek = (inputArr: string[]) => {
  const startDate = moment(inputArr[0])
  const endDate = moment(inputArr[1])
  const allDays = []
  while (endDate > startDate || startDate.format('D') === endDate.format('D')) {
    allDays.push(startDate.format('DD'))
    startDate.add(1, 'days')
  }

  return allDays
}

const GetBeforeDay = (starDate: string, beforeDays: number) => {
  const newDay = moment(starDate)
    .subtract(beforeDays, 'days')
    .tz('Asia/Taipei')
    .format('YYYY/MM/DD')

  return newDay
}

const GetAfterDay = (starDate: string, afterDays: number) => {
  const newDay = moment(starDate).add(afterDays, 'days').tz('Asia/Taipei').format('YYYY/MM/DD')

  return newDay
}

const useToday = () => {
  return moment().tz('Asia/Taipei').format('YYYY/MM/DD')
}

const useMonthFirst = () => {
  return moment().tz('Asia/Taipei').format('YYYY/MM/01')
}

const useAfterWeek = () => {
  return moment().add(7, 'days').tz('Asia/Taipei').format('YYYY/MM/DD')
}

const useNowYMD = () => {
  return moment().tz('Asia/Taipei').format('YYYY年MM月DD日')
}

const useNowEight = () => {
  return moment().add(8, 'h').tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
}

const UseUniversalFormat = (time: string | number): string => {
  return moment(time).format()
}

const useUniversalFormat2 = (time: string | number): string => {
  if (time === null) return '-'
  return moment(time).format('YYYY/MM/DD HH:mm')
}

const UseUniversalFormat2 = (time: string | number): string => {
  if (time === null) return '-'
  return moment(time).format('YYYY/MM/DD HH:mm')
}

const UseUniversalFormat3 = (time: string | number): string => {
  return moment(time).format('HH:mm')
}

const UseUniversalFormat4 = (time: string | number): string => {
  return moment(time).format('YYYY/MM/DD')
}

const useUniversalYMDFormat = (time: string | number): string => {
  const day: string = moment(time).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
  const we: number = parseInt(momentTimezone(time).format('d'), 10)
  return `${day} (${weekDays[we]})`
}

const UseYMDFormat = (time: string | number): string => {
  return momentTimezone(time).format('YYYY/MM/DD HH:mm')
}

const UseHourFormat = (time: string | number): string => {
  return momentTimezone(time).format('HH')
}

const UseMinutesFormat = (time: string | number): string => {
  return momentTimezone(time).format('mm')
}

const GetMoneyThousands = (inputMoney: string | number) => {
  return String(inputMoney).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const GetMDFormat = (time: string | number): string => {
  return momentTimezone(time).format('MM-DD')
}

const Hide = () => {
  return <div />
}

export default Hide

export {
  weekDays,
  useYMDFormat,
  useYMDCFormat,
  useTTFormat,
  useYMDTFormat,
  useTKKFormat,
  useYear,
  useMonth,
  useMonthOnly,
  useDay,
  useNow,
  useNowEight,
  UseUniversalFormat,
  useUniversalFormat2,
  UseUniversalFormat2,
  UseUniversalFormat3,
  UseUniversalFormat4,
  useUniversalYMDFormat,
  UseYMDTFormat,
  UseYMDTFormatForIndex,
  UseYMDFormat,
  UseYMDForList,
  UseHourFormat,
  UseMinutesFormat,
  useNowYMD,
  useToday,
  useBeforeMonth,
  useMonthFirst,
  useBeforeWeek,
  useAfterWeek,
  useDiffDays,
  GetAllDays,
  GetAllWeek,
  GetBeforeDay,
  GetAfterDay,
  GetMoneyThousands,
  GetMDFormat,
  useGetWeekStartDate,
  useGetWeekEndDate,
}
