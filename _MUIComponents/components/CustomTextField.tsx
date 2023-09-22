import { useState } from 'react'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import { InputAdornment, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface Props {
  label?: string
  type?: 'text' | 'number' | 'password'
  variant?: 'outlined' | 'standard' | 'filled'
  helperText?: string
  placeholder?: string
  autoComplete?: null | boolean
  error?: null | boolean
  disabled?: boolean
  fullWidth?: boolean
  shrink?: boolean
  iconStatus?: boolean
  multiline?: boolean
  minRows?: number
  step?: string
  readOnly?: boolean
  autoFocus?: boolean
  fontSize?: 'small' | 'medium'
  icon?: React.ReactElement<any, any>
  register: any
  onKeyDown?: any
}

const CustomTextField = ({
  label,
  type = 'text',
  variant = 'outlined',
  helperText = '',
  placeholder = '',
  autoComplete = null,
  error = null,
  disabled = false,
  fullWidth = true,
  shrink = true,
  iconStatus = false,
  multiline = false,
  minRows = 1,
  step = '1',
  readOnly = false,
  autoFocus = false,
  fontSize = 'small',
  icon = <BorderColorOutlinedIcon fontSize="small" />,
  register,
  onKeyDown,
}: Props) => {
  const theme = useTheme()
  const [composition, setComposition] = useState(false)

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      type={type}
      size={fontSize}
      autoFocus={autoFocus}
      step={type === 'number' ? step : null}
      variant={readOnly ? 'filled' : variant}
      helperText={helperText}
      autoComplete={autoComplete}
      disabled={disabled}
      multiline={multiline}
      minRows={minRows}
      error={error}
      placeholder={placeholder}
      onKeyDown={(e) => onKeyDown && onKeyDown(e, composition)}
      onCompositionStart={(e) => {
        if (e.type === 'compositionstart') {
          setComposition(true)
        }
      }}
      onCompositionEnd={(e) => {
        if (e.type === 'compositionend') {
          setComposition(false)
        }
      }}
      onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
      {...register}
      InputLabelProps={{
        shrink: shrink,
      }}
      InputProps={{
        startAdornment: iconStatus ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : null,
        readOnly: readOnly,
      }}
    />
  )
}

export default CustomTextField
