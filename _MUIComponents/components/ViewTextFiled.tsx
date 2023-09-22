import { TextField } from '@mui/material'

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
  return (
    <TextField
      label={label}
      variant="filled"
      size="small"
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
