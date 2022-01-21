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
  monthOpen = true,
  yearOnChange,
  monthOnChange,
  marginTopBoolean = true,
}) => {
  return (
    <>
      <FormControl
        size="small"
        sx={{
          minWidth: 120,
          mt: marginTopBoolean ? 1 : 0,
          mr: 1,
          mb: 1,
        }}
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
          mt: marginTopBoolean ? 1 : 0,
          minWidth: 120,
          display: !monthOpen && 'none',
        }}
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
    </>
  )
}

export default SelectYearAndMonth

SelectYearAndMonth.propTypes = {
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  monthValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  monthOpen: PropTypes.bool,
  yearOnChange: PropTypes.func,
  monthOnChange: PropTypes.func,
  marginTopBoolean: PropTypes.bool,
}
