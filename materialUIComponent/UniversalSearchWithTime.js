import { Grid } from '@mui/material'
import CustomSearch from '@components/CustomSearch'
import SelectYearAndMonth from '@components/SelectYearAndMonth'
import AddBtn from '@components/AddBtn'
import PropTypes from 'prop-types'

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
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={12} md={8}>
        <Grid item sm={12}>
          <CustomSearch
            width={searchWidth}
            placeholder={placeholder}
            inputSub={inputSub}
            inputValue={inputValue}
            clear={clear}
            onChange={onChange}
          />
        </Grid>
        <Grid item sm={12}>
          <SelectYearAndMonth
            yearValue={yearValue}
            monthValue={monthValue}
            monthOpen={monthOpen}
            yearOnChange={yearOnChange}
            monthOnChange={monthOnChange}
          />
        </Grid>
      </Grid>
      {btnChecked && (
        <Grid item xs={12} md={4}>
          <AddBtn btnName={btnName} onClick={() => addOnClick()} />
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
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
