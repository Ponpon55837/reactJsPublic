import { useLocales } from '@locales/index'
import { ListItem, Table, TableBody, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledListCell } from '@styles/styles_normal/Web/listStyle'
import { WEB_BORDER_LIGHT } from '@theme/colorManager'

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: `1px solid ${WEB_BORDER_LIGHT}`,
  height: '100px',
  cursor: 'pointer',
}))
interface InputStatus {
  no: string
  inventory: number | string
  name: string
  mainCategory: string
  modelAnchorId: string
  materialSubCategoryName: string
  onClick: () => void
}

const MaterialSearchTable = ({
  no,
  inventory,
  name,
  mainCategory,
  modelAnchorId,
  materialSubCategoryName,
  onClick = () => {},
}: InputStatus) => {
  const { t } = useLocales()
  return (
    <>
      <StyledListItem onClick={onClick}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <StyledListCell sx={{ width: '25%' }}>
                {`${t('MATERIALS_COMMON.number')}`}
              </StyledListCell>
              <StyledListCell sx={{ width: '55%' }}>{no}</StyledListCell>
              <StyledListCell align="right" sx={{ width: '20%' }}>
                {mainCategory}
              </StyledListCell>
            </TableRow>
          </TableBody>

          <TableBody>
            <TableRow>
              <StyledListCell sx={{ width: '25%' }}>
                {`${t('MATERIALS_COMMON.inventory')}`}
              </StyledListCell>
              <StyledListCell sx={{ width: '55%' }}>{inventory}</StyledListCell>
              <StyledListCell align="right" sx={{ width: '20%' }}>
                {materialSubCategoryName}
              </StyledListCell>
            </TableRow>
          </TableBody>

          <TableBody>
            <TableRow>
              <StyledListCell>{`${t('MATERIALS_MANAGE_COMMON.modelAnchorId')}`}</StyledListCell>
              <StyledListCell>{modelAnchorId === null ? '-' : modelAnchorId}</StyledListCell>
              <StyledListCell align="right"></StyledListCell>
            </TableRow>
          </TableBody>

          <TableBody>
            <TableRow>
              <StyledListCell
                colSpan={3}
                sx={{
                  maxWidth: '30px',
                  fontWeight: 400,
                  fontSize: '1rem',
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
    </>
  )
}

export default MaterialSearchTable
