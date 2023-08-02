import { useState } from 'react'
import { useLocales } from '@locales/index'
import CancelIcon from '@mui/icons-material/Cancel'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PageviewIcon from '@mui/icons-material/Pageview'
import { Button, ClickAwayListener, IconButton, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CustomBox2 } from '@styles/styles_normal/boxStyle'
import { COMPONENTS_COMMON_DEEP_GREY } from '@theme/colorManager'

const RootDiv = styled('div')(({ theme }) => ({
  display: 'inline-table',
  flexDirection: 'row',
  alignItems: 'center',
  '& button': {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}))

const StyledTooltip = styled(Tooltip)(() => ({
  width: 17,
  '&::before': {
    border: `1px solid ${COMPONENTS_COMMON_DEEP_GREY}`,
    backgroundColor: COMPONENTS_COMMON_DEEP_GREY,
    boxSizing: 'border-box',
  },
}))

const StyledIconButton = styled(IconButton)(() => ({
  padding: '0 !important',
  marginRight: '10px !important',
  width: 'fit-content',
  '&[disabled]': {
    cursor: 'not-allowed', // and custom cursor can be defined without :hover state
    pointerEvents: 'all',
  },
}))

const ButtonGroup = ({ children }: any) => {
  return <RootDiv>{children}</RootDiv>
}

const checkDisabledCopyFunc = (none: boolean, action: string, actionSet: string[]): boolean => {
  if (none && actionSet?.includes(action)) return false
  if (none) return true
  if (actionSet?.includes(action)) return false
  return true
}

const checkDisabledFunc = (none: boolean, action: string, actionSet: string[]): boolean => {
  if (none && actionSet?.includes(action) && !actionSet?.includes('Update')) return false
  if (none) return true
  if (actionSet?.includes(action)) return false
  return true
}

const checkEditBtnWithOnlyRead = (show: boolean, actionSet: string[]): string => {
  if (show && !actionSet?.includes('Update')) return 'none'
  if (show) return 'default'

  if (actionSet?.includes('Read') && !actionSet?.includes('Update')) return 'none'

  return 'default'
}

const checkViewBtnWithOnlyRead = (show: boolean, actionSet: string[]): string => {
  if (show) return 'default'

  if (actionSet?.includes('Read') && !actionSet?.includes('Update')) return 'default'

  return 'none'
}

const checkCopyBtnWithOnlyRead = (show: boolean, actionSet: string[]): string => {
  if (!actionSet?.includes('Create')) return 'none'

  if (show) return 'default'

  return 'none'
}

// 刪除按鈕
const ListDeleteBtn = ({
  deleteClick = () => {},
  deleteShow = true,
  deleteNone = false,
  actionSet,
}: {
  deleteClick?: () => void
  deleteShow?: boolean
  deleteNone?: boolean
  actionSet: string[]
}) => {
  const [open, setOpen] = useState(false)
  const { t } = useLocales()

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <StyledTooltip
        arrow
        placement="top"
        open={open}
        title={
          <CustomBox2>
            <Typography sx={{ display: 'block', mb: 1 }}>
              {`${t('CLICK_AWAY_BUTTON.checkMessage')}`}
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<CancelIcon fontSize="small" />}
              sx={{
                p: '0 !important',
                mr: 2,
              }}
              onClick={() => setOpen(false)}
            >
              {`${t('COMMON.no')}`}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<DeleteIcon fontSize="small" />}
              sx={{
                p: '0 !important',
              }}
              onClick={() => deleteClick()}
            >
              {`${t('COMMON.yes')}`}
            </Button>
          </CustomBox2>
        }
      >
        <StyledIconButton
          aria-label="delete"
          color="error"
          sx={{ display: !deleteShow ? 'none' : 'default' }}
          disabled={checkDisabledFunc(deleteNone, 'Delete', actionSet)}
          onClick={() => setOpen(true)}
        >
          <DeleteIcon fontSize="small" />
        </StyledIconButton>
      </StyledTooltip>
    </ClickAwayListener>
  )
}

