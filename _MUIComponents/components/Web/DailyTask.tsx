import { useLocales } from '@locales/index'
import { Box, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  COMMON_PURE_WHITE,
  WEB_SKY_BLUE,
  WEB_TASK_BOX_BG,
  WEB_TASK_BOX_BORDER,
} from '@theme/colorManager'

export const StyledTaskBox = styled(Box)(() => ({
  marginTop: '1rem',
  padding: '6px 8px',
  height: '65px',
  maxWidth: '100%',
  background: WEB_TASK_BOX_BG,
  borderRadius: '0 0 10px 10px',
  display: 'flex',
  alignItems: 'center',
  borderRight: `8px solid ${WEB_TASK_BOX_BORDER}`,
  borderTop: `1px solid ${WEB_TASK_BOX_BORDER}`,
}))

export const StyledTaskGrid = styled(Grid)(() => ({
  marginLeft: '1rem',
  marginRight: '1rem',
  cursor: 'pointer',
}))

export const StyledDetailCell = styled(TableCell)(() => ({
  color: COMMON_PURE_WHITE,
  borderCollapse: 'collapse',
  border: 'none',
  padding: '0 4px',
  height: '29px',
  fontSize: '0.875rem',
  fontWeight: 300,
  letterSpacing: '0.05em',
  background: 'none',
}))

interface InputStatus {
  taskNumber: string
  pendingTask: number
  finishedTask: number
  onClick: () => void
}

const DailyTask = ({ taskNumber, pendingTask, finishedTask, onClick = () => {} }: InputStatus) => {
  const { t } = useLocales()
  return (
    <Grid container>
      <StyledTaskGrid item xs={11} md={12} onClick={onClick}>
        <StyledTaskBox>
          <Table sx={{ margin: 'auto' }}>
            <TableBody>
              <TableRow>
                <StyledDetailCell colSpan={2} sx={{ width: '60%', fontSize: '1rem' }}>
                  {taskNumber}
                </StyledDetailCell>
                <StyledDetailCell align="left" sx={{ width: '40%' }}>
                  {`${t('INSPECTION.unInspec')}`} &emsp; {pendingTask}
                </StyledDetailCell>
              </TableRow>
              <TableRow>
                <StyledDetailCell sx={{ width: '20%' }}>
                  {`${t('INSPECTION.complete')}`}
                </StyledDetailCell>
                <StyledDetailCell sx={{ width: '40%', color: WEB_SKY_BLUE, fontSize: '0.9375rem' }}>
                  {Math.round((finishedTask / (finishedTask + pendingTask)) * 100)}%
                </StyledDetailCell>
                <StyledDetailCell align="left" sx={{ color: COMMON_PURE_WHITE }}>
                  {`${t('INSPECTION.inspected')}`} &emsp; {finishedTask}
                </StyledDetailCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledTaskBox>
      </StyledTaskGrid>
    </Grid>
  )
}

export default DailyTask
