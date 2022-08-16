import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import PropTypes from 'prop-types'

interface Props {
  title?: string
  required?: boolean
  error?: boolean
  check?: boolean
  label?: string
  register?: any
}

const CustomCheckbox = ({
  title = 'title',
  required = false,
  error = false,
  check = false,
  label = 'checkbox',
  register = {},
}: Props) => {
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
