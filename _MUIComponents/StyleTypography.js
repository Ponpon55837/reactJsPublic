import { Typography, Stack, Box, TextField } from '@mui/material'
import PropTypes from 'prop-types'

const StyleTypography = ({
  noWrap = true,
  spacing = 2,
  title = '',
  content = '',
  contentText = false,
  fontSize = '1rem',
}) => {
  return (
    <Typography
      noWrap={noWrap}
      variant="title"
      fontWeight={400}
      emphasis="medium"
      sx={{ fontSize: fontSize }}
    >
      <Stack direction="row" spacing={spacing}>
        <Box>{title}</Box>
        <Box>
          {contentText ? (
            <TextField multiline fullWidth defaultValue={content} inputProps={{ readOnly: true }} />
          ) : (
            content
          )}
        </Box>
      </Stack>
    </Typography>
  )
}

export default StyleTypography

StyleTypography.propTypes = {
  noWrap: PropTypes.bool,
  spacing: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]),
  contentText: PropTypes.bool,
  fontSize: PropTypes.string,
}
