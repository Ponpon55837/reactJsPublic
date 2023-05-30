import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { Avatar, Card, IconButton, SxProps, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { ItemProps } from '../types'

//-簡易版組織圖-//

type Props = {
  node: ItemProps
  sx?: SxProps<Theme>
}

export default function StandardNode({ node, sx }: Props) {
  return (
    <>
      <Card
        sx={{
          p: 2,
          minWidth: 200,
          borderRadius: 1.5,
          textAlign: 'left',
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          textTransform: 'capitalize',
          background: '#E0E0E0',
          ...sx,
        }}
      >
        <IconButton disabled sx={{ position: 'absolute', top: 8, right: 8 }}>
          <WbSunnyIcon />
        </IconButton>

        <Avatar alt={node.name} src={node.avatar || ''} sx={{ mb: 1, width: 48, height: 48 }} />
        {/* 置中樣式 mx: 'auto',display: 'flex',justifyContent: 'center', */}

        <Typography variant="subtitle2" noWrap>
          {node.name}
        </Typography>

        <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
          {node.role}
        </Typography>
      </Card>
    </>
  )
}
