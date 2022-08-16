import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput'
import PropTypes from 'prop-types'

const CustomSelectOptions = ({
  checked = false,
  defaultValue = '0',
  value = '0',
  label = '',
  variant = 'outlined',
  nullValueOption = false,
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
      <InputLabel id="demo-simple-select-helper-label" shrink>
        {label}
      </InputLabel>
      <Select
        autoWidth
        displayEmpty
        defaultValue={defaultValue}
        value={value}
        label={label}
        onChange={onChange}
        input={<OutlinedInput notched label={label} />}
      >
        {nullValueOption && (
          <MenuItem disabled value={''}>
            此部門尚無人員
          </MenuItem>
        )}
        {selectOptions.map(sle => (
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
  variant: PropTypes.string,

  disabled: PropTypes.bool,
  nullValueOption: PropTypes.bool,
  nullValueOptionLabel: PropTypes.string,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
  minWidth: PropTypes.number,
  mr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ml: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
