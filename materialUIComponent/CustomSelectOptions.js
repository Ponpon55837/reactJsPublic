import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import PropTypes from 'prop-types'

const CustomSelectOptions = ({
  checked = false,
  defaultValue = '0',
  value = '0',
  label = '',
  variant = 'outlined',
  nullValueOption = false,
  selectOptions = [],
  onChange = () => {},
}) => {
  return (
    <FormControl
      variant={variant}
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
  shrink: PropTypes.bool,
  nullValueOption: PropTypes.bool,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
}
