import { useLocales } from '@locales/index'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material'

interface SelectProps {
  checked?: boolean
  defaultValue: string
  value: string
  label: string
  variant?: 'outlined' | 'standard' | 'filled' | undefined
  disabled?: boolean
  selectOptions: any[]
  onChange?: any
  minWidth?: number
  mr?: number | string
  ml?: number | string
}

const CustomMultiSelectOptions = ({
  checked = false,
  defaultValue = '0',
  value = '0',
  label = '',
  variant = 'outlined',
  disabled = false,
  selectOptions = [],
  onChange,
  minWidth = 140,
  mr = 1,
  ml = 'default',
}: SelectProps) => {
  const { t } = useLocales()
  const renderSelectGroup = (
    inputArr: { name: string; locationData: Array<{ id: string | number; name: string }> },
    idx: number,
  ) => {
    const items = inputArr.locationData.map((p: { id: string | number; name: string }) => {
      return (
        <MenuItem key={p.id} value={p.id}>
          {p.name}
        </MenuItem>
      )
    })
    return [
      <ListSubheader sx={{ fontSize: '1rem', fontWeight: 500, fontStyle: 'italic' }} key={idx}>
        {inputArr.name}
      </ListSubheader>,
      items,
    ]
  }

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
      <InputLabel htmlFor="grouped-native-select">{label}</InputLabel>
      <Select
        autoWidth
        id="grouped-native-select"
        defaultValue={defaultValue}
        value={value}
        label={label}
        onChange={onChange}
      >
        {selectOptions?.map((p, idx) => renderSelectGroup(p, idx))}
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

export default CustomMultiSelectOptions
