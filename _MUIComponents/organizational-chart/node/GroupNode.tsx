import { Avatar, Box, Card, Stack, SxProps, Typography } from '@mui/material'
import { Theme, alpha, useTheme } from '@mui/material/styles'
import { PaletteColor } from '@mui/material/styles/createPalette'
import Label from '../../label/Label'
import { ItemProps } from '../types'

type Props = {
  node: ItemProps
  depth?: number
  length?: number
  sx?: SxProps<Theme>
}

export default function GroupNode({ node, depth, length, sx }: Props) {
  const theme = useTheme()

  const isLight = theme.palette.mode === 'light'

  const styles = (color: PaletteColor) => ({
    bgcolor: alpha(color.main, 0.08),
    border: `solid 1px ${alpha(color.main, 0.24)}`,
    color: isLight ? color.darker : color.lighter,
  })
  const isLabel = depth === 1 || node.group === 'root'

  const isGrRoot = node.group === 'root'

  const isGrProduct = node.group === 'product design'

  const isGrDevelopment = node.group === 'development'

  const isGrMarketing = node.group === 'marketing'

  const isGrFinance = node.group === 'finance'

  return (
    <Stack sx={{ position: 'relative', display: 'inline-flex' }} alignItems="center">
      {!isLabel && (
        <Avatar
          alt={node.name}
          src={node.avatar || ''}
          sx={{
            mt: -3.5,
            zIndex: 9,
            width: 56,
            height: 56,
            position: 'absolute',
            border: `solid 4px ${theme.palette.background.paper}`,
          }}
        />
      )}

      <Card
        sx={{
          pt: 5,
          pb: 3,
          minWidth: 200,
          borderRadius: 1.5,
          textTransform: 'capitalize',
          ...(isLabel && { py: 2 }),
          ...(isLabel && isGrRoot && styles(theme.palette.primary)),
          ...(isLabel && isGrProduct && styles(theme.palette.primary)),
          ...(isLabel && isGrDevelopment && styles(theme.palette.warning)),
          ...(isLabel && isGrMarketing && styles(theme.palette.error)),
          ...(isLabel && isGrFinance && styles(theme.palette.secondary)),
          ...styles(theme.palette.primary),

          ...sx,
        }}
      >
        {depth !== 1 && !isGrRoot && (
          <Box
            sx={{
              top: 0,
              left: 0,
              width: 1,
              height: 4,
              position: 'absolute',
              borderRadius: 1.5,
              bgcolor: 'secondary.light',
              ...(isGrProduct && {
                bgcolor: 'primary.light',
              }),
              ...(isGrDevelopment && {
                bgcolor: 'warning.light',
              }),
              ...(isGrMarketing && {
                bgcolor: 'error.light',
              }),
              ...(isGrFinance && {
                bgcolor: 'secondary.light',
              }),
            }}
          />
        )}

        <Typography variant={isLabel ? 'subtitle1' : 'subtitle2'} noWrap>
          {node.name}
          {isLabel && !isGrRoot && (
            <Label
              color={
                (isGrDevelopment && 'warning') ||
                (isGrMarketing && 'error') ||
                (isGrFinance && 'secondary') ||
                'primary'
              }
              sx={{ ml: 1 }}
            >
              {length}
            </Label>
          )}
        </Typography>

        {!isLabel && (
          <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
            {node.role}
          </Typography>
        )}
      </Card>
    </Stack>
  )
}
