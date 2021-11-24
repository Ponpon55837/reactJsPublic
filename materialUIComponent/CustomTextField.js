import { TextField, InputAdornment } from '@mui/material'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import PropTypes from 'prop-types'

const CustomTextField = ({
  label,
  type = 'text',
  variant = 'standard',
  helperText = '',
  placeholder = '',
  autoComplete = null,
  error = null,
  disabled = false,
  fullWidth = true,
  shrink = true,
  iconStatus = false,
  icon = <BorderColorOutlinedIcon size="small" />,
  register,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      type={type}
      variant={variant}
      helperText={helperText}
      autoComplete={autoComplete}
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      {...register}
      InputLabelProps={{
        shrink: shrink,
      }}
      InputProps={
        iconStatus
          ? {
              startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
            }
          : null
      }
    />
  )
}

export default CustomTextField

CustomTextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  helperText: PropTypes.node,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.node,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  shrink: PropTypes.bool,
  iconStatus: PropTypes.bool,
  icon: PropTypes.node,
  register: PropTypes.object,
}
