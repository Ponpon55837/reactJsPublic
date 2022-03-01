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

const CustomStatus = ({
  statusTitle = '狀態',
  statusValue = true,
  enableStatusFunc = () => {},
  disableStatusFunc = () => {},
}: Props) => {
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
