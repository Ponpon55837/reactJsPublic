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
  status = 2,
  isCloseDay = false,
  sign = false,
  otherCheck = true,
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
      <Button
        color="primary"
        startIcon={<PageviewOutlinedIcon fontSize="small" />}
        sx={{
          p: '0 !important',
          display: status === 3 || isCloseDay || !otherCheck || viewNone ? 'none' : 'default',
        }}
        onClick={() => viewClick()}
      />

      <Button
        color="warning"
        startIcon={<ModeEditOutlinedIcon fontSize="small" />}
        sx={{
          p: '0 !important',
          display: status !== 2 || isCloseDay || editNone ? 'none' : 'default',
        }}
        onClick={() => editClick()}
      />

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
                startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
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
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
            sx={{
              p: '0 !important',
              display:
                status === 0 || status === 3 || isCloseDay || sign || deleteNone
                  ? 'none'
                  : 'default',
            }}
            onClick={() => setOpen(true)}
          />
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
