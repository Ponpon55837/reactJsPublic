import { useState } from 'react'
import { StyledDiv, StyledTooltip } from '@components/ClickAwayBtn'
import { useLocales } from '@locales/index'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import { Button, ClickAwayListener, Typography } from '@mui/material'

interface ClickAwayAuditBtnProps {
  successClick: () => void
  failedClick: () => void
  disabledFailBtn?: boolean
  disabled?: boolean
  executeLabel?: string
  successColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  executeColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  failedColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  startIcon?: React.ReactElement
  variant?: 'text' | 'outlined' | 'contained'
}

const ClickAwayAuditBtn = ({
  executeLabel = '',
  successColor = 'success',
  failedColor = 'error',
  executeColor = 'success',
  successClick = () => {},
  failedClick = () => {},
  disabledFailBtn = false,
  disabled = false,
  startIcon = <CheckCircleIcon fontSize="small" />,
  variant = 'outlined',
}: ClickAwayAuditBtnProps) => {
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
              {`${t('CLICK_AWAY_BUTTON.executeDescription')}`}
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<CancelIcon fontSize="small" />}
              sx={{
                p: '0 .3rem !important',
                mr: 2,
              }}
              onClick={() => setOpen(false)}
            >
              {`${t('CLICK_AWAY_BUTTON.cancelLabel')}`}
            </Button>
            {!disabledFailBtn && (
              <Button
                size="small"
                variant="contained"
                color={failedColor}
                startIcon={<DoDisturbOnIcon fontSize="small" />}
                sx={{
                  p: '0 .3rem !important',
                  mr: 2,
                }}
                onClick={() => failedClick()}
              >
                {`${t('CLICK_AWAY_BUTTON.failedLabel')}`}
              </Button>
            )}
            <Button
              size="small"
              variant="contained"
              color={successColor}
              startIcon={<CheckCircleIcon fontSize="small" />}
              sx={{
                p: '0 .3rem !important',
              }}
              onClick={() => successClick()}
            >
              {`${t('CLICK_AWAY_BUTTON.successLabel')}`}
            </Button>
          </StyledDiv>
        }
      >
        <Button
          size="small"
          variant={variant}
          color={executeColor}
          startIcon={startIcon}
          disabled={disabled}
          sx={{
            p: '0 .4rem !important',
          }}
          onClick={() => setOpen(true)}
        >
          {executeLabel}
        </Button>
      </StyledTooltip>
    </ClickAwayListener>
  )
}

export default ClickAwayAuditBtn
