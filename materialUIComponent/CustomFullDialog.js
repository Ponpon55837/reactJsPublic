import { forwardRef } from 'react'
import { Dialog, AppBar, Toolbar, Slide, Paper } from '@mui/material'
import PropTypes from 'prop-types'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const CustomFullDialog = ({ toolBarTitle, open, closeFunc, contentComponent }) => {
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

export default CustomFullDialog

CustomFullDialog.propTypes = {
  toolBarTitle: PropTypes.string,
  open: PropTypes.bool,
  closeFunc: PropTypes.func,
  contentComponent: PropTypes.node,
}
