import { useState } from 'react'
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import PropTypes from 'prop-types'

const CustomCheckBoxGroups = ({
  title = '',
  optionArr = [],
  checked = [],
  onChange = () => {},
}) => {
  const [allCheck, setAll] = useState(false)

  return (
    <FormControl>
      <FormLabel component="legend">{title}</FormLabel>
      <FormGroup row>
        <FormControlLabel
          label="全部"
          sx={{ display: 'inline-flex !important' }}
          control={<Checkbox checked={allCheck} onChange={() => setAll(!allCheck)} />}
        />
        {optionArr.map((list, index) => (
          <FormControlLabel
            key={index}
            label={list.name}
            control={
              <Checkbox checked={checked.includes(list.id) || allCheck} onChange={onChange} />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default CustomCheckBoxGroups

CustomCheckBoxGroups.propTypes = {
  title: PropTypes.string,
  optionArr: PropTypes.array,
  checked: PropTypes.array,
  onChange: PropTypes.func,
}
