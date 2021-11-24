import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'

const CustomSignStatus = ({
  statusTitle = '簽核',
  statusValue,
  enableStatusFunc = () => {},
  disableStatusFunc = () => {},
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{statusTitle}</FormLabel>
      <RadioGroup
        row
        aria-label="簽核"
        name="row-radio-buttons-group"
        value={statusValue ? '簽核通過' : '簽核未通過'}
        onChange={(e, value) => {
          if (value === '簽核通過') {
            enableStatusFunc()
          } else {
            disableStatusFunc()
          }
        }}
      >
        <FormControlLabel value="簽核通過" control={<Radio />} label="簽核通過" />
        <FormControlLabel value="簽核未通過" control={<Radio />} label="簽核未通過" />
      </RadioGroup>
    </FormControl>
  )
}

export default CustomSignStatus

CustomSignStatus.propTypes = {
  statusTitle: PropTypes.string,
  statusValue: PropTypes.bool,
  enableStatusFunc: PropTypes.func,
  disableStatusFunc: PropTypes.func,
}
