import { Typography, Stack, Box, TextField } from '@mui/material'
import PropTypes from 'prop-types'

const CustomTypography = ({ noWrap = true, spacing = 2, title = '', content = '' }) => {
  return (
    <Typography noWrap={noWrap} variant="title" fontWeight={400} emphasis="medium">
      <Stack direction="row" spacing={spacing}>
        <Box sx={{ width: '100%' }}>
          <TextField
            label={title}
            variant="standard"
            multiline
            fullWidth
            disabled
            defaultValue={content}
            // InputProps={{ disableUnderline: true }}
            inputProps={{ readOnly: true }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Stack>
    </Typography>
  )
}

export default CustomTypography

CustomTypography.propTypes = {
  noWrap: PropTypes.bool,
  spacing: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]),
}
