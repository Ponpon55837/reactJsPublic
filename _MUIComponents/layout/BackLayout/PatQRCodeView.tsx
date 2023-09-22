import { useQRCode } from 'next-qrcode'
import useAdmin from 'src/service/AdminService'
import { useImmer } from 'use-immer'
import { AdminBackDrop as BackDrop } from '@components/BackDrop'
import { useSnackbar } from '@components/snackbar'
import { ViewProps } from '@interface/pageProps'
import { useLocales } from '@locales/index'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Alert, Button, InputAdornment, TextField } from '@mui/material'
import { CustomBox2 } from '@styles/styles_normal/boxStyle'
import { ADMIN_AR_QR_CODE_VIEW_DARK, ADMIN_AR_QR_CODE_VIEW_LIGHT } from '@theme/colorManager'
import { HasValueNotEmpty } from '@utils/utilsFunction'

const PatQRCodeView = ({ result, closeFunc }: ViewProps) => {
  const { t } = useLocales()
  const [state, produce] = useImmer({
    patValue: '',
    subLoading: false,
    ...result,
  })

  const { patValue, subLoading } = state
  const { getScanPatQrCode } = useAdmin()
  const { Canvas } = useQRCode()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const getScanValue = async () => {
    produce((draft) => {
      draft.subLoading = true
    })
    const { status, result } = await getScanPatQrCode()
    if (status === 200) {
      produce((draft) => {
        draft.patValue = result
      })
    }
    produce((draft) => {
      draft.subLoading = false
    })
  }

  const setMessage = (value: string) => {
    enqueueSnackbar(value, {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      autoHideDuration: 1000,
      action: (key) => (
        <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
          {`${t('DIALOG.closeBtn')}`}
        </Button>
      ),
    })
  }

  return (
    <>
      <Alert severity="warning">{`${t('ACCOUNT_MENU.patGenerateNotice')}`}</Alert>

      <CustomBox2 sx={{ textAlign: 'center', m: 0, p: 0, mt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          color="warning"
          startIcon={<RefreshIcon fontSize="small" />}
          onClick={() => getScanValue()}
        >
          {`${t('COMMON.generate')}`}
        </Button>
      </CustomBox2>

      {HasValueNotEmpty(patValue) && (
        <>
          <br />
          <Alert severity="warning">{`${t('ACCOUNT_MENU.patCopyNotice')}`}</Alert>
          <CustomBox2 sx={{ textAlign: 'center', m: 0, p: 0, mt: 3 }}>
            <TextField
              variant="filled"
              fullWidth
              size="small"
              label="Token"
              id="Token"
              value={patValue}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {window.isSecureContext && (
                      <ContentCopyIcon
                        sx={{ cursor: 'pointer', ml: 1 }}
                        onClick={() => {
                          navigator.clipboard.writeText(patValue !== null ? patValue : '')
                          setMessage('Copy Success')
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
          </CustomBox2>

          <CustomBox2 sx={{ textAlign: 'center', m: 0, p: 0, mt: 3 }}>
            <Canvas
              text={patValue}
              options={{
                level: 'H',
                margin: 0,
                scale: 4,
                width: 10,
                color: {
                  dark: ADMIN_AR_QR_CODE_VIEW_DARK,
                  light: ADMIN_AR_QR_CODE_VIEW_LIGHT,
                },
              }}
            />
          </CustomBox2>
        </>
      )}
      <BackDrop backDropOpen={subLoading} />
    </>
  )
}

export default PatQRCodeView
