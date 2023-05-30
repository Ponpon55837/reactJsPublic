import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { Controller } from 'react-hook-form'
import useLocales from '@locales/useLocales'
import { Autocomplete, TextField } from '@mui/material'
import { StyledTextField } from '@styles/styles_normal/Web/commonStyle'
import {
  COMMON_PURE_WHITE,
  WEB_BORDER_DARK,
  WEB_SELECT_DISABLED_BG,
  WEB_SELECT_DISABLED_TEXT,
} from '@theme/colorManager'

interface InputStatus {
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

export const SelectAutoComplete = ({
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
            value={
              value
                ? selectOptions.find((option) => {
                    return value === option.id
                  }) ?? null
                : null
            }
            onChange={(event: any, newValue) => {
              onChange(newValue ? newValue.id : null)
              triggerOnChange && triggerOnChange()
            }}
            options={selectOptions}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, optValue) => option.id === optValue.id}
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
                placeholder={`${t('MULTI_SELECT_OPTION.select')}${label}`}
                variant={viewStatus ? 'filled' : 'outlined'}
                error={error ? true : false}
                helperText={error && `${t('MULTI_SELECT_OPTION.select')}${label}`}
              />
            )}
            // auto highlight change style
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option.name, inputValue, { insideWords: true })
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

export const AdminSelectAutoComplete = ({
  name,
  control,
  label,
  selectOptions = [],
  required = false,
  disabled = false,
  triggerOnChange,
  viewStatus = false,
  disableClearable = false,
  minWidth = 176,
  maxWidth = 200,
}: InputStatus) => {
  return (
    <SelectAutoComplete
      minWidth={minWidth}
      maxWidth={maxWidth}
      name={name}
      control={control}
      label={label}
      selectOptions={selectOptions}
      required={required}
      disabled={disabled}
      triggerOnChange={triggerOnChange}
      viewStatus={viewStatus}
      disableClearable={disableClearable}
    />
  )
}

export const WebSelectAutoComplete = ({
  name,
  control,
  label,
  selectOptions = [],
  required = false,
  disabled = false,
  triggerOnChange,
  viewStatus = false,
  disableClearable = false,
  selectSx,
}: InputStatus) => {
  const { t } = useLocales()

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
            value={
              value !== null && value !== undefined
                ? selectOptions.find((option) => option.id === value) ?? null
                : selectOptions.find((option) => option.id === null) ?? null
            }
            onChange={(event: any, newValue) => {
              onChange(newValue ? newValue.id : null)
              triggerOnChange && triggerOnChange()
            }}
            options={selectOptions}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, optValue) => option.id === optValue.id}
            readOnly={viewStatus}
            disabled={disabled}
            noOptionsText={`${t('MULTI_SELECT_OPTION.noData')}`}
            autoHighlight
            openOnFocus
            disableClearable={disableClearable}
            sx={{
              my: '6px',
              '.MuiSelect-icon': { color: `${COMMON_PURE_WHITE} !important` },
              '& .Mui-disabled': {
                WebkitTextFillColor: `${COMMON_PURE_WHITE} !important`,
                background: `${WEB_SELECT_DISABLED_BG} !important`,
                color: `${WEB_SELECT_DISABLED_TEXT} !important`,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: `${WEB_BORDER_DARK} !important`,
                },
              },
              ...selectSx,
            }}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                inputRef={ref}
                placeholder={`${t('MULTI_SELECT_OPTION.select')}${label}`}
                variant="outlined"
                error={error ? true : false}
              />
            )}
            // auto highlight change style
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option.name, inputValue, { insideWords: true })
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
