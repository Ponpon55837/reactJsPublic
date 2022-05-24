import { forwardRef, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import Slide from '@mui/material/Slide'
import Paper from '@mui/material/Paper'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'
import useMiddleware from '@hooks/use-middleware'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const CustomViewDialog = ({ toolBarTitle, dialogTitle, open, closeFunc, contentComponent }) => {
  const { extendState, setExtendState, dialogSizeState, setDialogSizeState } = useMiddleware()

  return (
    <Dialog
      fullScreen={extendState}
      fullWidth
      maxWidth={dialogSizeState}
      open={open}
      onClose={closeFunc}
      TransitionComponent={Transition}
    >
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: '#1E333F' }}>
          <Typography sx={{ ml: 2, flex: 1 }} variant="title2" component="div">
            {toolBarTitle}
            {extendState && `  ${dialogTitle}`}
          </Typography>

          <Box
            noValidate
            component="form"
            sx={{
              display: extendState ? 'none' : 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
              mr: 1,
            }}
          >
            <FormControl sx={{ m: '0 !important', p: '0 !important', minWidth: 20 }} size="small">
              <Select
                variant="standard"
                labelId="demo-select-small"
                id="demo-select-small"
                value={dialogSizeState}
                onChange={e => {
                  setDialogSizeState(e.target.value)
                }}
                label="maxWidth"
                sx={{ color: '#FFFFFF' }}
              >
                <MenuItem value="sm">小</MenuItem>
                <MenuItem value="md">中</MenuItem>
                <MenuItem value="lg">大</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setExtendState(!extendState)}
            aria-label="close"
          >
            <OpenInFullIcon size="small" sx={{ display: extendState ? 'none' : 'default' }} />
            <CloseFullscreenIcon size="small" sx={{ display: !extendState ? 'none' : 'default' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogTitle sx={{ backgroundColor: '#1E333F', color: '#DDDDDD' }}>{dialogTitle}</DialogTitle>
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

export default CustomViewDialog

CustomViewDialog.propTypes = {
  toolBarTitle: PropTypes.string,
  dialogTitle: PropTypes.string,
  open: PropTypes.bool,
  closeFunc: PropTypes.func,
  contentComponent: PropTypes.node,
}
