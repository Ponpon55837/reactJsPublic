import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import PropTypes from 'prop-types'

interface Props {
  switchArr: { checked?: boolean; label: string }[]
}

const CustomSwitches = ({ switchArr = [] }: Props) => {
  return (
    <FormGroup style={{ display: 'block' }}>
      {switchArr.map((swi: { checked?: boolean; label: string }, idx: number) => (
        <FormControlLabel
          key={idx}
          control={<Switch defaultChecked={swi.checked} />}
          label={swi.label}
        />
      ))}
    </FormGroup>
  )
}

export default CustomSwitches

CustomSwitches.propTypes = {
  switchArr: PropTypes.array,
}
