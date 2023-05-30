import { useState } from 'react'
import { ButtonGroup, StyledTooltip } from '@components/ListButtonGroups'
import { useLocales } from '@locales/index'
import CancelIcon from '@mui/icons-material/Cancel'
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined'
import EditIcon from '@mui/icons-material/Edit'
import PageviewIcon from '@mui/icons-material/Pageview'
import { Button, ClickAwayListener, IconButton, Typography } from '@mui/material'
import { CustomBox2 } from '@styles/styles_normal/boxStyle'
import { COMPONENTS_COMMON_CLEAN_RED } from '@theme/colorManager'

interface ListSignButtonGroupsProps {
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
}

const ListSignButtonGroups = ({
  actionSet,
  viewNone = false,
  editNone = false,
  deleteNone = false,
  deleteClick = () => {},
  editClick = () => {},
  viewClick = () => {},
}: ListSignButtonGroupsProps) => {
  const { t } = useLocales()
  const [open, setOpen] = useState(false)

  // if (actionSet === undefined) router.reload()

  const checkDisabledFunc = (none: boolean, action: string): boolean => {
    if (none && actionSet?.includes(action) && !actionSet?.includes('Update')) return false
    if (none) return true
    if (actionSet?.includes(action)) return false
    return true
  }

  const checkEditBtnWithOnlyRead = (show: boolean): string => {
    if (show && !actionSet?.includes('Update')) return 'none'
    if (show) return 'default'

    if (actionSet?.includes('Read') && !actionSet?.includes('Update')) return 'none'

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
                {`${t('CLICK_AWAY_BUTTON.cancelMessage')}`}
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
                {`${t('DIALOG.closeBtn')}`}
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<CancelPresentationOutlinedIcon fontSize="small" />}
                sx={{
                  p: '0 !important',
                }}
                onClick={() => deleteClick()}
              >
                {`${t('COMMON.cancel')}`}
              </Button>
            </CustomBox2>
          }
        >
          <IconButton
            sx={{
              p: '0 !important',
              mr: '10px !important',
              // display: deleteNone ? 'none' : 'default',
              width: 'fit-content',
              color: COMPONENTS_COMMON_CLEAN_RED,
            }}
            disabled={checkDisabledFunc(deleteNone, 'Delete')}
            onClick={() => setOpen(true)}
          >
            <CancelPresentationOutlinedIcon fontSize="small" />
          </IconButton>
        </StyledTooltip>
      </ClickAwayListener>

      <IconButton
        color="warning"
        sx={{
          p: '0 !important',
          mr: '10px !important',
          // display: editNone ? 'none' : 'default',
          width: 'fit-content',
        }}
        disabled={checkDisabledFunc(editNone, 'Update')}
        onClick={() => editClick()}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <IconButton
        aria-label="view"
        color="primary"
        sx={{
          p: '0 !important',
          // display: viewNone ? 'none' : 'default',
        }}
        disabled={checkDisabledFunc(viewNone, 'Read')}
        onClick={() => viewClick()}
      >
        <PageviewIcon />
      </IconButton>
    </ButtonGroup>
  )
}

export default ListSignButtonGroups
