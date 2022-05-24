import { useState } from 'react'
import { Typography, Button, Tooltip, ClickAwayListener } from '@mui/material'
import { styled } from '@mui/material/styles'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
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

const ButtonGroup = ({ children }) => {
  return <RootDiv>{children}</RootDiv>
}

const ListButtonGroups = ({
  status = 2,
  isCloseDay = false,
  sign = false,
  otherCheck = true,
  viewNone = false,
  editNone = false,
  deleteNone = false,
  viewLabel = '檢視',
  auditLabel = '編輯',
  deleteLabel = '刪除',
  deleteClick = () => {},
  editClick = () => {},
  viewClick = () => {},
}) => {
  const [open, setOpen] = useState(false)

  return (
    <ButtonGroup variant="text" color="inherit" aria-label="outlined button group">
      <Button
        size="small"
        variant="outlined"
        color="primary"
        startIcon={<PageviewOutlinedIcon size="small" />}
        sx={{
          p: '0 !important',
          display: (status === 3 || isCloseDay || !otherCheck || viewNone) && 'none',
        }}
        onClick={() => viewClick()}
      >
        {viewLabel}
      </Button>

      <Button
        size="small"
        variant="outlined"
        color="warning"
        startIcon={<ModeEditOutlinedIcon size="small" />}
        sx={{
          p: '0 !important',
          display: (status !== 2 || isCloseDay || editNone) && 'none',
        }}
        onClick={() => editClick()}
      >
        {auditLabel}
      </Button>

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
                startIcon={<CancelIcon size="small" />}
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
                startIcon={<DeleteOutlineOutlinedIcon size="small" />}
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
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon size="small" />}
            sx={{
              p: '0 !important',
              display: (status === 0 || status === 3 || isCloseDay || sign || deleteNone) && 'none',
            }}
            onClick={() => setOpen(true)}
          >
            {deleteLabel}
          </Button>
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
  viewLabel: PropTypes.string,
  auditLabel: PropTypes.string,
  deleteLabel: PropTypes.string,
  otherCheck: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  viewClick: PropTypes.func,
  viewNone: PropTypes.bool,
  editNone: PropTypes.bool,
  deleteNone: PropTypes.bool,
}
