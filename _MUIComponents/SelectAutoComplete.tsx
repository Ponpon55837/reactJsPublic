import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { Controller } from 'react-hook-form'
import useLocales from '@locales/useLocales'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { StyledTextField } from '@styles/styles_normal/Web/commonStyle'
import {
  COMMON_PURE_WHITE,
  WEB_BORDER_DARK,
  WEB_SELECT_DISABLED_BG,
  WEB_SELECT_DISABLED_TEXT,
} from '@theme/colorManager'
import Regex from '@utils/regex'

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
  multiple?: boolean
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
  multiple,
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
                placeholder={viewStatus ? '' : `${t('MULTI_SELECT_OPTION.select')}${label}`}
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
  multiple = false,
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

export const SelectFreeSoloAutoComplete = ({
  name,
  control,
  label,
  required = false,
  disabled = false,
  viewStatus = false,
  disableClearable = false,
  minWidth = 176,
  maxWidth = 200,
  inputSx,
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
            freeSolo
            multiple
            value={value}
            onChange={(event: any, newValue) => {
              const tempLastValue = newValue.at(-1)
              if (newValue.length !== 0 && tempLastValue.match(Regex.EMAIL)) {
                onChange(newValue)
              } else if (newValue.length === 0) {
                onChange(newValue)
              }
            }}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                // eslint-disable-next-line react/jsx-key
                <Chip variant="filled" label={option} {...getTagProps({ index })} />
              ))
            }
            options={[]}
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
                placeholder={viewStatus ? '' : `${t('MULTI_SELECT_OPTION.input')}${label}`}
                variant={viewStatus ? 'filled' : 'outlined'}
                error={error ? true : false}
                helperText={error && `${t('MULTI_SELECT_OPTION.input')}${label}`}
              />
            )}
          />
        )
      }}
    />
  )
}

export const SelectMultiAutoComplete = ({
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
  inputSx,
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
            multiple
            value={value}
            onChange={(event: any, newValue) => {
              onChange(newValue ? newValue : null)
              triggerOnChange && triggerOnChange()
            }}
            disableCloseOnSelect
            options={selectOptions}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => {
              return option.name
            }}
            isOptionEqualToValue={(option, optValue) => option.id === optValue.id}
            readOnly={viewStatus}
            disabled={disabled}
            autoHighlight
            openOnFocus
            disableClearable={disableClearable}
            noOptionsText={`${t('MULTI_SELECT_OPTION.noData')}`}
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
          />
        )
      }}
    />
  )
}
