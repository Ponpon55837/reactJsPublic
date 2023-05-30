import { Controller } from 'react-hook-form'
import { FormControlLabel, Switch } from '@mui/material'

interface InputStatus {
  name: string
  label: string
  control: any
  triggerOnChange?: () => void
  required?: boolean
  disabled?: boolean
  defaultValue?: boolean
}

const SwitchController = ({
  name,
  label,
  control,
  required,
  disabled = false,
  defaultValue = false,
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
          <FormControlLabel
            sx={{ my: 1 }}
            control={<Switch disabled={disabled} {...field} />}
            label={label}
          />
        )
      }}
    />
  )
}

export default SwitchController
