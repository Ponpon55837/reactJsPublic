import { FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox } from '@mui/material'
import PropTypes from 'prop-types'

const CustomCheckbox = ({
  title = 'title',
  required = false,
  error = false,
  check = false,
  label = 'checkbox',
  register,
}) => {
  return (
    <FormControl required={required} error={error}>
      <FormLabel sx={{ fontWeight: 400, fontSize: '.8rem' }}>{title}</FormLabel>
      <FormGroup style={{ display: 'block' }}>
        <FormControlLabel
          control={<Checkbox defaultChecked={check} {...register} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  )
}

export default CustomCheckbox

CustomCheckbox.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  check: PropTypes.bool,
  label: PropTypes.string,
  register: PropTypes.object,
}
