import { Transition } from '@components/CustomDialog'
import CustomSubmit from '@components/CustomSubmit'
import useMiddleware from '@hooks/use-middleware'
import { useLocales } from '@locales/index'
import CloseIcon from '@mui/icons-material/Close'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { COMPONENTS_COMMON_GREY_BLUE, COMPONENTS_COMMON_PURE_WHITE } from '@theme/colorManager'

interface Props {
  viewDialog?: boolean
  deleteDialog?: boolean
  toolBarTitle: string
  open: boolean
  initialExtendClose?: boolean
  closeFunc: () => void
  deleteFunc?: () => void
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  fullDialog?: boolean
  contentComponent: React.ReactElement<any, any>
  formId?: string
}

const CustomFullDialog = ({
  viewDialog = false,
  deleteDialog = false,
  toolBarTitle,
  open,
  closeFunc,
  deleteFunc,
  contentComponent,
  maxWidth = 'sm',
  initialExtendClose = true,
  fullDialog = false,
  formId = 'submitForm',
}: Props) => {
  const { extendState, setExtendState, dialogSizeState, defaultTheme, setDialogSizeState } =
    useMiddleware()
  const { t } = useLocales()

  return (
    <Dialog
      fullScreen={extendState || fullDialog}
      fullWidth
      scroll="paper"
      maxWidth={maxWidth}
      open={open}
      onClose={viewDialog ? closeFunc : () => {}}
      TransitionComponent={Transition}
    >
      <DialogTitle sx={{ backgroundColor: defaultTheme, color: COMPONENTS_COMMON_PURE_WHITE }}>
        {toolBarTitle}
        <Box
          noValidate
          component="form"
          sx={{
            display: extendState || initialExtendClose ? 'none' : 'inline-flex',
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
              onChange={(e) => {
                setDialogSizeState(e.target.value)
              }}
              label="maxWidth"
              sx={{ color: COMPONENTS_COMMON_PURE_WHITE }}
            >
              <MenuItem value="sm">{`${t('DIALOG.sm')}`}</MenuItem>
              <MenuItem value="md">{`${t('DIALOG.md')}`}</MenuItem>
              <MenuItem value="lg">{`${t('DIALOG.lg')}`}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setExtendState(!extendState)}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: '3.5rem',
            top: '.5rem',
            display: initialExtendClose ? 'none' : 'inline-flex',
          }}
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
          sx={{ position: 'absolute', right: '1rem', top: '.8rem' }}
        >
          <CloseIcon
            sx={{
              fontSize: '2rem',
              cursor: 'pointer',
              '&:hover': { backgroundColor: COMPONENTS_COMMON_GREY_BLUE, borderRadius: '3rem' },
            }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers={!extendState}
        // elevation={extendState ? 0 : 3}
        sx={{
          padding: extendState ? 'auto' : '0.8rem 3% 0.8rem 3%',
          margin: 'auto',
          width: '100%',
          height: extendState ? 'auto' : 'default',
        }}
      >
        {contentComponent}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <CustomSubmit
          viewDialog={viewDialog}
          closeFunc={closeFunc}
          deleteDialog={deleteDialog}
          deleteFunc={deleteFunc}
          formId={formId}
        />
      </DialogActions>
    </Dialog>
  )
}

export default CustomFullDialog
