import { TextField, InputAdornment } from '@mui/material'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'

const CustomTextField = ({
  label,
  type = 'text',
  variant = 'standard',
  autoComplete = null,
  error = null,
  disabled = false,
  fullWidth = true,
  shrink = true,
  iconStatus = false,
  icon = <BorderColorOutlinedIcon size='small' />,
  register
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      type={type}
      variant={variant}
      autoComplete={autoComplete}
      disabled={disabled}
      error={error}
      {...register}
      InputLabelProps={{
        shrink: shrink,
      }}
      InputProps={iconStatus ? {
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      } : null}
    />
  )
}

export default CustomTextField
