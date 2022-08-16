import { useState } from 'react'
import { Typography, Button, Tooltip, ClickAwayListener } from '@mui/material'
import { styled } from '@mui/material/styles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import PropTypes from 'prop-types'

const StyledTooltip = styled(Tooltip)(() => ({
  width: 'auto',
  textAlign: 'center',
  alignItems: 'center',
  '&::before': {
    border: '1px solid rgba(97, 97, 97, 0.92)',
    backgroundColor: 'rgba(97, 97, 97, 0.92)',
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
  successColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  executeColor?: 'inherit' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
  startIcon?: React.ReactElement
  variant?: 'text' | 'outlined' | 'contained'
}

const ClickAwayBtn = ({
  executeDescription = '',
  successLabel = '確定',
  executeLabel = '',
  successColor = 'success',
  executeColor = 'success',
  successClick = () => {},
  startIcon = <CheckCircleIcon fontSize="small" />,
  variant = 'outlined',
}: ClickAwayBtnProps) => {
  const [open, setOpen] = useState(false)

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
              取消
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
              {successLabel}
            </Button>
          </StyledDiv>
        }
      >
        <Button
          size="small"
          variant={variant}
          color={executeColor}
          startIcon={startIcon}
          sx={
            {
              // p: '0 .4rem !important',
            }
          }
          onClick={() => setOpen(true)}
        >
          {executeLabel}
        </Button>
      </StyledTooltip>
    </ClickAwayListener>
  )
}

export default ClickAwayBtn

ClickAwayBtn.propTypes = {
  executeDescription: PropTypes.string,
  successLabel: PropTypes.string,
  executeLabel: PropTypes.string,
  successColor: PropTypes.string,
  executeColor: PropTypes.string,
  successClick: PropTypes.func,
}
