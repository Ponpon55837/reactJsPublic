import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import {
  ADMIN_COMMON_ALPHA_BLACK,
  COMPONENTS_COMMON_PURE_WHITE,
  WEB_COMMON_WHITE_GREY,
} from '@theme/colorManager'

const StyledBackdrop = styled(Backdrop)(({}) => ({
  '@media print': {
    display: 'none !important',
  },
}))
interface Props {
  backDropOpen: boolean
  className?: any
  loadingColor?: any
  loadingColorOpacity?: number
  backgroundColorOpacity?: number
  circleSize?: string | number
  defaultUseColor?: any
}

export const BackDrop = ({
  backDropOpen,
  className,
  loadingColor,
  loadingColorOpacity = 0.4,
  backgroundColorOpacity = 0,
  circleSize,
  defaultUseColor,
}: Props) => {
  return (
    <StyledBackdrop
      sx={{
        color: COMPONENTS_COMMON_PURE_WHITE,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: alpha(loadingColor, backgroundColorOpacity),
      }}
      open={backDropOpen}
      onClick={() => {}}
      className={className}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          color: alpha(loadingColor, loadingColorOpacity),
        }}
      >
        <CircularProgress size={circleSize} color={defaultUseColor} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></Box>
      </Box>
    </StyledBackdrop>
  )
}

export const WebBackDrop = ({
  backDropOpen = false,
  className,
  loadingColor = WEB_COMMON_WHITE_GREY,
  loadingColorOpacity = 0.7,
  backgroundColorOpacity = 0,
  circleSize = '11rem',
  defaultUseColor = 'inherit',
}: Props) => {
  return (
    <BackDrop
      backDropOpen={backDropOpen}
      className={className}
      loadingColor={loadingColor}
      loadingColorOpacity={loadingColorOpacity}
      backgroundColorOpacity={backgroundColorOpacity}
      circleSize={circleSize}
      defaultUseColor={defaultUseColor}
    />
  )
}

export const AdminBackDrop = ({
  backDropOpen = false,
  className,
  loadingColor = ADMIN_COMMON_ALPHA_BLACK,
  loadingColorOpacity = 0.4,
  backgroundColorOpacity = 0,
  circleSize = '11rem',
  defaultUseColor = 'inherit',
}: Props) => {
  return (
    <BackDrop
      backDropOpen={backDropOpen}
      className={className}
      loadingColor={loadingColor}
      loadingColorOpacity={loadingColorOpacity}
      backgroundColorOpacity={backgroundColorOpacity}
      circleSize={circleSize}
      defaultUseColor={defaultUseColor}
    />
  )
}
