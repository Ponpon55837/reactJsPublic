import { Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ADMIN_COMMON_DEEP_GREY } from '@theme/colorManager'

export const StylesFlowDeleteButton = styled(Button)(() => ({
  margin: '0px',
  marginBottom: '4px',
  float: 'right',
  marginLeft: '5px',
}))

export const StylesFlowAddButton = styled(Button)(() => ({
  width: '100%',
  padding: '1rem',
  borderRadius: '5px',
  border: `1px dashed `,
  marginBottom: '4px',
  textAlign: 'center',
}))

export const StylesFlowSmallAddButton = styled(Button)(() => ({
  marginBottom: '5px',
  width: '100%',
}))

export const StylesTaskDeleteButton = styled(Button)(() => ({
  margin: '0px',
  marginBottom: '4px',
  float: 'right',
  marginLeft: '5px',
}))

export const StylesTaskAddButton = styled(Button)(() => ({
  margin: '4px auto',
  width: '10rem',
  display: 'flex',
  justifyContent: 'center',
}))

export const StylesNoDataTypography = styled(Typography)(() => ({
  textAlign: 'center',
  margin: '10% auto 0 auto',
  padding: 'auto',
  fontSize: '3rem',
  fontWeight: 'bold',
  color: ADMIN_COMMON_DEEP_GREY,
}))
