import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

interface Props {
  spacing?: number
  title: string
  content: string | number | []
  fontWeight?: number
  grayTitle?: boolean
}

const CustomTypography = ({
  spacing = 2,
  title = '',
  content = '',
  fontWeight = 400,
  grayTitle = false,
}: Props) => {
  return (
    <>
      <Stack direction="row" spacing={spacing}>
        <Box>
          <Typography
            noWrap
            fontWeight={fontWeight}
            sx={{ color: grayTitle ? 'rgba(0, 0, 0, 0.6)' : 'default', fontSize: '1rem' }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            noWrap
            fontWeight={fontWeight}
            sx={{ color: grayTitle ? 'rgba(0, 0, 0, 0.6)' : 'default', fontSize: '1rem' }}
          >
            {content}
          </Typography>
        </Box>
      </Stack>
    </>
  )
}

export default CustomTypography

CustomTypography.propTypes = {
  fontWeight: PropTypes.number,
  spacing: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
}
