import moment from 'moment-timezone'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const useYMDFormat = time => {
  return moment(time).tz('Asia/Taipei').format('YYYY/MM/DD')
}

const useYMDCFormat = time => {
  const day = moment(time).tz('Asia/Taipei').format('YYYY/MM/DD')
  const we = moment(time).tz('Asia/Taipei').format('d')
  return `${day} (${weekDays[we]})`
}

const UseWorkDayFormat = time => {
  const day = moment(time).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss')
  return day
}

const useTTFormat = time => {
  return moment(time).tz('Asia/Taipei').format('hh:mm')
}

const useYMDTFormat = time => {
  if (moment(time).isValid()) {
    return moment(time).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
  } else {
    return ''
  }
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

const UseUniversalFormat = time => {
  return moment(time).format()
}

const useUniversalFormat2 = time => {
  return moment(time).format('YYYY/MM/DD HH:mm')
}

const useUniversalYMDFormat = time => {
  const day = moment(time).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm')
  const we = moment(time).tz('Asia/Taipei').format('d')
  return `${day} (${weekDays[we]})`
}

const Hide = () => {
  return <div />
}

export default Hide

export {
  useYMDFormat,
  useYMDCFormat,
  UseWorkDayFormat,
  useTTFormat,
  useYMDTFormat,
  useTKKFormat,
  useYear,
  useMonth,
  useMonthOnly,
  useDay,
  UseUniversalFormat,
  useUniversalFormat2,
  useUniversalYMDFormat,
}
