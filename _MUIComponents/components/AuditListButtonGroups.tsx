import { useState } from 'react'
import { useLocales } from '@locales/index'
import CancelIcon from '@mui/icons-material/Cancel'
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

interface ListButtonGroupsProps {
  actionSet: string[]
  deleteClick?: () => void
  editClick?: () => void
  viewClick?: () => void
  status?: number
  isCloseDay?: boolean
  sign?: boolean
  otherCheck?: boolean
  viewNone?: boolean
  editNone?: boolean
  deleteNone?: boolean
  viewShow?: boolean
  editShow?: boolean
  deleteShow?: boolean
  InputEditIcon?: React.ReactElement<any, any>
}

const ListButtonGroups = ({
  actionSet,
  viewNone = false,
  editNone = false,
  deleteNone = false,
  viewShow = true,
  editShow = true,
  deleteShow = true,
  deleteClick = () => {},
  editClick = () => {},
  viewClick = () => {},
  InputEditIcon = <EditIcon fontSize="small" />,
}: ListButtonGroupsProps) => {
  const { t } = useLocales()
  const [open, setOpen] = useState(false)

  const checkDisabledFunc = (none: boolean, action: string): boolean => {
    if (none && actionSet?.includes(action) && !actionSet?.includes('Audit')) return false
    if (none) return true
    if (actionSet?.includes(action)) return false
    return true
  }

  const checkEditBtnWithOnlyRead = (show: boolean): string => {
    if (show && !actionSet?.includes('Audit')) return 'none'
    if (show) return 'default'

    if (actionSet?.includes('Read') && !actionSet?.includes('Audit')) return 'none'

    return 'default'
  }

  const checkViewBtnWithOnlyRead = (show: boolean): string => {
    if (show) return 'default'

    if (actionSet?.includes('Read') && !actionSet?.includes('Update')) return 'default'

    return 'none'
  }

  return (
    <ButtonGroup aria-label="outlined button group">
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
                {`${t('CLICK_AWAY_BUTTON.successLabel')}`}
              </Button>
            </CustomBox2>
          }
        >
          <StyledIconButton
            color="error"
            sx={{ display: !deleteShow ? 'none' : 'default' }}
            disabled={checkDisabledFunc(deleteNone, 'Delete')}
            onClick={() => setOpen(true)}
          >
            <DeleteIcon fontSize="small" />
          </StyledIconButton>
        </StyledTooltip>
      </ClickAwayListener>

      <StyledIconButton
        color="warning"
        sx={{ display: checkEditBtnWithOnlyRead(editShow) }}
        disabled={checkDisabledFunc(editNone, 'Audit')}
        onClick={() => editClick()}
      >
        {InputEditIcon}
      </StyledIconButton>

      <StyledIconButton
        aria-label="view"
        color="primary"
        sx={{ display: checkViewBtnWithOnlyRead(viewShow), marginRight: '0px !important' }}
        disabled={checkDisabledFunc(viewNone, 'Read')}
        onClick={() => viewClick()}
      >
        <PageviewIcon />
      </StyledIconButton>
    </ButtonGroup>
  )
}

export default ListButtonGroups
export { RootDiv, StyledTooltip, ButtonGroup }
