import { useCss } from 'react-use'
import { Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'

interface Props {
  title?: any
  placement?: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
}

const CustomToolTypography = ({ title, placement = 'top', arrow = true }: Props) => {
  const toolClass = useCss({
    '&:hover': {
      cursor: 'pointer',
    },
  })

  return (
    <Tooltip title={title ?? '-'} placement={placement} arrow={arrow} className={toolClass}>
      <Typography noWrap sx={{ fontSize: '0.95rem' }}>
        {title ?? '-'}
      </Typography>
    </Tooltip>
  )
}

export default CustomToolTypography

CustomToolTypography.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
  placement: PropTypes.string,
  arrow: PropTypes.bool,
}
