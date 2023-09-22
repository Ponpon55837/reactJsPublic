import AddBtn from '@components/AddBtn'
import CustomSearch from '@components/CustomSearch'
import SelectYearAndMonth from '@components/SelectYearAndMonth'
import Grid from '@mui/material/Grid'
import { CustomBox4 } from '@styles/styles_normal/boxStyle'

interface Props {
  actionSet: string[]
  searchMinWidth?: string | number | object
  placeholder?: string
  inputSub?: () => void
  inputValue?: string
  clear?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  yearValue?: string | number
  monthValue?: string | number
  monthOpen?: boolean
  yearOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  monthOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  btnChecked?: boolean
  btnName?: string
  addOnClick?: () => void
}

const UniversalSearchWithTime = ({
  actionSet,
  searchMinWidth,
  placeholder,
  inputSub,
  inputValue,
  clear,
  onChange,
  yearValue,
  monthValue,
  monthOpen,
  yearOnChange,
  monthOnChange,
  btnChecked = true,
  btnName,
  addOnClick,
}: Props) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={12}>
        {btnChecked && <AddBtn actionSet={actionSet} btnName={btnName} onClick={addOnClick} />}
        <CustomSearch
          minWidth={searchMinWidth}
          placeholder={placeholder}
          inputSub={inputSub}
          inputValue={inputValue}
          clear={clear}
          onChange={onChange}
        />
        <CustomBox4>
          <SelectYearAndMonth
            yearValue={yearValue}
            monthValue={monthValue}
            monthOpen={monthOpen}
            yearOnChange={yearOnChange}
            monthOnChange={monthOnChange}
          />
        </CustomBox4>
      </Grid>
    </Grid>
  )
}

export default UniversalSearchWithTime
