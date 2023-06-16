import { useLocales } from '@locales/index'
import PeopleIcon from '@mui/icons-material/People'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { COMMON_PURE_WHITE, WEB_COMMON_WHITE_GREY } from '@theme/colorManager'

const StyledTypography = styled(Typography)(() => ({
  color: WEB_COMMON_WHITE_GREY,
  fontSize: '0.875rem',
  letterSpacing: '0.05rem',
  fontWeight: '300',
}))

interface InputStatus {
  name: string
  no: string
  capacity: number
  deposit: number
  hourRent: number
}

const SpaceTabBox = ({ name, no, capacity, deposit, hourRent }: InputStatus) => {
  const { t } = useLocales()
  const addCommas = (num: any) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const removeNonNumeric = (num: any) => num?.toString().replace(/[^0-9]/g, '')
  return (
    <Box sx={{ textAlign: 'left' }}>
      <Box>
        <StyledTypography variant="caption" sx={{ fontSize: '1rem' }}>
          {name}
        </StyledTypography>
        <StyledTypography variant="caption" sx={{ fontSize: '0.8rem', marginLeft: '0.75rem' }}>
          {no}
        </StyledTypography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PeopleIcon sx={{ color: COMMON_PURE_WHITE }} />
        <StyledTypography sx={{ marginLeft: '1rem' }}>{capacity}</StyledTypography>
      </Box>

      <Box>
        <Typography
          variant="caption"
          sx={{
            color: WEB_COMMON_WHITE_GREY,
            fontSize: '0.875rem',
            letterSpacing: '0.05rem',
            fontWeight: '300',
          }}
        >
          {`${t('SPACE_COMMON.deposit')}`}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: WEB_COMMON_WHITE_GREY,
            fontSize: '0.875rem',
            letterSpacing: '0.05rem',
            fontWeight: '300',
            marginLeft: '0.5rem',
          }}
        >
          NT$ {addCommas(removeNonNumeric(deposit))}
        </Typography>
      </Box>

      <Box>
        <StyledTypography variant="caption">{`${t('SPACE_COMMON.fee')}`}</StyledTypography>
        <StyledTypography variant="caption" sx={{ marginLeft: '0.5rem' }}>
          NT$ {addCommas(removeNonNumeric(hourRent))}
        </StyledTypography>
      </Box>
    </Box>
  )
}

export default SpaceTabBox
