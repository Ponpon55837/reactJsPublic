import { useLocales } from '@locales/index'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { StyledFormControl } from '@styles/styles_normal/Web/commonStyle'
import {
  COMMON_PURE_WHITE,
  WEB_BORDER_DARK,
  WEB_SELECT_DISABLED_BG,
  WEB_SELECT_DISABLED_TEXT,
} from '@theme/colorManager'

interface InputStatus {
  value: string
  label?: string
  selectOptions: any[]
  onChange?: any
  checked?: boolean
  defaultValue?: string
  variant?: any
  nullValueOption?: boolean
  nullValueOptionValue?: string
  disabled?: boolean
  minWidth?: any
  sx?: object
  selectSx?: object
}

const SelectOptions = ({
  checked = false,
  defaultValue,
  value = '0',
  label = '',
  variant = 'outlined',
  nullValueOption = false,
  selectOptions = [],
  onChange,
  disabled = false,
  sx,
  selectSx,
}: InputStatus) => {
  const { t } = useLocales()
  return (
    <StyledFormControl
      variant={variant}
      size="small"
      error={checked}
      style={{ marginRight: 1 }}
      sx={sx}
      disabled={disabled}
    >
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        defaultValue={String(defaultValue)}
        style={{ color: COMMON_PURE_WHITE, margin: '6px 0' }}
        sx={{
          '.MuiSelect-icon': { color: 'white' },
          '& .Mui-disabled': {
            WebkitTextFillColor: COMMON_PURE_WHITE,
            background: WEB_SELECT_DISABLED_BG,
            color: WEB_SELECT_DISABLED_TEXT,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: WEB_BORDER_DARK,
            },
          },
          ...selectSx,
        }}
        value={String(value)}
        onChange={onChange}
        MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
      >
        {nullValueOption && <MenuItem value={''}>-</MenuItem>}
        {selectOptions.map((sle) => (
          <MenuItem key={sle.id} value={sle.id}>
            {sle.name}
          </MenuItem>
        ))}
        {selectOptions.length === 0 && !nullValueOption && (
          <MenuItem value="">{`${t('MULTI_SELECT_OPTION.noData')}`}</MenuItem>
        )}
      </Select>
    </StyledFormControl>
  )
}

export default SelectOptions
