import { useState } from 'react'
import { useLocales } from '@locales/index'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button, ClickAwayListener, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { COMPONENTS_COMMON_DEEP_GREY } from '@theme/colorManager'

const StyledTooltip = styled(Tooltip)(() => ({
  width: 'auto',
  textAlign: 'center',
  alignItems: 'center',
  '&::before': {
    border: `1px solid ${COMPONENTS_COMMON_DEEP_GREY}`,
    backgroundColor: COMPONENTS_COMMON_DEEP_GREY,
    boxSizing: 'border-box',
  },
}))

const StyledDiv = styled('div')(() => ({
  textAlign: 'center',
  padding: '.5rem .2rem',
}))

interface ClickAwayBtnProps {
  successClick: () => void
  executeDescription: string
  successLabel?: string
  executeLabel?: string
  disabled?: boolean
  successColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  executeColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  startIcon?: React.ReactElement
  variant?: 'text' | 'outlined' | 'contained'
  sx?: any
}

const ImportClickAwayBtn = ({
  executeDescription = '',
  successLabel = '',
  executeLabel = '',
  successColor = 'success',
  executeColor = 'success',
  disabled = false,
  successClick = () => {},
  startIcon = <CheckCircleIcon fontSize="small" />,
  variant = 'outlined',
  sx,
}: ClickAwayBtnProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useLocales()

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <StyledTooltip
        arrow
        placement="top"
        open={open}
        title={
          <StyledDiv>
            <Typography sx={{ display: 'block', mb: 1, fontWeight: 400 }}>
              {executeDescription}
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<CancelIcon fontSize="small" />}
              sx={{
                p: '0 !important',
                mr: 2,
              }}
              onClick={() => setOpen(false)}
            >
              {`${t('COMMON.no')}`}
            </Button>
            <Button
              size="small"
              variant="contained"
              color={successColor}
              startIcon={<CheckCircleIcon fontSize="small" />}
              sx={{
                p: '0 !important',
                mr: 2,
              }}
              onClick={() => successClick()}
            >
              {successLabel}
            </Button>
          </StyledDiv>
        }
      >
        <Button
          variant={variant}
          color={executeColor}
          disabled={disabled}
          // startIcon={startIcon ? startIcon : null}
          sx={{
            mt: { xs: 1, sm: 1.5 },
            height: { sm: '40px' },
            ...sx,
          }}
          onClick={() => setOpen(true)}
        >
          {executeLabel}
        </Button>
      </StyledTooltip>
    </ClickAwayListener>
  )
}

export default ImportClickAwayBtn
export { StyledTooltip, StyledDiv }
