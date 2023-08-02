import { useLocales } from '@locales/index'
import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { COMMON_PURE_WHITE, WEB_PAYMENT_BG } from '@theme/colorManager'

const PaymentListPaper = styled(Paper)(() => ({
  fontSize: '0.875rem',
  color: COMMON_PURE_WHITE,
  margin: '1.25rem 1rem',
  background: WEB_PAYMENT_BG,
  padding: '1.25rem 1rem',
}))

interface InputStatus {
  id?: number
  status?: string
  managementFee?: number
  propertyOwnershipNumber: string
  propertyOwnershipName: string
  ownerName: string
  receivedAt: string
  receivedByName: string
  billingDate: string
  statusColor: string
  serialNumber: string
}

const PaymentRecordsList = ({
  id,
  status,
  managementFee,
  propertyOwnershipNumber,
  propertyOwnershipName,
  ownerName,
  receivedAt,
  receivedByName,
  billingDate,
  statusColor,
  serialNumber,
}: InputStatus) => {
  const { t } = useLocales()
  return (
    <li>
      <PaymentListPaper elevation={3}>
        <Grid container>
          <Grid item xs={5}>
            {`${t('MANAGEMENT_FEE_COMMON.number')}`}
          </Grid>
          <Grid item xs={4}>
            {serialNumber}
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'right', color: statusColor }}>
            {status}
          </Grid>
          <Grid item xs={5}>
            {`${t('MANAGEMENT_FEE_COMMON.propertyId')}`}
          </Grid>
          <Grid item xs={4}>
            {propertyOwnershipNumber}
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'right' }}>
            NT$ {managementFee}
          </Grid>
          <Grid item xs={5}>
            {`${t('MANAGEMENT_FEE_COMMON.propertyName')}`}
          </Grid>
          <Grid item xs={7}>
            {propertyOwnershipName}
          </Grid>
          <Grid item xs={5}>
            {`${t('MANAGEMENT_FEE_COMMON.head')}`}
          </Grid>
          <Grid item xs={7}>
            {ownerName}
          </Grid>
        </Grid>

        {status === '已繳納' || status === 'Finished' ? (
          <Grid container>
            <Grid item xs={5}>
              {`${t('MANAGEMENT_FEE_COMMON.receivedTime')}`}
            </Grid>
            <Grid item xs={7}>
              {receivedAt}
            </Grid>
            <Grid item xs={5}>
              {`${t('MANAGEMENT_FEE_COMMON.payee')}`}
            </Grid>
            <Grid item xs={7}>
              {receivedByName}
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={5}>
              {`${t('MANAGEMENT_FEE_COMMON.date')}`}
            </Grid>
            <Grid item xs={7}>
              {billingDate}
            </Grid>
          </Grid>
        )}
      </PaymentListPaper>
    </li>
  )
}

export default PaymentRecordsList
