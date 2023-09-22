import moment from 'moment-timezone'
import { AdminSelectAutoComplete as SelectAutoComplete } from '@components/SelectAutoComplete'
import { useLocales } from '@locales/index'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { CustomBox3 } from '@styles/styles_normal/boxStyle'

const defaultValue = {
  getYear: moment().format('YYYY'),
  getMonth: moment().format('MM'),
}

const yearOption: any = []
for (let i = 0; i <= 4; i += 1) {
  const tempValue = parseInt(defaultValue.getYear, 10) - i
  const tempLabel = `${parseInt(defaultValue.getYear, 10) - i}`

  yearOption.push({
    id: tempValue,
    name: tempLabel,
  })
}

const monthOption: any = []
for (let i = 1; i <= 12; i += 1) {
  monthOption.push({ id: i, name: `${(i + '').padStart(2, '0')}` })
}

interface InputValues {
  control: any
  year: string
  month: string
  required?: boolean
  viewStatus?: boolean
  disabled?: boolean
}

const YearMonthAutoComplete = ({
  control,
  year,
  month,
  required,
  viewStatus,
  disabled,
}: InputValues) => {
  const { t } = useLocales()
  return (
    <>
      <CustomBox3>
        <SelectAutoComplete
          required={required}
          disabled={disabled}
          viewStatus={viewStatus}
          label={`${t('TIME.year')}`}
          name={year}
          control={control}
          selectOptions={yearOption}
        />
      </CustomBox3>

      <CustomBox3>
        <SelectAutoComplete
          required={required}
          disabled={disabled}
          viewStatus={viewStatus}
          label={`${t('TIME.month')}`}
          name={month}
          control={control}
          selectOptions={monthOption}
        />
      </CustomBox3>
    </>
  )
}

export default YearMonthAutoComplete
