import { forwardRef } from 'react'
import { TextMaxLineProps } from '@components/text-max-line/types'
import useTypography from '@components/text-max-line/useTypography'
import { Link, Typography } from '@mui/material'

// eslint-disable-next-line react/display-name
const TextMaxLine = forwardRef<HTMLAnchorElement, TextMaxLineProps>(
  ({ asLink, variant = 'body1', line = 2, persistent = false, children, sx, ...other }, ref) => {
    const { lineHeight } = useTypography(variant)

    const styles = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: line,
      WebkitBoxOrient: 'vertical',
      ...(persistent && {
        height: lineHeight * line,
      }),
      ...sx,
    } as const

    if (asLink) {
      return (
        <Link color="inherit" ref={ref} variant={variant} sx={{ ...styles }} {...other}>
          {children}
        </Link>
      )
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...styles }} {...other}>
        {children}
      </Typography>
    )
  },
)

export default TextMaxLine
