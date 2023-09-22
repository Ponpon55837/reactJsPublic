import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { Controller } from 'react-hook-form'
import { useEffectOnce } from 'react-use'
import useLocales from '@locales/useLocales'
import { Autocomplete, TextField } from '@mui/material'

interface InputStatus {
  setValue: any
  propertyPath: string
  defaultValue: string | null
  name: string
  control: any
  label: string
  selectOptions: Array<{ id: string | number; name: string }>
  triggerOnChange?: () => void
  required?: boolean
  disabled?: boolean
  viewStatus?: boolean
  disableClearable?: boolean
  inputSx?: object
  selectSx?: object
  minWidth?: any
  maxWidth?: any
}

const FreeSelectAutoComplete = ({
  setValue,
  propertyPath,
  defaultValue,
  name,
  control,
  label,
  selectOptions,
  required,
  disabled,
  triggerOnChange,
  viewStatus,
  disableClearable,
  inputSx,
  selectSx,
  minWidth,
  maxWidth,
}: InputStatus) => {
  const { t } = useLocales()

  useEffectOnce(() => {
    if (defaultValue !== '' && defaultValue !== null) {
      setValue(`${propertyPath}.locationZoneId`, defaultValue)
    }
  })

  const returnValue = (value: any) => {
    return (
      selectOptions?.find((option) => {
        return value === option.id
      }) ?? defaultValue
    )
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, onChange, ref } = field
        return (
          <Autocomplete
            size="small"
            freeSolo
            handleHomeEndKeys
            value={returnValue(value)}
            onChange={(event: any, newValue) => {
              onChange(newValue ? newValue : null)
              triggerOnChange && triggerOnChange()
            }}
            onInputChange={(_, data) => {
              if (data) {
                field.onChange(data)
                setValue(`${propertyPath}.locationName`, data)
              }
            }}
            options={selectOptions}
            // getOptionLabel with mui autocomplete freeSolo
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option
              }
              return option.name
            }}
            isOptionEqualToValue={(option, optValue) => {
              if (typeof option === 'string') return false
              if (typeof optValue === 'string') return false
              return option.id === optValue.id
            }}
            readOnly={viewStatus}
            disabled={disabled}
            noOptionsText={`${t('MULTI_SELECT_OPTION.noData')}`}
            autoHighlight
            openOnFocus
            disableClearable={disableClearable}
            sx={{
              minWidth: minWidth,
              maxWidth: maxWidth,
              ...inputSx,
              ...selectSx,
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                label={required ? `* ${label}` : label}
                placeholder={viewStatus ? '' : `${t('MULTI_SELECT_OPTION.select')}${label}`}
                variant={viewStatus ? 'filled' : 'outlined'}
                error={error ? true : false}
                helperText={error && `${t('MULTI_SELECT_OPTION.select')}${label}`}
              />
            )}
            // auto highlight change style
            renderOption={(props, option, { inputValue }) => {
              if (typeof option === 'string') return
              const matches = match(option.name, inputValue, { requireMatchAll: true })
              const parts = parse(option.name, matches)

              return (
                <li {...props}>
                  <div>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </li>
              )
            }}
          />
        )
      }}
    />
  )
}
export default FreeSelectAutoComplete
