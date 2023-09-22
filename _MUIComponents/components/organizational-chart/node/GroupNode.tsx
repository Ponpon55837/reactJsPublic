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
  const styles = (color: PaletteColor) => {
    if (color === undefined) return {}

    return {
      bgcolor: alpha(color.main, 0.08),
      border: `solid 1px ${alpha(color.main, 0.24)}`,
      color: isLight ? color.darker : color.lighter,
    }
  }
  const isLabel = depth === 1 || node.group === 'root'

  const isGrRoot = node.group === 'root'

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
          ...styles(node.color),
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
            }}
          />
        )}

        <Typography variant={isLabel ? 'subtitle1' : 'subtitle2'} noWrap>
          {node.name}
          {isLabel && !isGrRoot && (
            <Label color={'primary'} sx={{ ml: 1 }}>
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
