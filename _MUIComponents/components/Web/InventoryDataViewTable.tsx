import { useForm } from 'react-hook-form'
import { useUpdateEffect } from 'react-use'
import { useImmer } from 'use-immer'
import { useLocales } from '@locales/index'
import { ListItem, Table, TableBody, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import { WEB_BORDER_LIGHT } from '@theme/colorManager'
import { GetMoneyThousands } from '@utils/utilsFunction'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
}))

const StyledTableRow = styled(TableRow)(() => ({
  height: '24px',
}))

interface InputStatus {
  number: string
  name: string
  quantity: number | string
}

const InventoryDataViewTable = ({ number, name, quantity }: InputStatus) => {
  const [state, produce] = useImmer({
    updateQuantity: quantity === null ? '' : String(quantity),
  })
  const { t } = useLocales()
  const { updateQuantity } = state
  const {
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...state,
    },
  })

  useUpdateEffect(() => {
    produce((draft) => {
      draft.updateQuantity = quantity === null ? '' : String(quantity)
    })
  }, [quantity])

  return (
    <StyledListItem sx={{ height: quantity !== null ? '88px' : '64px' }}>
      <Table size="small">
        <TableBody>
          <StyledTableRow>
            <StyledListCell sx={{ width: '40%' }}>
              {`${t('MATERIALS_COMMON.number')}`}
            </StyledListCell>
            <StyledListCell sx={{ width: '60%' }}>{number}</StyledListCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledListCell>{`${t('MATERIALS_COMMON.materialName')}`}</StyledListCell>
            <StyledListCell>{name}</StyledListCell>
          </StyledTableRow>
          {quantity !== null && (
            <StyledTableRow>
              <StyledListCell>{`${t('MATERIALS_INVENTORY_WEB.inventoryCount')}`}</StyledListCell>
              <StyledListCell>{GetMoneyThousands(quantity)}</StyledListCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </StyledListItem>
  )
}

export default InventoryDataViewTable
