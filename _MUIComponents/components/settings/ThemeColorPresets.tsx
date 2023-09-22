import merge from 'lodash/merge'
import { useMemo } from 'react'
import { useSettingsContext } from '@components/settings/SettingsContext'
import { ThemeProvider, alpha, createTheme, useTheme } from '@mui/material/styles'

type Props = {
  children: React.ReactNode
}

export default function ThemeColorPresets({ children }: Props) {
  const outerTheme = useTheme()

  const { presetsColor } = useSettingsContext()

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: presetsColor,
      },
      customShadows: {
        primary: `0 8px 16px 0 ${alpha(presetsColor.main, 0.24)}`,
      },
    }),
    [presetsColor],
  )

  const theme = createTheme(merge(outerTheme, themeOptions))

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
