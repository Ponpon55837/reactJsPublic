import Iconify from '@components/iconify'
import { useSettingsContext } from '@components/settings/SettingsContext'
import { StyledCard } from '@components/settings/styles'
import { Box, Stack } from '@mui/material'

export default function StretchOptions() {
  const { themeStretch, onToggleStretch } = useSettingsContext()

  return (
    <StyledCard selected={themeStretch} onClick={onToggleStretch} sx={{ height: 48, px: 1 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: 0.24,
          transition: (theme) => theme.transitions.create('width'),
          ...(themeStretch && {
            width: 0.5,
          }),
        }}
      >
        <Iconify icon={themeStretch ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'} />

        <Box sx={{ flexGrow: 1, borderBottom: `dashed 1.5px currentcolor` }} />

        <Iconify icon={themeStretch ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'} />
      </Stack>
    </StyledCard>
  )
}
