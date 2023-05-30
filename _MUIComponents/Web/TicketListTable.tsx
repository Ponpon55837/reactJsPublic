import StarIcon from '@mui/icons-material/Star'
import { ListItem, Table, TableBody, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledDivider } from '@styles/styles_normal/Web/commonStyle'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import { WEB_LIST_STAR_ICON } from '@theme/colorManager'

const StyledListItem = styled(ListItem)(() => ({
  cursor: 'pointer',
  borderTop: 0,
  borderRight: 0,
  borderBottom: 0,
  borderLeft: '4px',
  borderStyle: 'solid',
}))

interface InputStatus {
  levelColor?: string
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
  lastText?: string
  onClick: () => void
  isEdit?: boolean
  isReport?: boolean
}
const TicketListTable = ({
  levelColor,
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
  lastText,
  isEdit,
  isReport,
  onClick = () => {},
}: InputStatus) => {
  const tableHeight = !thirdLabel ? '80px' : '100px'
  return (
    <>
      <StyledListItem sx={{ height: tableHeight, borderImage: levelColor }} onClick={onClick}>
        <Table size="small">
          {/* First Line */}
          <TableBody>
            <TableRow>
              <StyledListCell sx={{ width: '30%' }}>{firstLabel}</StyledListCell>
              <StyledListCell sx={{ width: '45%' }}>{firstContent}</StyledListCell>
              <StyledListCell align="right" sx={{ width: '25%' }}>
                {createdAt}
              </StyledListCell>
            </TableRow>
          </TableBody>

          {/* Second Line */}
          <TableBody>
            <TableRow>
              <StyledListCell>{secondLabel}</StyledListCell>
              <StyledListCell>{secondContent}</StyledListCell>
              <StyledListCell align="right" sx={{ color: statusColor }}>
                {status}
              </StyledListCell>
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
              <StyledListCell colSpan={2} sx={{ fontSize: '1rem' }}>
                {title}
              </StyledListCell>
              <StyledListCell align="right">
                {(isEdit || isReport) && (
                  <StarIcon
                    sx={{
                      verticalAlign: 'middle',
                      fontSize: '1rem',
                      marginBottom: '2px',
                      color: WEB_LIST_STAR_ICON,
                    }}
                  />
                )}
                {lastText}
              </StyledListCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledListItem>
      <StyledDivider sx={{ width: 'auto', margin: { md: '0 1px', xs: '0 -2px 0 1px' } }} />
    </>
  )
}

export default TicketListTable
