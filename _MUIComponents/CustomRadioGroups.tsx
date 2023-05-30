import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

interface Props {
  title?: string
  optionArr?: Array<{ id: number | string; name: string }>
  value?: number | string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const CustomRadioGroups = ({
  title = '',
  optionArr = [{ id: 0, name: 'test' }],
  value = '0',
  onChange = () => {},
  disabled = false,
}: Props) => {
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup row value={value} onChange={onChange}>
        {optionArr.map((option, idx) => (
          <FormControlLabel
            key={idx}
            value={String(option.id)}
            control={<Radio />}
            label={option.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default CustomRadioGroups
