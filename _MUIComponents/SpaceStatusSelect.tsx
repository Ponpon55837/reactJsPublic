import { useLocales } from '@locales/index'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

interface InputStatus {
  isEnabled: boolean | string
  onChange: any
  title?: string
  minWidth?: any
}

const StatusSelect = ({ isEnabled, onChange, title = '', minWidth = 120 }: InputStatus) => {
  const { t } = useLocales()

  return (
    <FormControl
      // variant="standard"
      size="small"
      sx={{
        minWidth: minWidth,
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
        <MenuItem value={true as any}>{`${t('SPACE_ENABLE_STATUS.success')}`}</MenuItem>
        <MenuItem value={false as any}>{`${t('SPACE_ENABLE_STATUS.disabled')}`}</MenuItem>
      </Select>
    </FormControl>
  )
}

export default StatusSelect
