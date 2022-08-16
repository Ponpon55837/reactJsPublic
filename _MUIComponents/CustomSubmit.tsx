import { Button, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import PropTypes from 'prop-types'
interface Props {
  viewDialog: boolean
  closeFunc: () => void
  successLabel?: string
}

const CustomSubmit = ({ viewDialog, closeFunc, successLabel = '確定' }: Props) => {
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          startIcon={<CloseIcon fontSize="large" />}
          size="small"
          sx={{ height: '36px' }}
          onClick={closeFunc}
        >
          {viewDialog ? '關閉' : '取消'}
        </Button>
        <Button
          form="myform"
          variant="contained"
          type="submit"
          size="small"
          startIcon={<CheckIcon fontSize="large" />}
          sx={{
            backgroundColor: '#3878CC',
            display: viewDialog ? 'none' : 'flex',
            height: '36px',
          }}
        >
          {successLabel}
        </Button>
      </Stack>
    </>
  )
}

export default CustomSubmit

CustomSubmit.propTypes = {
  subLoading: PropTypes.bool,
  successLabel: PropTypes.bool,
}
