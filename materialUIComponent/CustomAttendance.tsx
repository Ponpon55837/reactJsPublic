import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import PropTypes from 'prop-types'

interface Props {
  statusTitle?: string
  statusValue?: boolean
  enableStatusFunc?: () => void
  disableStatusFunc?: () => void
}

const CustomAttendance = ({
  statusTitle = '補登卡別',
  statusValue = true,
  enableStatusFunc = () => {},
  disableStatusFunc = () => {},
}: Props) => {
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
