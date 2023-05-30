import { useForm } from 'react-hook-form'
import { useUpdateEffect } from 'react-use'
import { useImmer } from 'use-immer'
import { useLocales } from '@locales/index'
import { Box, Button, ListItem, Table, TableBody, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledForm, StyledTextField } from '@styles/styles_normal/Web/commonStyle'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import {
  COMMON_PURE_WHITE,
  WEB_BORDER_DARK,
  WEB_BORDER_LIGHT,
  WEB_COMMON_GREY,
  WEB_COMMON_WHITE_GREY,
} from '@theme/colorManager'
import Regex from '@utils/regex'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
  height: '126px',
  background: WEB_BORDER_DARK,
}))

const StyledTableRow = styled(TableRow)(() => ({
  height: '24px',
}))

const StyledSureBtn = styled(Button)(() => ({
  fontSize: '1rem',
  display: 'flex',
  margin: ' 2rem auto',
  padding: '4px 0px 5px',
  color: COMMON_PURE_WHITE,
  height: '38px',
  letterSpacing: '0.05em',
  border: `1px solid ${WEB_COMMON_GREY}`,
  borderRadius: '7px',
  background: 'transparent',
  width: '20px',
}))

interface InputStatus {
  number: string
  name: string
  quantity?: number
  onUpdateQuantity: (quantity: string) => void
}

interface immer {
  updateQuantity: string
}

const InventoryDataEditTable = ({ number, name, quantity, onUpdateQuantity }: InputStatus) => {
  const [state, produce] = useImmer<immer>({
    updateQuantity: quantity === null ? '' : String(quantity),
  })
  const { t } = useLocales()
  const { updateQuantity } = state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...state,
    },
  })

  const onSubmit = () => {
    produce((draft) => {
      draft.updateQuantity = ''
    })
    onUpdateQuantity(updateQuantity)
  }

  useUpdateEffect(() => {
    produce((draft) => {
      draft.updateQuantity = quantity === null ? '' : String(quantity)
    })
  }, [quantity])

  return (
    <StyledListItem>
      <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <Table size="small">
          <TableBody>
            <StyledTableRow>
              <StyledListCell sx={{ width: '40%' }}>
                {`${t('MATERIALS_COMMON.number')}`}
              </StyledListCell>
              <StyledListCell colSpan={2} sx={{ width: '60%' }}>
                {number}
              </StyledListCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledListCell>{`${t('MATERIALS_COMMON.materialName')}`}</StyledListCell>
              <StyledListCell>{name}</StyledListCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledListCell>{`${t('MATERIALS_INVENTORY_WEB.inventoryCount')}`}</StyledListCell>
              <StyledListCell>
                <Box style={{ display: 'flex', alignItems: 'center', maxHeight: '50px' }}>
                  <StyledTextField
                    sx={{ minWidth: '8rem', marginRight: '0.5rem' }}
                    size="small"
                    margin="dense"
                    variant="outlined"
                    value={updateQuantity}
                    inputProps={{
                      style: { color: WEB_COMMON_WHITE_GREY, fontSize: '18px' },
                      inputMode: 'numeric',
                    }}
                    {...register('updateQuantity', {
                      onChange: (e) => {
                        produce((draft) => {
                          draft.updateQuantity = e.target.value
                        })
                      },
                      pattern: {
                        value: Regex.DIGITS,
                        message: `${t('COMMON.numberPlaceholder')}`,
                      },
                    })}
                    InputLabelProps={{ shrink: true }}
                    error={
                      errors?.updateQuantity != null && errors?.updateQuantity?.type.length > 0
                    }
                    helperText={errors?.updateQuantity?.type && errors?.updateQuantity?.message}
                  />
                  <StyledSureBtn type={'submit'}>{`${t('COMMON.sure')}`}</StyledSureBtn>
                </Box>
              </StyledListCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </StyledForm>
    </StyledListItem>
  )
}

export default InventoryDataEditTable
