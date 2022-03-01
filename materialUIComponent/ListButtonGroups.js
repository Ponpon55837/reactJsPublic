import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import PropTypes from 'prop-types'
import { CustomBox2 } from '@components/CustomStyle'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-table',
    flexDirection: 'row',
    alignItems: 'center',
    '& button': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
    },
  },
  tooltip: {
    background: 'rgba(97, 97, 97, 0.92)',
    color: '#FFFFFF',
    border: '1px solid rgba(97, 97, 97, 0.92)',
    borderRadius: '5px',
  },
  arrow: {
    fontSize: 18,
    width: 17,
    '&::before': {
      border: '1px solid rgba(97, 97, 97, 0.92)',
      backgroundColor: 'rgba(97, 97, 97, 0.92)',
      boxSizing: 'border-box',
    },
  },
}))

const ButtonGroup = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

const ListButtonGroups = ({
  status = 2,
  isCloseDay = false,
  sign = false,
  otherCheck = true,
  copy = false,
  attendance = false,
  deleteClick = () => {},
  editClick = () => {},
  copyClick = () => {},
  viewClick = () => {},
}) => {
  const classes = useStyles()
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
          display: (status === 3 || !otherCheck) && 'none',
        }}
        onClick={() => viewClick()}
      >
        檢視
      </Button>

      <Button
        size="small"
        variant="outlined"
        color="warning"
        startIcon={<ModeEditOutlinedIcon size="small" />}
        sx={{
          p: '0 !important',
          display: (status !== 2 || attendance || isCloseDay) && 'none',
        }}
        onClick={() => editClick()}
      >
        {sign ? '簽核' : '編輯'}
      </Button>

      <Button
        size="small"
        variant="outlined"
        color="success"
        startIcon={<ContentCopyIcon size="small" />}
        sx={{
          p: '0 !important',
          display: !copy && 'none',
        }}
        onClick={() => copyClick()}
      >
        複製
      </Button>

      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Tooltip
          classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
          arrow
          placement="top"
          open={open}
          title={
            <CustomBox2>
              <Typography sx={{ display: 'block', mb: 1 }}>
                是否{attendance ? '取消' : '刪除'}此筆資料？
              </Typography>
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
                {attendance ? '否' : '取消'}
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
                {attendance ? '是' : '刪除'}
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
              display: (status === 0 || status === 3 || isCloseDay || sign) && 'none',
            }}
            onClick={() => setOpen(true)}
          >
            {attendance ? '取消' : '刪除'}
          </Button>
        </Tooltip>
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
  copy: PropTypes.bool,
  attendance: PropTypes.bool,
  otherCheck: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  copyClick: PropTypes.func,
  viewClick: PropTypes.func,
}
