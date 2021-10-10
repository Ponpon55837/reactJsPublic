import zhLocale from "date-fns/locale/zh-TW"
import {
  TextField
}  from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import TimePicker from '@mui/lab/TimePicker'
import DateTimePicker from '@mui/lab/DateTimePicker'

const CustomDatePicker = ({
  time,
  onChange,
  views=['year', 'month', 'date'],
  label='請選擇時間',
  format='yyyy-MM-dd',
  helperText = '',
  error = false,
}) => {
  return (
    <LocalizationProvider locale={zhLocale} dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        inputFormat={format}
        mask="____-__-__"
        value={time}
        onChange={onChange}
        renderInput={(params) =>
          <TextField {...params}
            variant="standard"
            helperText={helperText}
            error={error}
          />
        }
      />
    </LocalizationProvider>
  )
}

const CustomTimePicker = ({
  time,
  onChange,
  label='請選擇時間',
  format='HH:mm',
  ampm = true,
  helperText = '',
  error = false,
}) => {
  return (
    <LocalizationProvider locale={zhLocale} dateAdapter={AdapterDateFns}>
      <TimePicker
        inputFormat={format}
        mask="__:__ _M"
        openTo={'minutes', 'hours'}
        label={label}
        value={time}
        ampm={ampm}
        onChange={onChange}
        renderInput={(params) =>
        <TextField {...params}
          variant="standard"
          helperText={helperText}
          error={error}
          />
        }
      />
    </LocalizationProvider>
  )
}

const CustomDateTimePicker = ({
  time,
  onChange,
  label='請選擇時間',
  inputFormat="yyyy-MM-dd HH:mm",
  ampm = true,
  helperText = '',
  error = false,
}) => {
  return (
    <LocalizationProvider locale={zhLocale} dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        value={time}
        ampm={ampm}
        inputFormat={inputFormat}
        mask="____-__-__ __:__"
        onChange={onChange}
        renderInput={(params) =>
          <TextField
            variant="standard"
            {...params}
            error={error}
            helperText={helperText}
          />
        }
      />
    </LocalizationProvider>
  )
}

export default function Hide() {
  return (<>hide</>)
}

export {
  CustomDatePicker,
  CustomTimePicker,
  CustomDateTimePicker
}
