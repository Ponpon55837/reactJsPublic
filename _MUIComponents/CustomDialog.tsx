import { forwardRef } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { COMPONENTS_COMMON_GREY } from '@theme/colorManager'

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
  dialogTitle = '',
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
      <DialogTitle sx={{ borderBottom: `1px solid ${COMPONENTS_COMMON_GREY}` }}>
        {dialogTitle}
      </DialogTitle>
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
export { Transition }
