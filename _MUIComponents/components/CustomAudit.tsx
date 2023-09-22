import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Button } from '@mui/material'

interface Props {
  statusTitle?: string
  statusValue?: boolean
  successValue?: string
  failedValue?: string
  disabled?: boolean
  enableStatusFunc?: () => void
  disableStatusFunc?: () => void
}

const CustomAudit = ({
  statusValue,
  successValue = '',
  failedValue = '',
  enableStatusFunc = () => {},
  disableStatusFunc = () => {},
}: Props) => {
  return (
    <>
      <Button
        variant={statusValue ? 'contained' : 'outlined'}
        color="success"
        sx={{ mr: 2 }}
        startIcon={<CheckCircleOutlineIcon fontSize="small" />}
        onClick={enableStatusFunc}
      >
        {successValue}
      </Button>
      <Button
        variant={!statusValue ? 'contained' : 'outlined'}
        color="error"
        startIcon={<HighlightOffIcon fontSize="small" />}
        onClick={disableStatusFunc}
      >
        {failedValue}
      </Button>
    </>
  )
}

export default CustomAudit
