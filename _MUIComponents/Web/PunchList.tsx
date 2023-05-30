import { useLocales } from '@locales/index'
import { Box, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  COMMON_PURE_WHITE,
  WEB_BORDER_DARK,
  WEB_PUNCH_CORRECT,
  WEB_PUNCH_ERROR,
} from '@theme/colorManager'

export const StyledPunchBox = styled(Box)(() => ({
  marginTop: '1rem',
  padding: '6px 8px',
  height: '56px',
  maxWidth: '100%',
  background: WEB_BORDER_DARK,
  borderRadius: '0 0 10px 10px',
  display: 'flex',
  alignItems: 'center',
}))

export const StyledTableCell = styled(TableCell)(() => ({
  color: COMMON_PURE_WHITE,
  borderCollapse: 'collapse',
  border: 'none',
  padding: '0 4px',
  fontSize: '0.875rem',
}))
interface InputStatus {
  punchIn?: string
  punchOut?: string
  workDate: string
}

const PunchList = ({ punchIn, punchOut, workDate }: InputStatus) => {
  const { t } = useLocales()
  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledPunchBox
          sx={{
            borderRight:
              !punchIn || !punchOut
                ? `8px solid ${WEB_PUNCH_ERROR}`
                : `8px solid ${WEB_PUNCH_CORRECT}`,
          }}
        >
          <Table sx={{ margin: 'auto' }}>
            <TableBody>
              <TableRow>
                <StyledTableCell sx={{ width: '36%', fontSize: '1rem' }}>
                  {workDate}
                </StyledTableCell>
                <StyledTableCell sx={{ width: '17%' }}>
                  {`${t('PUNCH_COMMON_WEB.punchIn')}`}
                </StyledTableCell>
                <StyledTableCell sx={{ width: '15%' }}>{punchIn}</StyledTableCell>
                <StyledTableCell sx={{ width: '17%' }}>
                  {`${t('PUNCH_COMMON_WEB.punchOut')}`}
                </StyledTableCell>
                <StyledTableCell sx={{ width: '15%' }}>{punchOut}</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledPunchBox>
      </Grid>
    </Grid>
  )
}

export default PunchList
