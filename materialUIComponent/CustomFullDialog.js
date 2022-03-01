import { forwardRef, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import Slide from '@mui/material/Slide'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import useMiddleware from '@hooks/use-middleware'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const CustomFullDialog = ({ toolBarTitle, open, closeFunc, contentComponent }) => {
  const { extendState, setExtendState } = useMiddleware()

  return (
    <Dialog
      fullScreen={extendState}
      fullWidth
      open={open}
      onClose={closeFunc}
      TransitionComponent={Transition}
    >
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: '#1E333F' }}>
          <Typography sx={{ ml: 2, flex: 1 }} variant="title2" component="div">
            {toolBarTitle}
          </Typography>

          {/* <IconButton
            edge="end"
            color="inherit"
            onClick={() => setExtendState(!extendState)}
            aria-label="close"
          >
            <OpenInFullIcon size="small" sx={{ display: extendState ? 'none' : 'default' }} />
            <CloseFullscreenIcon size="small" sx={{ display: !extendState ? 'none' : 'default' }} />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Paper
        elevation={extendState ? 0 : 3}
        sx={{
          padding: extendState ? '2rem 4rem' : '1.5rem 6% 0.8rem 6%',
          margin: extendState ? '2rem auto auto auto' : 'auto',
          width: '100%',
          height: extendState ? 'auto' : 'default',
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
