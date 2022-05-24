import React from 'react'
import { Dialog, AppBar, Toolbar, Slide, Paper } from '@mui/material'
import PropTypes from 'prop-types'
import styles from '@styles/media.module.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const CustomFullDialog = ({
  toolBarTitle,
  open,
  closeFunc,
  contentComponent,
  fullScreen = false,
  maxWidth = 'sm',
}) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      open={open}
      onClose={closeFunc}
      maxWidth={maxWidth}
      TransitionComponent={Transition}
    >
      <AppBar position="fixed" className={styles.noPrint}>
        <Toolbar sx={{ backgroundColor: '#1E333F' }}>{toolBarTitle}</Toolbar>
      </AppBar>
      <Paper
        elevation={fullScreen ? 0 : 3}
        sx={{
          padding: fullScreen ? '1.5rem 3% 0.8rem 3%' : '1.5rem 6% 0.8rem 6%',
          margin: fullScreen ? '0' : 'auto',
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
  fullScreen: PropTypes.bool,
  maxWidth: PropTypes.string,
}
