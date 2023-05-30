import { useLocales } from '@locales/index'
import { ListItem, Table, TableBody, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import { WEB_BORDER_LIGHT } from '@theme/colorManager'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
  height: '112px',
  cursor: 'pointer',
}))
interface InputStatus {
  no?: number
  createdAt?: string
  status?: string
  statusColor?: string
  checkedItems?: number | string
  unCheckedItems?: number | string
  name?: string
  onClick: () => void
}

const InventoryTable = ({
  no,
  createdAt,
  status,
  statusColor,
  checkedItems,
  unCheckedItems,
  name,
  onClick = () => {},
}: InputStatus) => {
  const { t } = useLocales()
  return (
    <StyledListItem onClick={onClick}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <StyledListCell sx={{ width: '40%' }}>
              {`${t('MATERIALS_COMMON_WEB.inventoryNumber')}`}
            </StyledListCell>
            <StyledListCell sx={{ width: '35%' }}>{no}</StyledListCell>
            <StyledListCell align="right" sx={{ width: '25%' }}>
              {createdAt}
            </StyledListCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <StyledListCell>{`${t('MATERIALS_COMMON_WEB.unCheckedItems')}`}</StyledListCell>
            <StyledListCell>{unCheckedItems}</StyledListCell>
            <StyledListCell align="right" sx={{ color: statusColor }}>
              {status}
            </StyledListCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <StyledListCell>{`${t('MATERIALS_COMMON.checkedItems')}`}</StyledListCell>
            <StyledListCell colSpan={2}>{checkedItems}</StyledListCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <StyledListCell
              colSpan={2}
              sx={{
                maxWidth: '30px',
                fontWeight: 400,
                fontSize: '1rem',
                height: '23px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {name}
            </StyledListCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledListItem>
  )
}

export default InventoryTable
