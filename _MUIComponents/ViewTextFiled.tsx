import { TextField, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const ViewTextFiled = ({
  label,
  defaultValue,
  minRows = 1,
  multiline = false,
}: {
  label: string
  defaultValue?: any
  minRows?: number
  multiline?: boolean
}) => {
  const theme = useTheme()
  const windowBig = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <TextField
      label={label}
      variant="filled"
      size={windowBig ? 'medium' : 'small'}
      minRows={minRows}
      multiline={multiline}
      defaultValue={defaultValue}
      style={{ width: '100%' }}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        readOnly: true,
      }}
    />
  )
}

export default ViewTextFiled
