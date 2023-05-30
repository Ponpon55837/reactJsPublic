import { useLocales } from '@locales/index'
import { TextField, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { StyledTextField } from '@styles/styles_normal/Web/commonStyle'
import { COMMON_PURE_WHITE, WEB_BORDER_DARK, WEB_COMMON_WHITE_GREY } from '@theme/colorManager'
import { HandlePickerLanguage } from '@utils/utilsFunction'

interface datePickerValues {
  label?: string
  time: string
  onChange: any
  disabled?: boolean
  views?: string[]
  format?: string
  helperText?: string
  error?: boolean
  variant?: 'outlined' | 'filled' | 'standard' | undefined
  sx?: any
}

const CustomDatePicker = ({
  time,
  onChange,
  disabled = false,
  views = ['year', 'month', 'date'],
  label = '',
  format = 'yyyy-MM-dd',
  helperText = '',
  error = false,
  variant = 'standard',
  sx,
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
        value={time}
        onChange={onChange}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            size={windowBig ? 'medium' : 'small'}
            variant={disabled ? 'filled' : variant}
            helperText={helperText}
            error={error}
            sx={sx}
          />
        )}
      />
    </LocalizationProvider>
  )
}

// TextField 樣式差異 (StyledTextField)
const WebCustomDatePicker = ({
  time,
  onChange,
  format = 'yyyy-MM-dd',
  helperText = '',
  error = false,
  disabled = false,
}: datePickerValues) => {
  const { currentLang } = useLocales()

  return (
    <LocalizationProvider
      locale={HandlePickerLanguage(currentLang.value)}
      dateAdapter={AdapterDateFns}
    >
      <DatePicker
        disabled={disabled}
        inputFormat={format}
        mask="____-__-__"
        value={time}
        onChange={onChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            sx={{
              input: { color: WEB_COMMON_WHITE_GREY, fontSize: '18px' },
              label: { color: COMMON_PURE_WHITE },
              svg: { color: WEB_COMMON_WHITE_GREY },
            }}
            fullWidth
            size="small"
            margin="dense"
            variant="outlined"
            style={{ fontSize: '18px' }}
            helperText={helperText}
            error={error}
          />
        )}
      />
    </LocalizationProvider>
  )
}

interface timePickerValues {
  label: string
  time: string
  onChange: any
  disabled?: boolean
  ampm?: boolean
  views?: string[]
  format?: string
  helperText?: string
  error?: boolean
  variant?: 'outlined' | 'filled' | 'standard' | undefined
  sx?: any
}

const CustomTimePicker = ({
  time,
  onChange,
  label = '',
  format = 'HH:mm',
  ampm = true,
  helperText = '',
  error = false,
  variant = 'standard',
  disabled = false,
  sx,
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
        onChange={onChange}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            size={windowBig ? 'medium' : 'small'}
            variant={disabled ? 'filled' : variant}
            helperText={helperText}
            error={error}
            sx={sx}
          />
        )}
      />
    </LocalizationProvider>
  )
}

interface dateTimePickerValues {
  label: string
  time: string
  onChange: any
  disabled?: boolean
  ampm?: boolean
  views?: string[]
  format?: string
  helperText?: string
  error?: boolean
  inputFormat?: string
  minutesStep?: number
  variant?: 'outlined' | 'filled' | 'standard' | undefined
  sx?: any
}

const CustomDateTimePicker = ({
  time,
  onChange,
  label = '',
  inputFormat = 'yyyy-MM-dd HH:mm',
  ampm = true,
  helperText = '',
  error = false,
  disabled = false,
  variant = 'standard',
  minutesStep = 1,
  sx,
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
        disabled={disabled}
        label={label}
        value={time}
        ampm={ampm}
        inputFormat={inputFormat}
        minutesStep={minutesStep}
        mask="____-__-__ __:__"
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            size={windowBig ? 'medium' : 'small'}
            variant={disabled ? 'filled' : variant}
            {...params}
            error={error}
            helperText={helperText}
            sx={sx}
          />
        )}
      />
    </LocalizationProvider>
  )
}

interface monthPickerValues {
  time: string
  onChange: any
  label?: string
  views?: ['year', 'month']
  openTo?: 'day' | 'month' | 'year'
  format?: string
  helperText?: string
  error?: boolean
  disabled?: boolean
}

const CustomMonthPicker = ({
  time,
  onChange,
  openTo = 'month',
  views = ['year', 'month'],
  label = '',
  format = 'yyyy-MM',
  helperText = '',
  error = false,
  disabled = false,
}: monthPickerValues) => {
  const { currentLang } = useLocales()
  // 禁止手動輸入數值僅能點選
  const onKeyDown = (e: any) => {
    e.preventDefault()
  }
  return (
    <LocalizationProvider
      locale={HandlePickerLanguage(currentLang.value)}
      dateAdapter={AdapterDateFns}
    >
      <DatePicker
        label={time ? '' : label}
        openTo={openTo}
        views={views}
        disabled={disabled}
        inputFormat={format}
        mask="____-__-__"
        value={time}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            onKeyDown={onKeyDown}
            {...params}
            InputLabelProps={{ shrink: false }}
            sx={{
              input: { color: WEB_COMMON_WHITE_GREY, fontSize: '18px' },
              label: { color: COMMON_PURE_WHITE },
              svg: { color: WEB_COMMON_WHITE_GREY },
            }}
            fullWidth
            size="small"
            margin="dense"
            variant="outlined"
            style={{
              border: `2px solid ${WEB_BORDER_DARK}`,
              borderRadius: '10px',
              fontSize: '18px',
            }}
            helperText={helperText}
            error={error}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default function Hide() {
  return <>hide</>
}

export {
  CustomDatePicker,
  WebCustomDatePicker,
  CustomTimePicker,
  CustomDateTimePicker,
  CustomMonthPicker,
}
