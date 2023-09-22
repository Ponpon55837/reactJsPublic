import { useLocales } from '@locales/index'
import { Box, Divider, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  COMMON_PURE_WHITE,
  WEB_BORDER_DARK,
  WEB_PROPERTY_BG,
  WEB_PROPERTY_NAME,
} from '@theme/colorManager'

const PropertyListBox = styled(Box)(() => ({
  margin: '1rem',
  padding: '12px 16px',
  minHeight: '265px',
  maxWidth: '100%',
  background: WEB_PROPERTY_BG,
  borderRadius: '10px',
  fontSize: '0.875rem',
  color: COMMON_PURE_WHITE,
}))

const PropertyNameBox = styled(Box)(() => ({
  display: 'inline-block',
  borderRadius: '5px',
  background: WEB_PROPERTY_NAME,
  padding: '2px 4px',
}))

// 一般水平分隔線
export const StyledDivider = styled(Divider)(() => ({
  width: '100%',
  height: '1px',
  background: WEB_BORDER_DARK,
  margin: '7px auto',
}))

interface InputStatus {
  propertyName: string
  number: string
  name: string
  phone: string
  managementFee: number
  isMonthlyPayment: boolean
  lastPaymentDate: string
  ownerName: string
  ownerPhone: string
}

const PropertyList = ({
  propertyName,
  number,
  name,
  phone,
  managementFee,
  isMonthlyPayment,
  lastPaymentDate,
  ownerName,
  ownerPhone,
}: InputStatus) => {
  const { t } = useLocales()
  return (
    <li>
      <PropertyListBox>
        <Grid container sx={{ mb: '4px' }}>
          <Grid item xs={12} sx={{ fontSize: '1rem', letterSpacing: '0.1em' }}>
            <PropertyNameBox>{propertyName}</PropertyNameBox>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={7}>
            {`${t('MANAGEMENT_FEE_COMMON.propertyId')}`}
          </Grid>
          <Grid item xs={5}>
            {number}
          </Grid>
        </Grid>

        <StyledDivider />

        <Grid container>
          <Grid item xs={7}>
            {`${t('MANAGEMENT_FEE_COMMON.head')}`}
          </Grid>
          <Grid item xs={5}>
            {name}
          </Grid>
          <Grid item xs={7}>
            {`${t('COMMON.phone')}`}
          </Grid>
          <Grid item xs={5}>
            {phone}
          </Grid>
        </Grid>

        <StyledDivider />

        <Grid container>
          <Grid item xs={7}>
            {`${t('MANAGEMENT_FEE_COMMON.cycle')}`}
          </Grid>
          {isMonthlyPayment === true ? (
            <Grid item xs={5}>
              {`${t('MANAGEMENT_FEE_COMMON.quarterly')}`}
            </Grid>
          ) : (
            <Grid item xs={5}>
              {`${t('MANAGEMENT_FEE_COMMON.month')}`}
            </Grid>
          )}
          <Grid item xs={7}>
            {`${t('MANAGEMENT_FEE_COMMON.fee')}`}
          </Grid>
          <Grid item xs={5}>
            NT$ {managementFee}
          </Grid>
          <Grid item xs={7}>
            {`${t('MANAGEMENT_FEE_COMMON.lastPayment')}`}
          </Grid>
          <Grid item xs={5}>
            {lastPaymentDate}
          </Grid>
        </Grid>

        <StyledDivider />

        <Grid container>
          <Grid item xs={7}>
            {`${t('MANAGEMENT_FEE_COMMON.owner')}`}
          </Grid>
          <Grid item xs={5}>
            {ownerName}
          </Grid>
          <Grid item xs={7}>
            {`${t('COMMON.phone')}`}
          </Grid>
          <Grid item xs={5}>
            {ownerPhone}
          </Grid>
        </Grid>
      </PropertyListBox>
    </li>
  )
}

export default PropertyList
