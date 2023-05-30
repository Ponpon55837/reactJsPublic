import { useLocales } from '@locales/index'
import { MenuItem, TextField } from '@mui/material'

interface Props {
  fullWidth?: boolean
  label: string
  defaultValue?: string | number
  nullValueOption?: boolean
  nullValueOptionValue?: string
  disabled?: boolean
  selectOptions: Array<{ id: string | number; name: string }>
  error: boolean
  helperText?: string
  register: any
}

const CustomTextFieldSelect = ({
  fullWidth = true,
  label,
  defaultValue = '0',
  nullValueOption = false,
  nullValueOptionValue = '-',
  disabled = false,
  selectOptions = [],
  error = false,
  helperText = '',
  register,
}: Props) => {
  const { t } = useLocales()

  return (
    <TextField
      select
      size="small"
      fullWidth={fullWidth}
      label={label}
      defaultValue={defaultValue}
      disabled={disabled}
      inputProps={register}
      error={error}
      helperText={helperText}
      sx={{ width: { sm: 160 } }}
    >
      {nullValueOption && <MenuItem value={''}>{nullValueOptionValue}</MenuItem>}
      {selectOptions.length > 0 &&
        selectOptions.map((sle) => (
          <MenuItem key={sle.id} value={sle.id}>
            {sle.name}
          </MenuItem>
        ))}
      {selectOptions.length === 0 && !nullValueOption && (
        <MenuItem value="">{`${t('MULTI_SELECT_OPTION.noData')}`}</MenuItem>
      )}
    </TextField>
  )
}

export default CustomTextFieldSelect
