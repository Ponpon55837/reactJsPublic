import { memo } from 'react'
import { StyledRootScrollbar, StyledScrollbar } from '@components/scrollbar/styles'
import { ScrollbarProps } from '@components/scrollbar/types'
import { Box } from '@mui/material'

function Scrollbar({ children, sx, ...other }: ScrollbarProps) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    )
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  )
}

export default memo(Scrollbar)
