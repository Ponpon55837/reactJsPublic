import { forwardRef } from 'react'
import { QrReader } from 'react-qr-reader'
import Image from '@components/image'
import { Slide } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/material/styles'
import { WEB_CLOSE_ICON, WEB_COMMON_WHITE_GREY, WEB_QR_CODE_BG } from '@theme/colorManager'

const StyledDialog = styled(DialogTitle)(() => ({
  color: WEB_CLOSE_ICON,
  textAlign: 'right',
  padding: '0.75rem 0.5rem 0.5rem 0.75rem',
  backdropFilter: 'blur(5px)',
  background: WEB_QR_CODE_BG,
}))

const StyledDialogContent = styled(DialogContent)(() => ({
  background: WEB_QR_CODE_BG,
  color: WEB_COMMON_WHITE_GREY,
}))

const Transition = forwardRef(function Transition(props: any, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

interface Props {
  openQR: boolean
  closeQR: () => void
  scanQR: (qrcode: any) => void
}

const CustomQRCode = ({ openQR = false, closeQR = () => {}, scanQR = (qrcode) => {} }: Props) => {
  return openQR ? (
    <Dialog
      fullWidth={true}
      open={openQR}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledDialog>
        <Image
          onClick={closeQR}
          style={{ cursor: 'pointer', height: '20px', width: '20px' }}
          src="/images/close.png"
          alt="closeIcon"
        />
      </StyledDialog>
      <StyledDialogContent dividers>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result: any) => {
            if (!!result) {
              scanQR(result?.text)
            }
          }}
        />
      </StyledDialogContent>
    </Dialog>
  ) : null
}

export default CustomQRCode
