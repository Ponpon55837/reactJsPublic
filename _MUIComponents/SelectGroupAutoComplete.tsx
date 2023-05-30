import { Controller } from 'react-hook-form'
import useLocales from '@locales/useLocales'
import { Autocomplete, TextField } from '@mui/material'
import { darken, lighten, styled } from '@mui/system'
import { StyledTextField } from '@styles/styles_normal/Web/commonStyle'
import {
  COMMON_PURE_WHITE,
  WEB_BORDER_DARK,
  WEB_SELECT_DISABLED_BG,
  WEB_SELECT_DISABLED_TEXT,
} from '@theme/colorManager'

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '5px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  borderRadius: '8px',
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.45)
      : darken(theme.palette.primary.main, 0.8),
}))

const GroupItems = styled('ul')({
  padding: 0,
})

interface InputStatus {
  name: string
  control: any
  label: string
  selectOptions: Array<{ id: string | number; name: string; group: string }>
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

export const SelectGroupAutoComplete = ({
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
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name || ''}
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
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
          />
        )
      }}
    />
  )
}

export const AdminSelectGroupAutoComplete = ({
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
    <SelectGroupAutoComplete
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

export const WebSelectGroupAutoComplete = ({
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
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, optValue) => option.id === optValue.id}
            readOnly={viewStatus}
            disabled={disabled}
            autoHighlight
            openOnFocus
            disableClearable={disableClearable}
            noOptionsText={`${t('MULTI_SELECT_OPTION.noData')}`}
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
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
          />
        )
      }}
    />
  )
}
