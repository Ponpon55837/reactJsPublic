import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  ListSubheader,
} from '@mui/material'
import PropTypes from 'prop-types'

const CustomMultiSelectOptions = ({
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
  const renderSelectGroup = (inputArr, idx) => {
    const items = inputArr.locationData.map(p => {
      return (
        <MenuItem key={p.id} value={p.id}>
          {p.name}
        </MenuItem>
      )
    })
    return [
      <ListSubheader sx={{ fontSize: '1rem', fontWeight: 500, fontStyle: 'italic' }} key={idx}>
        {inputArr.name}
      </ListSubheader>,
      items,
    ]
  }

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
      <InputLabel htmlFor="grouped-native-select">{label}</InputLabel>
      <Select
        autoWidth
        id="grouped-native-select"
        defaultValue={defaultValue}
        value={value}
        label={label}
        onChange={onChange}
      >
        {selectOptions?.map((p, idx) => renderSelectGroup(p, idx))}
      </Select>
      {checked && <FormHelperText>請選擇{label}</FormHelperText>}
    </FormControl>
  )
}

export default CustomMultiSelectOptions

CustomMultiSelectOptions.propTypes = {
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
