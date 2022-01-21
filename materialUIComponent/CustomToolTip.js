import { useCss } from 'react-use'
import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

const CustomToolTip = ({ title, placement = 'top', arrow = true, children }) => {
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
  title: PropTypes.string,
  placement: PropTypes.string,
  arrow: PropTypes.bool,
  children: PropTypes.node,
}
