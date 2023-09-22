import { forwardRef } from 'react'
import Icon from '@components/Icon'
import { Radio, RadioGroup, RadioGroupProps } from '@mui/material'
import { COMMON_PURE_WHITE } from '@theme/colorManager'

export interface ColorSinglePickerProps extends RadioGroupProps {
  colors: string[]
}

// eslint-disable-next-line react/display-name
const ColorSinglePicker = forwardRef<HTMLDivElement, ColorSinglePickerProps>(
  ({ colors, ...other }, ref) => (
    <RadioGroup row ref={ref} {...other}>
      {colors.map((color) => {
        const whiteColor = color === COMMON_PURE_WHITE || color === 'white'

        return (
          <Radio
            key={color}
            value={color}
            color="default"
            icon={<Icon whiteColor={whiteColor} />}
            checkedIcon={<Icon checked whiteColor={whiteColor} />}
            sx={{
              color,
              '&:hover': { opacity: 0.72 },
              '& svg': { width: 12, height: 12 },
            }}
          />
        )
      })}
    </RadioGroup>
  ),
)

export default ColorSinglePicker
