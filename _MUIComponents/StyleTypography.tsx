import { Box, Stack, TextField, Typography } from '@mui/material'

interface InputValues {
  noWrap?: boolean
  spacing?: number
  title: string
  content?: string
  contentText?: boolean
  fontSize?: any
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'inherit'
}

const StyleTypography = ({
  noWrap = true,
  spacing = 2,
  title = '',
  content = '',
  contentText = false,
  fontSize = '1rem',
  variant = 'subtitle1',
}: InputValues) => {
  return (
    <Typography
      noWrap={noWrap}
      variant={variant}
      // emphasis="medium"
      sx={{ fontSize: fontSize, fontWeight: 400 }}
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
