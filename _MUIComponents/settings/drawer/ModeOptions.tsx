import { useSettingsContext } from '@components/settings/SettingsContext'
import { MaskControl, StyledCard, StyledWrap } from '@components/settings/styles'
import SvgColor from '@components/svg-color'
import { RadioGroup } from '@mui/material'

const OPTIONS = ['light', 'dark'] as const

export default function ModeOptions() {
  const { themeMode, onChangeMode } = useSettingsContext()

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
      <StyledWrap>
        {OPTIONS.map((mode) => (
          <StyledCard key={mode} selected={themeMode === mode}>
            <SvgColor
              src={`/assets/icons/setting/${mode === 'light' ? 'ic_sun' : 'ic_moon'}.svg`}
            />

            <MaskControl value={mode} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}
