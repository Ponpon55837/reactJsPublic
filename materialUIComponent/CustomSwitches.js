import {
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material'

const CustomSwitches = ({
  switchArr = [],
}) => {
  return (
    <FormGroup style={{ display: 'block' }}>
      {switchArr.map((swi, idx) => (
        <FormControlLabel
          key={idx}
          control={<Switch defaultChecked={swi.checked} />}
          label={swi.label} />
      ))}
    </FormGroup>
  );
}

export default CustomSwitches
