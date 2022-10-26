import { forwardRef, useState } from 'react'
import { Dialog, AppBar, Toolbar, Slide, Paper, Popover, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import IconButton from '@mui/material/IconButton'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import HelpIcon from '@mui/icons-material/Help'
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
  printExample1?: boolean
}

const CustomFullDialog = ({
  toolBarTitle,
  open,
  closeFunc,
  contentComponent,
  fullScreen = false,
  maxWidth = 'sm',
  printExample1 = true,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const hoverOpen = Boolean(anchorEl)
  // help hover enter
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  // help hover out
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
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
              aria-owns={hoverOpen ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              sx={{ position: 'absolute', right: '6rem', top: '.3rem' }}
            >
              <HelpIcon
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
            // padding: fullScreen ? '1.5rem 3% 0.8rem 3%' : '1.5rem 6% 0.8rem 6%',
            margin: fullScreen ? '0' : 'auto',
            width: '100%',
          }}
        >
          {contentComponent}
        </Paper>
      </Dialog>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
          display: anchorEl ? 'block' : 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {printExample1 ? (
          <img src="printExample.png" height="500" title="列印範例" alt="列印範例" />
        ) : (
          <img src="printExample2.png" height="500" title="列印範例" alt="列印範例" />
        )}
      </Popover>
    </>
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
