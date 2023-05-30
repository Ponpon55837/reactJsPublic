import { useSettingsContext } from '@components/settings/SettingsContext'
import { MaskControl, StyledCard, StyledWrap } from '@components/settings/styles'
import SvgColor from '@components/svg-color'
import { RadioGroup } from '@mui/material'

const OPTIONS = ['default', 'bold'] as const

export default function ContrastOptions() {
  const { themeContrast, onChangeContrast } = useSettingsContext()

  return (
    <RadioGroup name="themeContrast" value={themeContrast} onChange={onChangeContrast}>
      <StyledWrap>
        {OPTIONS.map((contrast) => (
          <StyledCard key={contrast} selected={themeContrast === contrast}>
            <SvgColor
              src={`/assets/icons/setting/${
                contrast === 'bold' ? 'ic_contrast_bold' : 'ic_contrast'
              }.svg`}
            />

            <MaskControl value={contrast} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}
