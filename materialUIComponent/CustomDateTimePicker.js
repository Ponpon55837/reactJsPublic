import zhLocale from 'date-fns/locale/zh-TW'
import { TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import TimePicker from '@mui/lab/TimePicker'
import DateTimePicker from '@mui/lab/DateTimePicker'
import PropTypes from 'prop-types'

const CustomDatePicker = ({
  time,
  onChange,
  disabled = false,
  views = ['year', 'month', 'date'],
  label = '請選擇時間',
  format = 'yyyy-MM-dd',
  helperText = '',
  error = false,
  clearable = false,
  variant = 'standard',
}) => {
  return (
    <LocalizationProvider locale={zhLocale} dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        inputFormat={format}
        clearable={clearable}
        mask="____-__-__"
        value={time}
        onChange={onChange}
        disabled={disabled}
        renderInput={params => (
          <TextField {...params} variant={variant} helperText={helperText} error={error} />
        )}
      />
    </LocalizationProvider>
  )
}

const CustomTimePicker = ({
  time,
  onChange,
  label = '請選擇時間',
  format = 'HH:mm',
  ampm = true,
  helperText = '',
  error = false,
}) => {
  return (
    <LocalizationProvider locale={zhLocale} dateAdapter={AdapterDateFns}>
      <TimePicker
        inputFormat={format}
        mask="__:__ _M"
        openTo={('minutes', 'hours')}
        label={label}
        value={time}
        ampm={ampm}
        onChange={onChange}
        renderInput={params => (
          <TextField {...params} variant="standard" helperText={helperText} error={error} />
        )}
      />
    </LocalizationProvider>
  )
}

const CustomDateTimePicker = ({
  time,
  onChange,
  label = '請選擇時間',
  inputFormat = 'yyyy-MM-dd HH:mm',
  ampm = true,
  helperText = '',
  error = false,
  disabled = false,
}) => {
  return (
    <LocalizationProvider locale={zhLocale} dateAdapter={AdapterDateFns}>
      <DateTimePicker
        disabled={disabled}
        label={label}
        value={time}
        ampm={ampm}
        inputFormat={inputFormat}
        mask="____-__-__ __:__"
        onChange={onChange}
        renderInput={params => (
          <TextField variant="standard" {...params} error={error} helperText={helperText} />
        )}
      />
    </LocalizationProvider>
  )
}

export default function Hide() {
  return <>hide</>
}

export { CustomDatePicker, CustomTimePicker, CustomDateTimePicker }

CustomDatePicker.propTypes = {
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func,
  views: PropTypes.array,
  label: PropTypes.string,
  format: PropTypes.string,
  helperText: PropTypes.node,
  error: PropTypes.bool,
  variant: PropTypes.string,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
}

CustomTimePicker.propTypes = {
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  format: PropTypes.string,
  ampm: PropTypes.bool,
  helperText: PropTypes.node,
  error: PropTypes.bool,
}

CustomDateTimePicker.propTypes = {
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  inputFormat: PropTypes.string,
  ampm: PropTypes.bool,
  helperText: PropTypes.node,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
}
