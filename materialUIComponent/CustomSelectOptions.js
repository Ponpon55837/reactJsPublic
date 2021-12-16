import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import PropTypes from 'prop-types'

const CustomSelectOptions = ({
  checked = false,
  defaultValue = '0',
  value = '0',
  label = '',
  nullValueOption = false,
  selectOptions = [],
  onChange = () => {},
}) => {
  return (
    <FormControl
      variant="outlined"
      size="small"
      error={checked}
      sx={{
        minWidth: 140,
        mr: 1,
      }}
    >
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select autoWidth defaultValue={defaultValue} value={value} label={label} onChange={onChange}>
        {nullValueOption && <MenuItem value={''}>-</MenuItem>}
        {selectOptions !== null &&
          selectOptions.map(sle => (
            <MenuItem key={sle.id} value={sle.id}>
              {sle.name}
            </MenuItem>
          ))}
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
  nullValueOption: PropTypes.bool,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
}