// 編輯按鈕
const ListEditBtn = ({
  editClick = () => {},
  editShow = true,
  editNone = false,
  actionSet,
  InputEditIcon = <EditIcon fontSize="small" />,
}: {
  editClick?: () => void
  editShow?: boolean
  editNone?: boolean
  actionSet: string[]
  InputEditIcon?: React.ReactElement<any, any>
}) => {
  return (
    <StyledIconButton
      aria-label="edit"
      title="Edit"
      color="warning"
      sx={{ display: checkEditBtnWithOnlyRead(editShow, actionSet) }}
      disabled={checkDisabledFunc(editNone, 'Update', actionSet)}
      onClick={() => editClick()}
    >
      {InputEditIcon}
    </StyledIconButton>
  )
}

// 複製按鈕
const ListCopyBtn = ({
  copyClick = () => {},
  copyShow = false,
  copyNone = false,
  actionSet,
}: {
  copyClick?: () => void
  copyShow?: boolean
  copyNone?: boolean
  actionSet: string[]
}) => {
  return (
    <StyledIconButton
      aria-label="copy"
      title="Copy"
      color="info"
      sx={{ display: checkCopyBtnWithOnlyRead(copyShow, actionSet) }}
      disabled={checkDisabledCopyFunc(copyNone, 'Create', actionSet)}
      onClick={() => copyClick()}
    >
      <ContentCopyIcon fontSize="small" />
    </StyledIconButton>
  )
}

// 檢視按鈕
const ListViewBtn = ({
  viewClick = () => {},
  viewShow = true,
  viewNone = false,
  actionSet,
}: {
  viewClick?: () => void
  viewShow?: boolean
  viewNone?: boolean
  actionSet: string[]
}) => {
  return (
    <StyledIconButton
      title="View"
      aria-label="view"
      color="primary"
      sx={{
        display: checkViewBtnWithOnlyRead(viewShow, actionSet),
        marginRight: '0px !important',
      }}
      disabled={checkDisabledFunc(viewNone, 'Read', actionSet)}
      onClick={() => viewClick()}
    >
      <PageviewIcon />
    </StyledIconButton>
  )
}

interface ListButtonGroupsProps {
  actionSet: string[]
  deleteClick?: () => void
  editClick?: () => void
  viewClick?: () => void
  copyClick?: () => void
  status?: number
  isCloseDay?: boolean
  sign?: boolean
  otherCheck?: boolean
  viewNone?: boolean
  editNone?: boolean
  deleteNone?: boolean
  copyNone?: boolean
  viewShow?: boolean
  editShow?: boolean
  deleteShow?: boolean
  copyShow?: boolean
  InputEditIcon?: React.ReactElement<any, any>
}

const ListButtonGroups = ({
  actionSet,
  viewNone = false,
  editNone = false,
  deleteNone = false,
  copyNone = false,
  viewShow = true,
  editShow = true,
  deleteShow = true,
  copyShow = false,
  deleteClick = () => {},
  editClick = () => {},
  viewClick = () => {},
  copyClick = () => {},
  InputEditIcon = <EditIcon fontSize="small" />,
}: ListButtonGroupsProps) => {
  return (
    <ButtonGroup aria-label="List Button Group">
      <ListDeleteBtn
        deleteClick={deleteClick}
        deleteShow={deleteShow}
        deleteNone={deleteNone}
        actionSet={actionSet}
      />

      <ListEditBtn
        editClick={editClick}
        editShow={editShow}
        editNone={editNone}
        actionSet={actionSet}
        InputEditIcon={InputEditIcon}
      />

      <ListCopyBtn
        copyClick={copyClick}
        copyShow={copyShow}
        copyNone={copyNone}
        actionSet={actionSet}
      />

      <ListViewBtn
        viewClick={viewClick}
        viewShow={viewShow}
        viewNone={viewNone}
        actionSet={actionSet}
      />
    </ButtonGroup>
  )
}

export default ListButtonGroups
export { RootDiv, StyledTooltip, ButtonGroup, ListDeleteBtn, ListEditBtn, ListCopyBtn, ListViewBtn }
