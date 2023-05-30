import { useSettingsContext } from '@components/settings/SettingsContext'
import { LayoutIcon, MaskControl, StyledCard, StyledWrap } from '@components/settings/styles'
import { RadioGroup } from '@mui/material'

const OPTIONS = ['vertical', 'horizontal', 'mini'] as const

export default function LayoutOptions() {
  const { themeLayout, onChangeLayout } = useSettingsContext()

  return (
    <RadioGroup name="themeLayout" value={themeLayout} onChange={onChangeLayout}>
      <StyledWrap sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {OPTIONS.map((layout) => (
          <StyledCard key={layout} selected={themeLayout === layout} sx={{ p: 0.75, height: 56 }}>
            <LayoutIcon layout={layout} />

            <MaskControl value={layout} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}
