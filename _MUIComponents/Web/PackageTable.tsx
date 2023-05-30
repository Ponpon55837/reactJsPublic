import { ListItem, Table, TableBody, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import { WEB_BORDER_LIGHT } from '@theme/colorManager'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
  cursor: 'pointer',
}))

interface InputStatus {
  id?: number
  firstLabel?: string
  firstContent?: string
  createdAt?: string
  secondLabel?: string
  secondContent?: string
  thirdLabel?: string
  thirdContent?: string
  lastLabel?: string
  lastContent?: string
  status?: string
  statusColor?: string

  onClick: () => void
  isTop?: boolean
}
const PackageTable = ({
  id,
  firstLabel,
  firstContent,
  createdAt,
  secondLabel,
  secondContent,
  thirdLabel,
  thirdContent,
  lastLabel,
  lastContent,
  status,
  statusColor,
  onClick = () => {},
}: InputStatus) => {
  const tableHeight = !lastLabel ? '80px' : '100px'
  return (
    <StyledListItem style={{ height: tableHeight }} onClick={onClick}>
      <Table size="small">
        {/* First Line */}
        <TableBody>
          <TableRow>
            <StyledListCell sx={{ width: '35%' }}>{firstLabel}</StyledListCell>
            <StyledListCell sx={{ width: '35%' }}>{firstContent}</StyledListCell>
            <StyledListCell align="right">{createdAt}</StyledListCell>
          </TableRow>
        </TableBody>

        {/* Second Line */}
        <TableBody>
          <TableRow>
            <StyledListCell>{secondLabel}</StyledListCell>
            <StyledListCell>{secondContent}</StyledListCell>
            <StyledListCell align="right" sx={{ width: '30%', color: statusColor }}>
              {status}
            </StyledListCell>
          </TableRow>
        </TableBody>

        {/* Third Line */}
        {thirdLabel && (
          <TableBody>
            <TableRow>
              <StyledListCell>{thirdLabel}</StyledListCell>
              <StyledListCell colSpan={2}>{thirdContent}</StyledListCell>
            </TableRow>
          </TableBody>
        )}

        {lastLabel && lastLabel !== null && (
          <TableBody>
            <TableRow>
              <StyledListCell>{lastLabel}</StyledListCell>
              <StyledListCell colSpan={2}>{lastContent}</StyledListCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </StyledListItem>
  )
}

export default PackageTable
