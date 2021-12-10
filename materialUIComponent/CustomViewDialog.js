import React from 'react'
import { Dialog, AppBar, Toolbar, Slide, Paper, DialogTitle } from '@mui/material'
import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const CustomViewDialog = ({ toolBarTitle, dialogTitle, open, closeFunc, contentComponent }) => {
  return (
    <Dialog
      // fullScreen
      fullWidth
      open={open}
      onClose={closeFunc}
      TransitionComponent={Transition}
    >
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: '#1E333F' }}>{toolBarTitle}</Toolbar>
      </AppBar>
      <DialogTitle sx={{ backgroundColor: '#1E333F', color: '#DDDDDD' }}>{dialogTitle}</DialogTitle>
      <Paper
        elevation={3}
        sx={{
          padding: '1.5rem 6% 0.8rem 6%',
          margin: 'auto',
          width: '100%',
        }}
      >
        {contentComponent}
      </Paper>
    </Dialog>
  )
}

export default CustomViewDialog

CustomViewDialog.propTypes = {
  toolBarTitle: PropTypes.string,
  dialogTitle: PropTypes.string,
  open: PropTypes.bool,
  closeFunc: PropTypes.func,
  contentComponent: PropTypes.node,
}
