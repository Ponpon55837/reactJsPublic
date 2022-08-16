import { forwardRef } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />
})

interface Props {
  open: boolean
  successFunc: () => void
  cancelFunc?: () => void
  dialogTitle?: string
  dialogContent?: string
  dialogActions?: React.ReactElement<any, any>
  dialogContentComponent?: React.ReactElement<any, any>
  TransitionComponent?: React.ElementType
  fullWidth?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullScreen?: boolean
  labelSuccess?: string
  labelFailed?: string
}

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
}: Props) => {
  return (
    <Dialog
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      sx={{ zIndex: '2000' }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid #DDDDDD' }}>{dialogTitle}</DialogTitle>
      <DialogContent sx={{ marginTop: '1rem' }}>
        <DialogContentText id="alert-dialog-slide-description">{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {labelFailed && (
          <Button variant="outlined" color="error" onClick={cancelFunc}>
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
  dialogTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
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
