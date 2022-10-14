import { TextField, MenuItem } from '@mui/material'
import PropTypes from 'prop-types'

interface Props {
  fullWidth?: boolean
  label: string
  defaultValue?: string | number
  nullValueOption?: boolean
  nullValueOptionValue?: string
  disabled?: boolean
  selectOptions: Array<{ id: string | number; name: string }>
  error: boolean
  helperText?: string
  register: any
}

const CustomTextFieldSelect = ({
  fullWidth = true,
  label,
  defaultValue = '0',
  nullValueOption = false,
  nullValueOptionValue = '-',
  disabled = false,
  selectOptions = [],
  error = false,
  helperText = '',
  register,
}: Props) => {
  return (
    <TextField
      select
      size="small"
      fullWidth={fullWidth}
      label={label}
      defaultValue={defaultValue}
      disabled={disabled}
      inputProps={register}
      error={error}
      helperText={helperText}
    >
      {nullValueOption && <MenuItem value={''}>{nullValueOptionValue}</MenuItem>}
      {selectOptions.length > 0 &&
        selectOptions.map((sle) => (
          <MenuItem key={sle.id} value={sle.id}>
            {sle.name}
          </MenuItem>
        ))}
      {selectOptions.length === 0 && !nullValueOption && <MenuItem value="">暫無資料</MenuItem>}
    </TextField>
  )
}

export default CustomTextFieldSelect

CustomTextFieldSelect.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string,
  defaultValue: PropTypes.string,
  nullValueOption: PropTypes.bool,
  nullValueOptionValue: PropTypes.string,
  disabled: PropTypes.bool,
  selectOptions: PropTypes.array,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  register: PropTypes.object,
}
