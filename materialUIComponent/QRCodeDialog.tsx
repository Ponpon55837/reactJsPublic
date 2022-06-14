import { forwardRef } from 'react'
import { Dialog, AppBar, Toolbar, Slide, Paper } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import IconButton from '@mui/material/IconButton'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import styles from '@styles/media.module.scss'

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
  fullScreen?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const CustomFullDialog = ({
  toolBarTitle,
  open,
  closeFunc,
  contentComponent,
  fullScreen = false,
  maxWidth = 'sm',
}: Props) => {
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
        <Toolbar sx={{ backgroundColor: '#1b2c37' }}>
          {toolBarTitle}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={() => window.print()}
            sx={{ position: 'absolute', right: '3rem', top: '.3rem' }}
          >
            <LocalPrintshopIcon
              sx={{
                fontSize: '2rem',
                cursor: 'pointer',
                mr: 1,
                '&:hover': { backgroundColor: '#32404F', borderRadius: '3rem' },
              }}
            />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={closeFunc}
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
        </Toolbar>
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
