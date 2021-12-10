import { Snackbar, Alert } from '@mui/material'
import PropTypes from 'prop-types'

const CustomSnackbar = ({
  open = false,
  message = 'content',
  closeFunc = () => {},
  hiddenTime = 3000,
  severity = 'error',
  vertical = 'top',
  horizontal = 'right',
  alertWidth = '100%',
}) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={hiddenTime}
      onClose={() => closeFunc()}
    >
      <Alert onClose={() => closeFunc()} severity={severity} sx={{ width: alertWidth }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar

CustomSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  closeFunc: PropTypes.func,
  hiddenTime: PropTypes.number,
  severity: PropTypes.string,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
  alertWidth: PropTypes.string,
}
