import moment from 'moment-timezone'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const useYMDFormat = time => {
  if (time === null) return ''
  return moment(time).tz('Asia/Taipei').format('YYYY/MM/DD')
}

const useYMDCFormat = time => {
  const day = moment(time).tz('Asia/Taipei').format('YYYY/MM/DD')
  const we = moment(time).tz('Asia/Taipei').format('d')
  return `${day} (${weekDays[we]})`
}

const useTTFormat = time => {
  return moment(time).tz('Asia/Taipei').format('hh:mm')
}

const useYMDTFormat = time => {
  if (time === null) return '-'
  return moment(time).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
}

const useTKKFormat = time => {
  return moment(time).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm')
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

const useToday = () => {
  return moment().tz('Asia/Taipei').format('YYYY/MM/DD')
}

const useNowYMD = () => {
  return moment().tz('Asia/Taipei').format('YYYY年MM月DD日')
}

const useNowEight = () => {
  return moment().add(8, 'h').tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
}

const UseUniversalFormat = time => {
  return moment(time).format()
}

const useUniversalFormat2 = time => {
  return moment(time).format('YYYY/MM/DD HH:mm')
}

const UseUniversalFormat2 = time => {
  return moment(time).format('YYYY/MM/DD HH:mm')
}

const UseUniversalFormat3 = time => {
  return moment(time).format('HH:mm')
}

const UseUniversalFormat4 = time => {
  return moment(time).format('YYYY/MM/DD')
}

const useUniversalYMDFormat = time => {
  const day = moment(time).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
  const we = moment(time).tz('Asia/Taipei').format('d')
  return `${day} (${weekDays[we]})`
}

const UseYMDFormat = time => {
  return moment(time).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
}

const UseHourFormat = time => {
  return moment(time).tz('Asia/Taipei').format('HH')
}

const UseMinutesFormat = time => {
  return moment(time).tz('Asia/Taipei').format('mm')
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
  UseYMDFormat,
  UseHourFormat,
  UseMinutesFormat,
  useNowYMD,
  useToday,
}
