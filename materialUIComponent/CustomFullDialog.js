import { forwardRef, useState } from 'react'
import { useUpdateEffect } from 'react-use'
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
  const [fullScreen, setFullScreen] = useState(extendState)

  useUpdateEffect(() => {
    if (!open) setExtendState(fullScreen)
  }, [open])

  return (
    <Dialog
      fullScreen={fullScreen}
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

          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setFullScreen(!fullScreen)}
            aria-label="close"
          >
            <OpenInFullIcon size="small" sx={{ display: fullScreen ? 'none' : 'default' }} />
            <CloseFullscreenIcon size="small" sx={{ display: !fullScreen ? 'none' : 'default' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Paper
        elevation={fullScreen ? 0 : 3}
        sx={{
          padding: fullScreen ? '2rem 4rem' : '1.5rem 6% 0.8rem 6%',
          margin: fullScreen ? '2rem auto auto auto' : 'auto',
          width: '100%',
          height: fullScreen ? 'auto' : 'default',
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
