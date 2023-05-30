import { useCss } from 'react-use'
import { Tooltip, Typography } from '@mui/material'

interface Props {
  title?: any
  placement?: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
  toolTipTrigger?: boolean
}

const CustomToolTypography = ({
  title,
  placement = 'top',
  arrow = true,
  toolTipTrigger = false,
}: Props) => {
  const toolClass = useCss({
    '&:hover': {
      cursor: 'pointer',
    },
  })

  return (
    <>
      {toolTipTrigger ? (
        <Tooltip title={title ?? '-'} placement={placement} arrow={arrow} className={toolClass}>
          <Typography noWrap sx={{ fontSize: '.95rem' }}>
            {title ?? '-'}
          </Typography>
        </Tooltip>
      ) : (
        <Typography noWrap sx={{ fontSize: '.95rem' }}>
          {title ?? '-'}
        </Typography>
      )}
    </>
  )
}

export default CustomToolTypography
