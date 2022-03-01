import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import { makeStyles } from '@mui/styles'
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
  redLabel = false,
}) => {
  const useStyles = makeStyles(() => ({
    labelRed: {
      '& .MuiFormLabel-root': {
        color: redLabel && 'red', // or black
      },
    },
  }))

  const classes = useStyles()

  return (
    <TextField
      className={classes.labelRed}
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
  redLabel: PropTypes.bool,
}
