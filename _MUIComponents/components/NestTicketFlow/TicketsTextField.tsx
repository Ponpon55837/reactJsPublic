import { useState } from 'react'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import { InputAdornment, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  WEB_BORDER_DARK,
  WEB_BORDER_LIGHT,
  WEB_COMMON_GREY,
  WEB_COMMON_WHITE_GREY,
  WEB_TEXTFIELD_DISABLED,
} from '@theme/colorManager'

const frontSx = {
  '& ::placeholder': { color: WEB_COMMON_GREY },
  input: {
    color: WEB_COMMON_WHITE_GREY,
    fontSize: '18px',
    '&::placeholder': { color: WEB_COMMON_GREY },
    '&::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 },
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderWidth: '2px',
    borderRadius: '10px',
    borderColor: WEB_BORDER_DARK,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: WEB_BORDER_DARK,
    },
    '&:hover fieldset': {
      borderColor: WEB_BORDER_LIGHT,
    },
    '&.Mui-focused fieldset': {
      borderColor: WEB_BORDER_LIGHT,
    },
    '&.Mui-disabled fieldset': {
      borderColor: WEB_BORDER_DARK,
    },
  },
  '& .Mui-disabled': {
    WebkitTextFillColor: `${WEB_COMMON_WHITE_GREY} !important`,
    fontSize: '18px',
    borderRadius: '10px',
    background: WEB_TEXTFIELD_DISABLED,
    color: WEB_COMMON_WHITE_GREY,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: WEB_BORDER_LIGHT,
  },
}

const backSx = {}

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
  colorStyle: 'back' | 'front'
}

const TicketsTextField = ({
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
  colorStyle = 'back',
}: Props) => {
  const theme = useTheme()
  const [composition, setComposition] = useState(false)

  const returnSx = () => {
    switch (colorStyle) {
      case 'front':
        return frontSx
      case 'back':
        return backSx
      default:
        return backSx
    }
  }
  return (
    <TextField
      sx={{ ...returnSx() }}
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

export default TicketsTextField
