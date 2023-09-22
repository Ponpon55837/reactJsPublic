import { useLocales } from '@locales/index'
import CropFreeIcon from '@mui/icons-material/CropFree'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import { IconButton, ListItem, Table, TableBody, TableRow, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import { WEB_BORDER_LIGHT, WEB_SKY_BLUE } from '@theme/colorManager'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
}))

const StyledTableRow = styled(TableRow)(() => ({
  height: '24px',
}))

interface InputStatus {
  id: number
  locationZoneId: string | number
  locationSiteName: string
  locationLevelName: string
  locationZoneName: string
  notes: string
  scanTime: string
  type: string
  onClick: () => void
  disabled?: any
}

const DailyTaskTable = ({
  id,
  locationZoneId,
  locationSiteName,
  locationLevelName,
  locationZoneName,
  notes,
  scanTime,
  type,
  onClick = () => {},
  disabled,
}: InputStatus) => {
  const { t } = useLocales()
  return (
    <StyledListItem sx={{ height: type === 'notCompletedData' ? '85px' : '112px' }}>
      <Table size="small">
        <TableBody>
          <StyledTableRow>
            <StyledListCell sx={{ width: '30%' }}>{`${t('INSPECTION.id')}`}</StyledListCell>
            {type === 'notCompletedData' ? (
              <>
                <StyledListCell sx={{ width: '55%' }}>{id}</StyledListCell>
                <StyledListCell align="center" sx={{ width: '15%' }} rowSpan={3}>
                  <IconButton
                    disabled={disabled}
                    onClick={type === 'notCompletedData' ? onClick : () => {}}
                  >
                    <CropFreeIcon sx={{ fontSize: '2.5rem', color: WEB_SKY_BLUE }} />
                  </IconButton>
                </StyledListCell>
              </>
            ) : (
              <>
                <StyledListCell sx={{ width: '65%' }}>{id}</StyledListCell>
                <StyledListCell align="center" sx={{ width: '5%' }}>
                  {notes === '' ? (
                    ''
                  ) : (
                    // <Tooltip title={notes} placement="left">
                    <StickyNote2Icon sx={{ height: '20px' }} />
                    // </Tooltip>
                  )}
                </StyledListCell>
              </>
            )}
          </StyledTableRow>
          <StyledTableRow>
            <StyledListCell sx={{ my: 3 }}>
              {`${t('GUARD_INSPECTION_VIEW.locationNumber')}`}
            </StyledListCell>
            <StyledListCell colSpan={type === 'notCompletedData' ? 0 : 2}>
              {locationZoneId}
            </StyledListCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledListCell>{`${t('COMMON.areaLocation')}`}</StyledListCell>
            <StyledListCell colSpan={type === 'notCompletedData' ? 0 : 2}>
              {locationSiteName} - {locationLevelName} - {locationZoneName}
            </StyledListCell>
          </StyledTableRow>
          {type === 'notCompletedData' ? (
            <></>
          ) : (
            <StyledTableRow>
              <StyledListCell>{`${t('INSPECTION.scanTime')}`}</StyledListCell>
              <StyledListCell colSpan={2}>{scanTime}</StyledListCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </StyledListItem>
  )
}

export default DailyTaskTable
