import { Autocomplete, TextField } from '@mui/material'
import PropTypes from 'prop-types'

const CustomAutoComplete = ({
  options = [],
  width = '15rem',
  label = '',
  variant = 'outlined',
  register,
  error,
}) => {
  return (
    <Autocomplete
      options={options}
      autoSelect
      autoHighlight
      sx={{ width: width }}
      renderInput={params => (
        <TextField {...register} {...params} error={error} label={label} variant={variant} />
      )}
    />
  )
}

export default CustomAutoComplete

CustomAutoComplete.propTypes = {
  options: PropTypes.array,
  width: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  register: PropTypes.object,
  error: PropTypes.bool,
}
