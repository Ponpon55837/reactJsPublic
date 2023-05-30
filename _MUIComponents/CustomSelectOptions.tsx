import { useLocales } from '@locales/index'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

interface InputStatus {
  value: string
  label: string
  selectOptions: any[]
  onChange?: any
  checked?: boolean
  defaultValue?: string
  variant?: any
  nullValueOption?: boolean
  nullValueOptionValue?: string
  disabled?: boolean
  mr?: any
  minWidth?: any
  maxWidth?: any
  ml?: any
}

const CustomSelectOptions = ({
  checked = false,
  defaultValue = '0',
  value = '0',
  label = '',
  variant = 'outlined',
  nullValueOption = false,
  nullValueOptionValue = '-',
  disabled = false,
  selectOptions = [],
  onChange,
  minWidth = 140,
  mr = 'default',
  ml = 'default',
}: InputStatus) => {
  const { t } = useLocales()

  return (
    <FormControl
      variant={variant}
      size="small"
      error={checked}
      disabled={disabled}
      sx={{
        minWidth: minWidth,
        mr: mr,
        ml: ml,
      }}
    >
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select defaultValue={defaultValue} value={value} label={label} onChange={onChange}>
        {nullValueOption && <MenuItem value={''}>{nullValueOptionValue}</MenuItem>}
        {selectOptions.length > 0 &&
          selectOptions.map((sle: { id: number; name: string }) => (
            <MenuItem key={sle.id} value={sle.id}>
              {sle.name}
            </MenuItem>
          ))}
        {selectOptions.length === 0 && !nullValueOption && (
          <MenuItem value="">{`${t('MULTI_SELECT_OPTION.noData')}`}</MenuItem>
        )}
      </Select>
      {checked && (
        <FormHelperText>
          {`${t('MULTI_SELECT_OPTION.select')}`}
          {label}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default CustomSelectOptions
