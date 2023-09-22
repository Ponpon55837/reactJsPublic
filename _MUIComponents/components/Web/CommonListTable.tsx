import { ListItem, Table, TableBody, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import { COMMON_PURE_BLACK, COMMON_PURE_WHITE, WEB_BORDER_LIGHT } from '@theme/colorManager'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
}))

// isTop icon for Bulletins
export const StyledIsTop = styled('span')(() => ({
  padding: '2px 8px',
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
  background: COMMON_PURE_WHITE,
  color: COMMON_PURE_BLACK,
  borderRadius: '10px',
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
  status?: string
  statusColor?: string
  title?: string
  onClick: () => void
  isTop?: boolean
}
const CommonListTable = ({
  id,
  firstLabel,
  firstContent,
  createdAt,
  secondLabel,
  secondContent,
  thirdLabel,
  thirdContent,
  status,
  statusColor,
  title,
  onClick = () => {},
  isTop,
}: InputStatus) => {
  const tableHeight = !thirdLabel ? '80px' : '100px'
  return (
    <StyledListItem style={{ height: tableHeight, cursor: 'pointer' }} onClick={onClick}>
      <Table size="small">
        {/* First Line */}
        <TableBody>
          <TableRow>
            <StyledListCell sx={{ width: '30%' }}>
              {firstLabel}
              {/* Bulletins isTop icon 顯示判斷 */}
              {isTop && <StyledIsTop>TOP</StyledIsTop>}
            </StyledListCell>
            <StyledListCell sx={{ width: '40%' }}>{firstContent}</StyledListCell>
            <StyledListCell align="right" sx={{ width: '30%', color: statusColor }}>
              {status}
            </StyledListCell>
          </TableRow>
        </TableBody>

        {/* Second Line */}
        <TableBody>
          <TableRow>
            <StyledListCell>{secondLabel}</StyledListCell>
            <StyledListCell>{secondContent}</StyledListCell>
            <StyledListCell align="right">{createdAt}</StyledListCell>
          </TableRow>
        </TableBody>

        {/* Third Line */}
        {thirdLabel && (
          <TableBody>
            <TableRow>
              <StyledListCell>{thirdLabel}</StyledListCell>
              <StyledListCell>{thirdContent}</StyledListCell>
            </TableRow>
          </TableBody>
        )}

        {/* Last Line */}
        <TableBody>
          <TableRow>
            <StyledListCell colSpan={2} sx={{ fontSize: '1rem', height: '25px' }}>
              {title}
            </StyledListCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledListItem>
  )
}

export default CommonListTable
