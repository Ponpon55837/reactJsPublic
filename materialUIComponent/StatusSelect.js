import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

const StatusSelect = ({ isEnabled, onChange }) => {
  return (
    <FormControl
      // variant="standard"
      size='small'
      sx={{
        minWidth: 120,
      }}
    >
        <InputLabel id="demo-simple-select-helper-label">狀態</InputLabel>
      <Select
        value={isEnabled}
        label="狀態"
        // displayEmpty
        onChange={onChange}
      >
        <MenuItem value=''>-</MenuItem>
        <MenuItem value={true}>啟用</MenuItem>
        <MenuItem value={false}>停用</MenuItem>
      </Select>
    </FormControl>
  )
}

export default StatusSelect
