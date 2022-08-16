import { useState } from 'react'
import { Typography, Button, Tooltip, ClickAwayListener, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import PageviewIcon from '@mui/icons-material/Pageview'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Cancel'
import PropTypes from 'prop-types'
import { CustomBox2 } from '@components/CustomStyle'

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
    border: '1px solid rgba(97, 97, 97, 0.92)',
    backgroundColor: 'rgba(97, 97, 97, 0.92)',
    boxSizing: 'border-box',
  },
}))

const ButtonGroup = ({ children }: any) => {
  return <RootDiv>{children}</RootDiv>
}

interface ListButtonGroupsProps {
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

const ListButtonGroups = ({
  viewNone = false,
  editNone = false,
  deleteNone = false,
  deleteClick = () => {},
  editClick = () => {},
  viewClick = () => {},
}: ListButtonGroupsProps) => {
  const [open, setOpen] = useState(false)

  return (
    <ButtonGroup aria-label="outlined button group">
      <IconButton
        aria-label="delete"
        color="primary"
        sx={{
          p: '0 !important',
          mr: '16px !important',
          display: viewNone ? 'none' : 'default',
        }}
        onClick={() => viewClick()}
      >
        <PageviewIcon />
      </IconButton>

      <IconButton
        color="warning"
        sx={{
          p: '0 !important',
          mr: '20px !important',
          display: editNone ? 'none' : 'default',
          width: 'fit-content',
        }}
        onClick={() => editClick()}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <StyledTooltip
          arrow
          placement="top"
          open={open}
          title={
            <CustomBox2>
              <Typography sx={{ display: 'block', mb: 1 }}>是否刪除此筆資料？</Typography>
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
                取消
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
                刪除
              </Button>
            </CustomBox2>
          }
        >
          <IconButton
            color="error"
            sx={{
              p: '0 !important',
              display: deleteNone ? 'none' : 'default',
              width: 'fit-content',
            }}
            onClick={() => setOpen(true)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </StyledTooltip>
      </ClickAwayListener>
    </ButtonGroup>
  )
}

export default ListButtonGroups

ButtonGroup.propTypes = {
  children: PropTypes.node,
}

ListButtonGroups.propTypes = {
  status: PropTypes.number,
  isCloseDay: PropTypes.bool,
  sign: PropTypes.bool,
  otherCheck: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  viewClick: PropTypes.func,
  viewNone: PropTypes.bool,
  editNone: PropTypes.bool,
  deleteNone: PropTypes.bool,
}
