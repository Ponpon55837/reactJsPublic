import { useLocales } from '@locales/index'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DangerousIcon from '@mui/icons-material/Dangerous'
import { ListItem, Table, TableBody, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import {
  WEB_BORDER_LIGHT,
  WEB_COMMON_GREEN,
  WEB_COMMON_GREY_WHITE,
  WEB_COMMON_RED,
  WEB_INVENTORY_ERROR_ICON,
  WEB_INVENTORY_LIST_BG,
} from '@theme/colorManager'
import { GetMoneyThousands } from '@utils/utilsFunction'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
  height: '88px',
  background: WEB_INVENTORY_LIST_BG,
}))

interface InputStatus {
  number: string
  name: string
  quantity: number | string
  isFinish: boolean
  isCorrect: boolean
}

const InventoryFinishDataTable = ({ number, name, quantity, isFinish, isCorrect }: InputStatus) => {
  const { t } = useLocales()
  return (
    <StyledListItem>
      <Table size="small">
        <TableBody>
          <TableRow sx={{ height: '24px' }}>
            <StyledListCell sx={{ width: '40%' }}>
              {`${t('MATERIALS_COMMON.number')}`}
            </StyledListCell>
            <StyledListCell sx={{ width: '35%' }}>{number}</StyledListCell>
            <StyledListCell align="right" sx={{ width: '25%' }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.75rem',
                  color: isFinish ? WEB_COMMON_GREY_WHITE : WEB_COMMON_RED,
                }}
              >
                {isFinish
                  ? `${t('MATERIALS_INVENTORY_WEB.checked')}`
                  : `${t('MATERIALS_INVENTORY_WEB.unchecked')}`}
              </Typography>
            </StyledListCell>
          </TableRow>
          <TableRow sx={{ height: '24px' }}>
            <StyledListCell>{`${t('MATERIALS_COMMON.materialName')}`}</StyledListCell>
            <StyledListCell colSpan={2}>{name}</StyledListCell>
          </TableRow>

          <TableRow sx={{ height: '24px' }}>
            <StyledListCell>{`${t('MATERIALS_INVENTORY_WEB.inventoryCount')}`}</StyledListCell>
            <StyledListCell>{GetMoneyThousands(quantity)}</StyledListCell>
            <StyledListCell align="right">
              {isCorrect ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'right',
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      color: WEB_COMMON_GREEN,
                      fontSize: '1.2rem',
                      marginRight: '2px',
                    }}
                  />

                  {`${t('MATERIALS_INVENTORY_WEB.correct')}`}
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'right',
                  }}
                >
                  <DangerousIcon
                    sx={{ color: WEB_INVENTORY_ERROR_ICON, fontSize: '1.2rem', marginRight: '2px' }}
                  />
                  {`${t('MATERIALS_INVENTORY_WEB.incorrect')}`}
                </div>
              )}
            </StyledListCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledListItem>
  )
}

export default InventoryFinishDataTable
