import React, { forwardRef, useState } from 'react'
import {
  Slide,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

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
        <DialogContentText id="alert-dialog-slide-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {labelFailed &&
          <Button color="secondary" onClick={cancelFunc}>{labelFailed}</Button>}
        <Button color="primary" onClick={successFunc}>{labelSuccess}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
