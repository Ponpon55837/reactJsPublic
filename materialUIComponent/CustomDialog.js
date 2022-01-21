import { forwardRef } from 'react'
import {
  Slide,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import PropTypes from 'prop-types'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const CustomDialog = ({
  open,
  dialogTitle = '通知',
  maxWidth = 'sm',
  fullWidth = true,
  fullScreen = false,
  dialogContent,
  labelSuccess,
  successFunc = () => {},
  cancelFunc = () => {},
  labelFailed,
}) => {
  return (
    <Dialog
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ borderBottom: '1px solid #DDDDDD' }}>{dialogTitle}</DialogTitle>
      <DialogContent sx={{ marginTop: '1rem' }}>
        <DialogContentText id="alert-dialog-slide-description">{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {labelFailed && (
          <Button variant="outlined" color="secondary" onClick={cancelFunc}>
            {labelFailed}
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={successFunc}>
          {labelSuccess}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog

CustomDialog.propTypes = {
  open: PropTypes.bool,
  dialogTitle: PropTypes.string,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool,
  dialogContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  labelSuccess: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  successFunc: PropTypes.func,
  cancelFunc: PropTypes.func,
  labelFailed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
