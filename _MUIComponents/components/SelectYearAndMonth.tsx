import moment from 'moment-timezone'
import { useLocales } from '@locales/index'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const defaultValue = {
  getYear: moment().format('YYYY'),
  getMonth: moment().format('MM'),
}

const yearOption: any = []
for (let i = 0; i <= 4; i += 1) {
  const tempValue = parseInt(defaultValue.getYear, 10) - i
  const tempLabel = `${parseInt(defaultValue.getYear, 10) - i}`

  yearOption.push({
    value: tempValue,
    label: tempLabel,
  })
}

const monthOption: any = []
for (let i = 1; i <= 12; i += 1) {
  monthOption.push({ value: i, label: `${(i + '').padStart(2, '0')}` })
}

interface InputValues {
  yearValue?: any
  monthValue?: any
  monthOpen?: boolean
  yearOnChange: any
  monthOnChange: any
  disabled?: boolean
  mr?: any
}

const SelectYearAndMonth = ({
  yearValue,
  monthValue,
  monthOpen = true,
  yearOnChange,
  monthOnChange,
  disabled,
  mr = 1,
}: InputValues) => {
  const { t } = useLocales()
  return (
    <>
      <FormControl
        size="small"
        sx={{
          minWidth: 120,
          mr: mr,
          mb: 1,
        }}
        disabled={disabled}
      >
        <InputLabel id="demo-simple-select-helper-label">{`${t('TIME.year')}`}</InputLabel>
        <Select value={yearValue} label={`${t('TIME.year')}`} onChange={yearOnChange}>
          {yearOption.map((year: { value: string; label: string }) => (
            <MenuItem key={year.value} value={year.value}>
              {year.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{
          mr: '.4rem',
          minWidth: 120,
          display: !monthOpen ? 'none' : 'default',
        }}
        disabled={disabled}
      >
        <InputLabel id="demo-simple-select-helper-label">{`${t('TIME.month')}`}</InputLabel>
        <Select value={monthValue} label={`${t('TIME.month')}`} onChange={monthOnChange}>
          {monthOption.map((month: { value: string; label: string }) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectYearAndMonth
