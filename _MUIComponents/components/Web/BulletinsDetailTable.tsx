import { ListItem, Table, TableBody, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledDetailCell } from '@styles/styles_normal/Web/detailStyle'
import { WEB_BORDER_LIGHT } from '@theme/colorManager'

// 時間選擇冒號
export const StyledSpan = styled(`span`)(() => ({
  marginRight: '8px',
  padding: '6px 8px',
  borderStyle: 'dashed',
  borderRadius: '20px',
  borderColor: WEB_BORDER_LIGHT,
}))
interface InputStatus {
  id?: number
  firstContent?: string
  secondLabel?: string
  secondContent?: string
  secondTail: string
  thirdLabel?: string
  thirdContent?: string
  thirdBorderText?: string
  thirdTail?: string
}
const BulletinsDetailTable = ({
  id,
  firstContent,
  secondLabel,
  secondContent,
  secondTail,
  thirdLabel,
  thirdContent,
  thirdBorderText,
  thirdTail,
}: InputStatus) => {
  return (
    <ListItem>
      <Table size="small">
        {/* 第一行佔滿 */}
        <TableHead>
          <TableRow>
            <StyledDetailCell colSpan={4} sx={{ fontSize: '1rem' }} scope="row">
              {firstContent}
            </StyledDetailCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <StyledDetailCell sx={{ width: '25%' }}>{secondLabel}</StyledDetailCell>
            <StyledDetailCell
              colSpan={2}
              sx={{ width: '20%', letterSpacing: '0.1em', fontSize: '0.875rem' }}
            >
              {secondContent}
            </StyledDetailCell>
            <StyledDetailCell sx={{ width: '55%' }} align="right">
              {secondTail}
            </StyledDetailCell>
          </TableRow>

          <TableRow>
            <StyledDetailCell>{thirdLabel}</StyledDetailCell>
            <StyledDetailCell colSpan={2} sx={{ letterSpacing: '0.1em', fontSize: '0.875rem' }}>
              {thirdContent}
            </StyledDetailCell>
            <StyledDetailCell align="right">
              {/* 圓框文字判斷 */}
              {thirdBorderText && <StyledSpan>{thirdBorderText}</StyledSpan>}
              {thirdTail}
            </StyledDetailCell>
          </TableRow>
        </TableBody>
      </Table>
    </ListItem>
  )
}

export default BulletinsDetailTable
