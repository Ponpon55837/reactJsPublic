import { forwardRef } from 'react'
import { IconifyProps } from '@components/iconify/types'
import { Icon } from '@iconify/react'
import { Box, BoxProps } from '@mui/material'

interface Props extends BoxProps {
  icon: IconifyProps
}

// eslint-disable-next-line react/display-name
const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
))

export default Iconify
