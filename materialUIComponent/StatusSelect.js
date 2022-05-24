import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import PropTypes from 'prop-types'

const StatusSelect = ({
  isEnabled,
  onChange,
  title = '狀態',
  trueStatus = '啟用',
  falseStatus = '停用',
}) => {
  return (
    <FormControl
      // variant="standard"
      size="small"
      sx={{
        minWidth: 120,
        mr: 1,
      }}
    >
      <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
      <Select
        value={isEnabled}
        label={title}
        // displayEmpty
        onChange={onChange}
      >
        <MenuItem value="">-</MenuItem>
        <MenuItem value={true}>{trueStatus}</MenuItem>
        <MenuItem value={false}>{falseStatus}</MenuItem>
      </Select>
    </FormControl>
  )
}

export default StatusSelect

StatusSelect.propTypes = {
  isEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  onChange: PropTypes.func,
  title: PropTypes.string,
  trueStatus: PropTypes.string,
  falseStatus: PropTypes.string,
}
