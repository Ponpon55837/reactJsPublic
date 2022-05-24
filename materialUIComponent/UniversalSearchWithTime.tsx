import Grid from '@mui/material/Grid'
import { CustomBox3 } from '@components/CustomStyle'
import CustomSearch from '@components/CustomSearch'
import SelectYearAndMonth from '@components/SelectYearAndMonth'
import AddBtn from '@components/AddBtn'
import PropTypes from 'prop-types'

interface Props {
  searchWidth?: string | undefined
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
  searchWidth,
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
      <Grid item xs={12} md={8}>
        <CustomSearch
          width={searchWidth}
          placeholder={placeholder}
          inputSub={inputSub}
          inputValue={inputValue}
          clear={clear}
          onChange={onChange}
        />
        <CustomBox3>
          <SelectYearAndMonth
            yearValue={yearValue}
            monthValue={monthValue}
            monthOpen={monthOpen}
            yearOnChange={yearOnChange}
            monthOnChange={monthOnChange}
          />
        </CustomBox3>
      </Grid>
      {btnChecked && (
        <Grid item xs={12} md={4}>
          <AddBtn btnName={btnName} onClick={addOnClick} />
        </Grid>
      )}
    </Grid>
  )
}

export default UniversalSearchWithTime

UniversalSearchWithTime.propTypes = {
  searchWidth: PropTypes.string,
  placeholder: PropTypes.string,
  inputSub: PropTypes.func,
  inputValue: PropTypes.string,
  clear: PropTypes.func,
  onChange: PropTypes.func,
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  monthValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  monthOpen: PropTypes.bool,
  yearOnChange: PropTypes.func,
  monthOnChange: PropTypes.func,
  btnChecked: PropTypes.bool,
  btnName: PropTypes.string,
  addOnClick: PropTypes.func,
}
