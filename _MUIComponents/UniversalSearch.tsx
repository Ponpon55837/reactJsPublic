import AddBtn from '@components/AddBtn'
import CustomSearch from '@components/CustomSearch'
import StatusSelect from '@components/StatusSelect'
import Grid from '@mui/material/Grid'
import { CustomBox4 } from '@styles/styles_normal/boxStyle'

interface Props {
  actionSet: string[]
  placeholder?: string
  inputSub?: () => void
  inputValue?: string
  clear?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  statusExist?: boolean
  isEnabled?: boolean | string
  statusOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  btnName?: string
  addOnClick?: () => void
  statusTitle: string
  trueStatus?: string
  falseStatus?: string
  searchMinWidth?: string | number | object
  btnChecked?: boolean
  searchDisplay?: boolean
}

const UniversalSearch = ({
  actionSet,
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
  searchMinWidth,
  btnChecked = true,
  searchDisplay = true,
}: Props) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={12}>
        {btnChecked && <AddBtn actionSet={actionSet} btnName={btnName} onClick={addOnClick} />}
        {searchDisplay && (
          <CustomSearch
            minWidth={searchMinWidth}
            placeholder={placeholder}
            inputSub={inputSub}
            inputValue={inputValue}
            clear={clear}
            onChange={onChange}
          />
        )}

        {statusExist && (
          <CustomBox4>
            <StatusSelect title={statusTitle} isEnabled={isEnabled} onChange={statusOnChange} />
          </CustomBox4>
        )}
      </Grid>
    </Grid>
  )
}

export default UniversalSearch
