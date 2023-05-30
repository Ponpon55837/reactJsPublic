import { useSettingsContext } from '@components/settings/SettingsContext'
import { MaskControl, StyledCard, StyledWrap } from '@components/settings/styles'
import SvgColor from '@components/svg-color'
import { RadioGroup } from '@mui/material'

const OPTIONS = ['ltr', 'rtl'] as const

export default function DirectionOptions() {
  const { themeDirection, onChangeDirection } = useSettingsContext()

  return (
    <RadioGroup name="themeDirection" value={themeDirection} onChange={onChangeDirection}>
      <StyledWrap>
        {OPTIONS.map((direction) => (
          <StyledCard key={direction} selected={themeDirection === direction}>
            <SvgColor
              src={`/assets/icons/setting/${
                direction === 'rtl' ? 'ic_align_right' : 'ic_align_left'
              }.svg`}
            />

            <MaskControl value={direction} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}
