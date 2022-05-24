import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'

const defaultValue = {
  getYear: moment().format('YYYY'),
  getMonth: moment().format('MM'),
}

const yearOption = []
for (let i = 0; i <= 4; i += 1) {
  yearOption.push({
    value: defaultValue.getYear - i,
    label: `${defaultValue.getYear - i} 年`,
  })
}

const monthOption = []
for (let i = 1; i <= 12; i += 1) {
  monthOption.push({ value: i, label: `${(i + '').padStart(2, '0')} 月` })
}

const SelectYearAndMonth = ({
  yearValue,
  monthValue,
  dateValue,
  monthOpen = true,
  yearOnChange,
  monthOnChange,
  dateOnChange,
  disabled,
}) => {
  const getLastDay = new Date(yearValue, monthValue, 0).getDate()
  const dateOption = []
  for (let i = 1; i <= getLastDay; i += 1) {
    dateOption.push({ value: i, label: `${(i + '').padStart(2, '0')} 日` })
  }

  return (
    <>
      <FormControl
        size="small"
        sx={{
          minWidth: 120,
          mt: 1,
          mr: '.5rem',
          mb: 1,
        }}
        disabled={disabled}
      >
        <InputLabel id="demo-simple-select-helper-label">年</InputLabel>
        <Select value={yearValue} label="年" onChange={yearOnChange}>
          {yearOption.map(year => (
            <MenuItem key={year.value} value={year.value}>
              {year.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{
          mt: 1,
          mr: '.5rem',
          minWidth: 120,
          display: !monthOpen && 'none',
        }}
        disabled={disabled}
      >
        <InputLabel id="demo-simple-select-helper-label">月</InputLabel>
        <Select value={monthValue} label="月" onChange={monthOnChange}>
          {monthOption.map(month => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{
          mt: 1,
          minWidth: 120,
        }}
      >
        <InputLabel id="demo-simple-select-helper-label">日</InputLabel>
        <Select value={dateValue} label="月" onChange={dateOnChange}>
          <MenuItem value="">-</MenuItem>
          {dateOption.map(date => (
            <MenuItem key={date.value} value={date.value}>
              {date.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectYearAndMonth

SelectYearAndMonth.propTypes = {
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  monthValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dateValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  monthOpen: PropTypes.bool,
  yearOnChange: PropTypes.func,
  monthOnChange: PropTypes.func,
  dateOnChange: PropTypes.func,
  disabled: PropTypes.bool,
}
