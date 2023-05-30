import { useLocales } from '@locales/index'
import { TextField, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import {
  FormatDatePickerValue,
  FormatDateTimePickerValue,
  HandlePickerLanguage,
} from '@utils/utilsFunction'

interface datePickerValues {
  label: string
  time?: string
  views?: string[]
  format?: string
  variant?: 'outlined' | 'filled' | 'standard' | undefined
  sx?: any
  readOnly?: boolean
}

const CustomDatePickerView = ({
  time,
  views = ['year', 'month', 'date'],
  label = '',
  format = 'yyyy-MM-dd',
  variant = 'filled',
  sx,
  readOnly = true,
}: datePickerValues) => {
  const { currentLang } = useLocales()
  const theme = useTheme()
  const windowBig = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <LocalizationProvider
      locale={HandlePickerLanguage(currentLang.value)}
      dateAdapter={AdapterDateFns}
    >
      <DatePicker
        label={label}
        inputFormat={format}
        mask="____-__-__"
        value={FormatDatePickerValue(time)}
        onChange={() => {}}
        renderInput={(params) => (
          <TextField
            {...params}
            size={windowBig ? 'medium' : 'small'}
            variant={variant}
            sx={sx}
            InputProps={{
              readOnly: readOnly,
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}

interface timePickerValues {
  label: string
  time?: string
  format?: string
  variant?: 'outlined' | 'filled' | 'standard' | undefined
  ampm?: boolean
  sx?: any
  readOnly?: boolean
}

const CustomTimePickerView = ({
  label,
  time,
  format = 'HH:mm',
  variant = 'filled',
  ampm = true,
  sx,
  readOnly = true,
}: timePickerValues) => {
  const { currentLang } = useLocales()
  const theme = useTheme()
  const windowBig = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <LocalizationProvider
      locale={HandlePickerLanguage(currentLang.value)}
      dateAdapter={AdapterDateFns}
    >
      <TimePicker
        inputFormat={format}
        mask="__:__ _M"
        openTo={'hours'}
        label={label}
        value={time}
        ampm={ampm}
        onChange={() => {}}
        renderInput={(params) => (
          <TextField
            {...params}
            size={windowBig ? 'medium' : 'small'}
            variant={variant}
            sx={sx}
            InputProps={{
              readOnly: readOnly,
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}

interface dateTimePickerValues {
  label: string
  time?: string
  inputFormat?: string
  ampm?: boolean
  variant?: 'outlined' | 'filled' | 'standard' | undefined
  minutesStep?: number
  sx?: any
  readOnly?: boolean
}

const CustomDateTimePickerView = ({
  time,
  label = '',
  inputFormat = 'yyyy-MM-dd HH:mm',
  ampm = true,
  variant = 'filled',
  minutesStep = 1,
  sx,
  readOnly = true,
}: dateTimePickerValues) => {
  const { currentLang } = useLocales()
  const theme = useTheme()
  const windowBig = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <LocalizationProvider
      locale={HandlePickerLanguage(currentLang.value)}
      dateAdapter={AdapterDateFns}
    >
      <DateTimePicker
        label={label}
        value={FormatDateTimePickerValue(time)}
        ampm={ampm}
        inputFormat={inputFormat}
        minutesStep={minutesStep}
        mask="____-__-__ __:__"
        onChange={() => {}}
        renderInput={(params) => (
          <TextField
            size={windowBig ? 'medium' : 'small'}
            variant={variant}
            {...params}
            sx={sx}
            InputProps={{
              readOnly: readOnly,
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default function Hide() {
  return <>hide</>
}

export { CustomDatePickerView, CustomTimePickerView, CustomDateTimePickerView }
