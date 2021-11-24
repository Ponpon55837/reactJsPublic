import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import PropTypes from 'prop-types'

const CustomRadioGroups = ({
  title = '標題',
  optionArr = [{ id: 0, name: 'test' }],
  value = '0',
  onChange = () => {},
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup row value={value} onChange={onChange}>
        {optionArr.map((option, idx) => (
          <FormControlLabel
            key={idx}
            value={String(option.id)}
            control={<Radio />}
            label={option.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default CustomRadioGroups

CustomRadioGroups.propTypes = {
  title: PropTypes.string,
  optionArr: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
