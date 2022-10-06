import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns'
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker'
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker'

interface CustomDateRangePickerProps {
  startDate?: string
  endDate?: string
  value?: any
  disableFuture?: boolean
  onChange: any
}

const CustomRangeDatePicker = ({
  startDate = '初始日期',
  endDate = '結束日期',
  disableFuture = true,
  value,
  onChange,
}: CustomDateRangePickerProps) => {
  // const [value, setValue] = useState<DateRange<Date>>([null, null])

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: startDate, end: endDate }}
    >
      <DesktopDateRangePicker
        inputFormat="yyyy/MM/dd"
        disableFuture={disableFuture}
        value={value}
        onChange={onChange}
        renderInput={(startProps, endProps) => (
          <>
            <TextField type="date" {...startProps} size="small" />
            <Box sx={{ mx: 1 }}> 至 </Box>
            <TextField type="date" {...endProps} size="small" />
          </>
        )}
      />
    </LocalizationProvider>
  )
}

export default CustomRangeDatePicker
