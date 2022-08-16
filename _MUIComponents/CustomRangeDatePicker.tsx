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
}

const CustomRangeDatePicker = ({
  startDate = '初始日期',
  endDate = '結束日期',
}: CustomDateRangePickerProps) => {
  const [value, setValue] = useState<DateRange<Date>>([null, null])

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: startDate, end: endDate }}
    >
      <DesktopDateRangePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 1 }}> 至 </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  )
}

export default CustomRangeDatePicker
