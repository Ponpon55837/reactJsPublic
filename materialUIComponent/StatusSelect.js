import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import PropTypes from 'prop-types'

const StatusSelect = ({
  title = '狀態',
  isEnabled = true,
  successLabel = '啟用',
  failedLabel = '停用',
  onChange,
}) => {
  return (
    <FormControl
      size="small"
      sx={{
        minWidth: 120,
      }}
    >
      <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
      <Select value={isEnabled} label={title} onChange={onChange}>
        <MenuItem value="">-</MenuItem>
        <MenuItem value={true}>{successLabel}</MenuItem>
        <MenuItem value={false}>{failedLabel}</MenuItem>
      </Select>
    </FormControl>
  )
}

export default StatusSelect

StatusSelect.propTypes = {
  title: PropTypes.string,
  isEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  successLabel: PropTypes.string,
  failedLabel: PropTypes.string,
  onChange: PropTypes.func,
}
