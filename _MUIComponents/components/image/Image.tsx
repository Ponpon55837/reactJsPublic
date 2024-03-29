import { forwardRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import getRatio from '@components/image/getRatio'
import { ImageProps } from '@components/image/types'
import { Box } from '@mui/material'

// eslint-disable-next-line react/display-name
const Image = forwardRef<HTMLSpanElement, ImageProps>(
  ({ ratio, disabledEffect = false, effect = 'blur', sx, ...other }, ref) => {
    const content = (
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={
          disabledEffect
            ? `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/transparent.png`
            : `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/placeholder.svg`
        }
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
        {...other}
      />
    )

    if (ratio) {
      return (
        <Box
          ref={ref}
          component="span"
          sx={{
            width: 1,
            lineHeight: 1,
            display: 'block',
            overflow: 'hidden',
            position: 'relative',
            pt: getRatio(ratio),
            '& .wrapper': {
              top: 0,
              left: 0,
              width: 1,
              height: 1,
              position: 'absolute',
              backgroundSize: 'cover !important',
            },
            ...sx,
          }}
        >
          {content}
        </Box>
      )
    }

    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          '& .wrapper': {
            width: 1,
            height: 1,
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        {content}
      </Box>
    )
  },
)

export default Image
