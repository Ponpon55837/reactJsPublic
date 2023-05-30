import { useLocales } from '@locales/index'
import StarIcon from '@mui/icons-material/Star'
import { ListItem, Table, TableBody, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import { WEB_LIST_STAR_ICON } from '@theme/colorManager'
import { WEB_BORDER_LIGHT } from '@theme/colorManager'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
  cursor: 'pointer',
  height: '112px',
}))

interface InputStatus {
  noName?: string
  no?: string
  QuantityName?: string
  createdAt?: string
  materialNo?: string
  auditStatus?: string
  requisitionQuantity?: number | string
  purchaseQuantity?: number | string
  restockQuantity?: number | string
  trackingNumber?: string
  name?: string
  statusColor?: string
  isEdit?: boolean
  onClick: () => void
}

const MaterialsTable = ({
  noName,
  no,
  QuantityName,
  createdAt,
  materialNo,
  auditStatus,
  requisitionQuantity,
  purchaseQuantity,
  restockQuantity,
  trackingNumber,
  name,
  statusColor,
  isEdit,
  onClick = () => {},
}: InputStatus) => {
  const { t } = useLocales()
  return (
    <StyledListItem onClick={onClick}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <StyledListCell sx={{ width: '40%' }}>{noName}</StyledListCell>
            <StyledListCell sx={{ width: '35%' }}>{no}</StyledListCell>
            <StyledListCell align="right" sx={{ width: '25%' }}>
              {createdAt}
            </StyledListCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <StyledListCell>{`${t('MATERIALS_COMMON_WEB.materialNumber')}`}</StyledListCell>
            <StyledListCell>
              {materialNo !== null ? materialNo : `${t('MATERIALS_COMMON_WEB.noMaterialNo')}`}
            </StyledListCell>
            <StyledListCell align="right" sx={{ color: statusColor }}>
              {auditStatus}
            </StyledListCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <StyledListCell>{QuantityName}</StyledListCell>
            <StyledListCell>
              {requisitionQuantity
                ? requisitionQuantity
                : purchaseQuantity
                ? purchaseQuantity
                : restockQuantity}
            </StyledListCell>
            <StyledListCell align="right">
              {isEdit && (
                <StarIcon
                  sx={{
                    verticalAlign: 'middle',
                    fontSize: '1rem',
                    margin: '0 2px 2px 0',
                    color: WEB_LIST_STAR_ICON,
                  }}
                />
              )}
            </StyledListCell>
          </TableRow>
        </TableBody>

        {trackingNumber && (
          <TableBody>
            <TableRow>
              <StyledListCell>{`${t('MATERIALS_COMMON_WEB.trackingNumber')}`}</StyledListCell>
              <StyledListCell colSpan={2} sx={{ width: '75%' }}>
                {trackingNumber}
              </StyledListCell>
            </TableRow>
          </TableBody>
        )}

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
            <StyledListCell sx={{ width: '30%' }}></StyledListCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledListItem>
  )
}

export default MaterialsTable
