import { useState } from 'react'
import { StyledDiv, StyledTooltip } from '@components/ClickAwayBtn'
import { useLocales } from '@locales/index'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button, ClickAwayListener, IconButton, Typography } from '@mui/material'

interface ClickAwayBtnProps {
  successClick: () => void
  executeDescription: string
  successColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  executeColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  startIcon?: React.ReactElement
  variant?: 'text' | 'outlined' | 'contained'
}

const ClickAwayIconBtn = ({
  executeDescription = '',
  successColor = 'success',
  executeColor = 'success',
  successClick = () => {},
  startIcon = <CheckCircleIcon fontSize="small" />,
  variant = 'outlined',
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
                p: '0 .2rem !important',
              }}
              onClick={() => successClick()}
            >
              {`${t('COMMON.yes')}`}
            </Button>
          </StyledDiv>
        }
      >
        <IconButton edge="end" color="error" onClick={() => setOpen(true)}>
          {startIcon}
        </IconButton>
      </StyledTooltip>
    </ClickAwayListener>
  )
}

export default ClickAwayIconBtn
