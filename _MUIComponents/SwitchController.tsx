import { Controller } from 'react-hook-form'
import { Divider, FormControlLabel, FormHelperText, Switch } from '@mui/material'

interface InputStatus {
  name: string
  label: string
  control: any
  triggerOnChange?: () => void
  required?: boolean
  disabled?: boolean
  defaultValue?: boolean
  helperText?: string
}

const SwitchController = ({
  name,
  label,
  control,
  required,
  disabled = false,
  defaultValue = false,
  helperText,
}: InputStatus) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
      }}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const { value, onChange, ref } = field
        return (
          <>
            <FormControlLabel
              sx={{ my: 1 }}
              control={<Switch checked={value} disabled={disabled} {...field} />}
              label={label}
            />
            <Divider sx={{ opacity: 0 }} />
            <FormHelperText sx={{ width: error ? '100%' : 'default' }} error={error ? true : false}>
              {error && helperText}
            </FormHelperText>
          </>
        )
      }}
    />
  )
}

export default SwitchController
