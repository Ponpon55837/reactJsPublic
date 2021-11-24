import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'

const CustomStatus = ({
  statusTitle = '狀態',
  statusValue,
  successValue = '啟用',
  failedValue = '停用',
  enableStatusFunc = () => {},
  disableStatusFunc = () => {},
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{statusTitle}</FormLabel>
      <RadioGroup
        row
        aria-label="狀態"
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

CustomStatus.propTypes = {
  statusTitle: PropTypes.string,
  statusValue: PropTypes.bool,
  successValue: PropTypes.string,
  failedValue: PropTypes.string,
  enableStatusFunc: PropTypes.func,
  disableStatusFunc: PropTypes.func,
}
