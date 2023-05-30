import { Box, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { COMMON_PURE_WHITE, WEB_BORDER_DARK } from '@theme/colorManager'

// 班表
const StyledBox = styled(Box)(() => ({
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
  borderRightColor?: string
  borderTopColor?: string
  scheduleDate?: string
  scheduleType?: string
}

const ShiftSchedule = ({
  borderRightColor,
  borderTopColor,
  scheduleDate,
  scheduleType,
}: InputStatus) => {
  return (
    <Grid item xs={12}>
      <StyledBox sx={{ borderRight: borderRightColor, borderTop: borderTopColor }}>
        <Table sx={{ margin: 'auto' }}>
          <TableBody>
            <TableRow>
              <StyledTableCell sx={{ width: '60%', fontSize: '1rem' }}>
                {scheduleDate}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ width: '40%' }}>
                {scheduleType}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledBox>
    </Grid>
  )
}

export default ShiftSchedule
