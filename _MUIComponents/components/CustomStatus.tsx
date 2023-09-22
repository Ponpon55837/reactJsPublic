import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

interface Props {
  statusTitle?: string
  statusValue?: boolean
  successValue?: string
  failedValue?: string
  disabled?: boolean
  enableStatusFunc?: () => void
  disableStatusFunc?: () => void
}

const CustomStatus = ({
  statusTitle = '',
  statusValue,
  successValue = '',
  failedValue = '',
  disabled = false,
  enableStatusFunc = () => {},
  disableStatusFunc = () => {},
}: Props) => {
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <FormLabel component="legend">{statusTitle}</FormLabel>
      <RadioGroup
        row
        aria-label=""
        name="row-radio-buttons-group"
        value={statusValue ? successValue : failedValue}
        onChange={(e, value) => {
          if (value === successValue) {
            enableStatusFunc()
          } else {
            disableStatusFunc()
          }
        }}
      >
        <FormControlLabel value={successValue} control={<Radio />} label={successValue} />
        <FormControlLabel value={failedValue} control={<Radio />} label={failedValue} />
      </RadioGroup>
    </FormControl>
  )
}

export default CustomStatus
