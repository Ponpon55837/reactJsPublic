import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import PropTypes from 'prop-types'

const CustomSelectOptions = ({
  checked = false,
  defaultValue = '0',
  value = '0',
  label = '',
  variant = 'outlined',
  nullValueOption = false,
  nullValueOptionValue = '-',
  disabled = false,
  selectOptions = [],
  onChange,
  minWidth = 140,
  mr = 1,
  ml = 'default',
}) => {
  return (
    <FormControl
      variant={variant}
      size="small"
      error={checked}
      disabled={disabled}
      sx={{
        minWidth: minWidth,
        mr: mr,
        ml: ml,
      }}
    >
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select defaultValue={defaultValue} value={value} label={label} onChange={onChange}>
        {nullValueOption && <MenuItem value={''}>{nullValueOptionValue}</MenuItem>}
        {selectOptions.length > 0 &&
          selectOptions.map((sle) => (
            <MenuItem key={sle.id} value={sle.id}>
              {sle.name}
            </MenuItem>
          ))}
        {selectOptions.length === 0 && !nullValueOption && <MenuItem value="">暫無資料</MenuItem>}
      </Select>
      {checked && <FormHelperText>請選擇{label}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSelectOptions

CustomSelectOptions.propTypes = {
  checked: PropTypes.bool,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  shrink: PropTypes.bool,
  disabled: PropTypes.bool,
  nullValueOption: PropTypes.bool,
  nullValueOptionValue: PropTypes.string,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
  minWidth: PropTypes.number,
  mr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ml: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
