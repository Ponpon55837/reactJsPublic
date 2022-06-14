import { useCss } from 'react-use'
import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

interface CustomToolTipProps {
  title: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
  children: React.ReactElement<any, any>
}

const CustomToolTip = ({
  title,
  placement = 'top',
  arrow = true,
  children,
}: CustomToolTipProps) => {
  const toolClass = useCss({
    '&:hover': {
      cursor: 'pointer',
    },
  })

  return (
    <Tooltip title={title} placement={placement} arrow={arrow} className={toolClass}>
      {children}
    </Tooltip>
  )
}

export default CustomToolTip

CustomToolTip.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placement: PropTypes.string,
  arrow: PropTypes.bool,
  children: PropTypes.node,
}
