import { styled } from '@mui/styles'
import { Box, Typography } from '@mui/material'

const CustomBox = styled(Box)({
  margin: '0.5rem 0.3rem',
  padding: 0,
  display: 'inline-flex',
  '&: hover': {
    borderColor: 'primary',
  },
})

const CustomBox2 = styled(Box)({
  margin: '1rem auto',
  padding: 0,
  display: 'block',
  '&: hover': {
    borderColor: 'primary',
  },
})

const CustomBox3 = styled(Box)({
  margin: '0.3rem 1rem 0.3rem auto',
  padding: 0,
  display: 'inline-flex',
  '&: hover': {
    borderColor: 'primary',
  },
})

const CustomBox4 = styled(Box)({
  margin: '.3rem .1rem',
  padding: 0,
  display: 'inline-flex',
  '&: hover': {
    borderColor: 'primary',
  },
})

const CustomTypography = styled(Typography)({
  paddingBottom: '7px',
  borderBottom: '1px dotted #DDDDDD',
})

export default function Hide() {
  return <div />
}

export { CustomBox, CustomBox2, CustomBox3, CustomBox4, CustomTypography }
