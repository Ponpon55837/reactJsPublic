import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'

const CustomStatus = ({
  statusTitle = '狀態',
  statusValue,
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
        value={statusValue ? '啟用' : '停用'}
        onChange={(e, value) => {
          if (value === '啟用') {
            enableStatusFunc()
          } else {
            disableStatusFunc()
          }
        }}
      >
        <FormControlLabel value="啟用" control={<Radio />} label="啟用" />
        <FormControlLabel value="停用" control={<Radio />} label="停用" />
      </RadioGroup>
    </FormControl>
  )
}

export default CustomStatus

CustomStatus.propTypes = {
  statusTitle: PropTypes.string,
  statusValue: PropTypes.bool,
  enableStatusFunc: PropTypes.func,
  disableStatusFunc: PropTypes.func,
}
