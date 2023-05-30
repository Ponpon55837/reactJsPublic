import { forwardRef, useState } from 'react'
import Image from '@components/image'
import useMiddleware from '@hooks/use-middleware'
import { useLocales } from '@locales/index'
import CloseIcon from '@mui/icons-material/Close'
import HelpIcon from '@mui/icons-material/Help'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { AppBar, Box, Button, Dialog, Drawer, Paper, Slide, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { TransitionProps } from '@mui/material/transitions'
import { COMPONENTS_COMMON_GREY_BLUE } from '@theme/colorManager'

const StyledAppBar = styled(AppBar)(({}) => ({
  '@media print': {
    display: 'none !important',
  },
}))

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
  const { defaultTheme } = useMiddleware()
  const { t } = useLocales()
  const [drawerView, setDrawerView] = useState(false)

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
        <StyledAppBar position="fixed">
          <Toolbar sx={{ backgroundColor: defaultTheme }}>
            {toolBarTitle}
            <IconButton
              edge="end"
              color="inherit"
              aria-owns={drawerView ? 'mouse-over-popover' : 'null'}
              aria-haspopup="true"
              // onMouseEnter={handlePopoverOpen}
              // onMouseLeave={handlePopoverClose}
              onClick={() => setDrawerView(true)}
              sx={{ position: 'absolute', right: '6rem', top: '.3rem' }}
            >
              <HelpIcon
                sx={{
                  fontSize: '2rem',
                  cursor: 'pointer',
                  mr: 1,
                  '&:hover': { backgroundColor: COMPONENTS_COMMON_GREY_BLUE, borderRadius: '3rem' },
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
                  '&:hover': { backgroundColor: COMPONENTS_COMMON_GREY_BLUE, borderRadius: '3rem' },
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
                  '&:hover': { backgroundColor: COMPONENTS_COMMON_GREY_BLUE, borderRadius: '3rem' },
                }}
              />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
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
      <Drawer
        sx={{ zIndex: 1500 }}
        BackdropProps={{ style: { backgroundColor: 'none', opacity: 0 } }}
        anchor="right"
        open={drawerView}
        onClose={() => setDrawerView(false)}
      >
        {printExample1 ? (
          <Image
            src="/images/print-sample/print-sample-A4-105X74-8.png"
            sx={{
              width: 'auto',
              height: '600px',
              objectFit: '-moz-initial',
            }}
            alt={`${t('DIALOG_QR_CODE.title')}`}
            title={`${t('DIALOG_QR_CODE.title')}`}
          />
        ) : (
          <Image
            src="/images/print-sample/print-sample-A4-70X37-24.png"
            sx={{
              width: 'auto',
              height: '600px',
              objectFit: '-moz-initial',
            }}
            title={`${t('DIALOG_QR_CODE.title')}`}
            alt={`${t('DIALOG_QR_CODE.title')}`}
          />
        )}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloseIcon fontSize="large" />}
          size="small"
          sx={{ height: '36px', width: '6rem', mx: 'auto', mt: 1 }}
          onClick={() => setDrawerView(false)}
        >
          {`${t('DIALOG.closeBtn')}`}
        </Button>
      </Drawer>
    </>
  )
}

export default CustomFullDialog
