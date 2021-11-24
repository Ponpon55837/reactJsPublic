import { Typography, Stack, Box } from '@mui/material'
import PropTypes from 'prop-types'

const CustomTypography = ({ noWrap = true, spacing = 2, title = '', content = '' }) => {
  return (
    <Typography noWrap={noWrap} variant="title" fontWeight={400} emphasis="medium">
      <Stack direction="row" spacing={spacing}>
        <Box>{title}</Box>
        <Box>{content}</Box>
      </Stack>
    </Typography>
  )
}

export default CustomTypography

CustomTypography.propTypes = {
  noWrap: PropTypes.bool,
  spacing: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
}
