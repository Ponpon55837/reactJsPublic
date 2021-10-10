import { styled } from '@mui/styles'
import { Box } from '@mui/material'

const CustomBox = styled(Box)({
  margin: '0.5rem 0.3rem',
  padding: 0,
  display: 'inline-flex',
  '&: hover': {
    borderColor: 'primary'
  },
})

const CustomBox2 = styled(Box)({
  margin: '1rem auto',
  padding: 0,
  display: 'block',
  '&: hover': {
    borderColor: 'primary'
  },
})

export default function Hide() {
  return (<div />)
}

export {
  CustomBox,
  CustomBox2
}
