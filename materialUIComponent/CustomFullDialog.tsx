import { forwardRef } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import PropTypes from 'prop-types'
import useMiddleware from '@hooks/use-middleware'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />
})

interface Props {
  toolBarTitle: string
  open: boolean
  closeFunc: () => void
  contentComponent: React.ReactElement<any, any>
}

const CustomFullDialog = ({ toolBarTitle, open, closeFunc, contentComponent }: Props) => {
  const { extendState, setExtendState, dialogSizeState, setDialogSizeState } = useMiddleware()

  return (
    <Dialog
      fullScreen={extendState}
      fullWidth
      scroll="paper"
      maxWidth={dialogSizeState}
      open={open}
      onClose={closeFunc}
      TransitionComponent={Transition}
    >
      <DialogTitle sx={{ backgroundColor: '#1b2c37', color: '#FFFFFF' }}>
        {toolBarTitle}
        <Box
          noValidate
          component="form"
          sx={{
            display: extendState ? 'none' : 'inline-flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
            mr: 1,
          }}
        >
          <FormControl
            sx={{
              m: '0 !important',
              p: '0 !important',
              minWidth: 20,
              position: 'absolute',
              right: '5.5rem',
              top: '1rem',
            }}
            size="small"
          >
            <Select
              variant="standard"
              labelId="demo-select-small"
              id="demo-select-small"
              disableUnderline
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
          sx={{ position: 'absolute', right: '3.5rem', top: '.5rem' }}
        >
          <FullscreenIcon
            fontSize="small"
            sx={{ display: extendState ? 'none' : 'inline-flex', fontSize: '1.7rem' }}
          />
          <FullscreenExitIcon
            fontSize="small"
            sx={{ display: !extendState ? 'none' : 'inline-flex', fontSize: '1.7rem' }}
          />
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => closeFunc()}
          aria-label="close"
          sx={{ position: 'absolute', right: '1rem', top: '.3rem' }}
        >
          <CloseIcon
            sx={{
              fontSize: '2rem',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#32404F', borderRadius: '3rem' },
            }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers={!extendState}
        // elevation={extendState ? 0 : 3}
        sx={{
          padding: extendState ? '0 2rem 1rem 2rem' : '0.8rem 3% 0.8rem 3%',
          margin: 'auto',
          width: '100%',
          height: extendState ? 'auto' : 'default',
        }}
      >
        {contentComponent}
      </DialogContent>
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
