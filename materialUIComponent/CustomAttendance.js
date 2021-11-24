import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'

const CustomAttendance = ({
  statusTitle = '補登卡別',
  statusValue,
  enableStatusFunc = () => {},
  disableStatusFunc = () => {},
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{statusTitle}</FormLabel>
      <RadioGroup
        row
        aria-label={statusTitle}
        name="row-radio-buttons-group"
        value={statusValue ? '上班打卡' : '下班打卡'}
        onChange={(e, value) => {
          if (value === '上班打卡') {
            enableStatusFunc()
          } else {
            disableStatusFunc()
          }
        }}
      >
        <FormControlLabel value="上班打卡" control={<Radio />} label="上班打卡" />
        <FormControlLabel value="下班打卡" control={<Radio />} label="下班打卡" />
      </RadioGroup>
    </FormControl>
  )
}

export default CustomAttendance

CustomAttendance.propTypes = {
  statusTitle: PropTypes.string,
  statusValue: PropTypes.bool,
  enableStatusFunc: PropTypes.func,
  disableStatusFunc: PropTypes.func,
}
