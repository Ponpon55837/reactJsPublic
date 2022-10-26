import Grid from '@mui/material/Grid'
import CustomSearch from '@components/CustomSearch'
import StatusSelect from '@components/StatusSelect'
import AddBtn from '@components/AddBtn'
import PropTypes from 'prop-types'
import { CustomBox4 } from './CustomStyle'

interface Props {
  placeholder?: string
  inputSub?: () => void
  inputValue?: string
  clear?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  statusExist?: boolean
  isEnabled?: string | boolean
  statusOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  btnName?: string
  addOnClick?: () => void
  statusTitle?: string
  trueStatus?: string
  falseStatus?: string
}

const UniversalSearch = ({
  placeholder,
  inputSub,
  inputValue,
  clear,
  onChange,
  statusExist = false,
  isEnabled = '',
  statusOnChange,
  btnName,
  addOnClick,
  statusTitle,
  trueStatus,
  falseStatus,
}: Props) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={12}>
        <AddBtn btnName={btnName} onClick={addOnClick} />
        <CustomSearch
          placeholder={placeholder}
          inputSub={inputSub}
          inputValue={inputValue}
          clear={clear}
          onChange={onChange}
        />
        {statusExist && (
          <CustomBox4>
            <StatusSelect
              title={statusTitle}
              trueStatus={trueStatus}
              falseStatus={falseStatus}
              isEnabled={isEnabled}
              onChange={statusOnChange}
            />
          </CustomBox4>
        )}
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