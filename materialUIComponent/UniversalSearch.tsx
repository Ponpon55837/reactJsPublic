import Grid from '@mui/material/Grid'
import CustomSearch from '@components/CustomSearch'
import StatusSelect from '@components/StatusSelect'
import AddBtn from '@components/AddBtn'
import PropTypes from 'prop-types'

interface Props {
  placeholder?: string
  inputSub?: () => void
  inputValue?: string
  clear?: () => void
  onChange?: () => void
  statusExist?: boolean
  isEnabled?: string | boolean
  statusOnChange?: (value: string) => void
  btnName?: string
  addOnClick?: () => void
}

const UniversalSearch = ({
  placeholder,
  inputSub,
  inputValue,
  clear,
  onChange,
  statusExist = false,
  isEnabled = '',
  statusOnChange = () => {},
  btnName,
  addOnClick,
}: Props) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={12} md={8}>
        <CustomSearch
          placeholder={placeholder}
          inputSub={inputSub}
          inputValue={inputValue}
          clear={clear}
          onChange={onChange}
        />
        {statusExist && <StatusSelect isEnabled={isEnabled} onChange={statusOnChange} />}
      </Grid>
      <Grid item xs={12} md={4}>
        <AddBtn btnName={btnName} onClick={addOnClick} />
      </Grid>
    </Grid>
  )
}

export default UniversalSearch

UniversalSearch.propTypes = {
  placeholder: PropTypes.string,
  inputSub: PropTypes.func,
  inputValue: PropTypes.string,
  clear: PropTypes.func,
  onChange: PropTypes.func,
  statusExist: PropTypes.bool,
  isEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  statusOnChange: PropTypes.func,
  btnName: PropTypes.string,
  addOnClick: PropTypes.func,
}
