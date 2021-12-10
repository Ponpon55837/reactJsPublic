import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PropTypes from 'prop-types'

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
  deleteClick = () => {},
  editClick = () => {},
  viewClick = () => {},
}) => {
  return (
    <ButtonGroup variant="text" color="inherit" aria-label="outlined button group">
      <Button
        size="small"
        variant="outlined"
        color="primary"
        startIcon={<PageviewOutlinedIcon size="small" />}
        sx={{
          p: '0 !important',
          display: (status === 3 || isCloseDay || !otherCheck) && 'none',
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
          display: (status !== 2 || isCloseDay) && 'none',
        }}
        onClick={() => editClick()}
      >
        {sign ? '簽核' : '編輯'}
      </Button>

      <Button
        size="small"
        variant="outlined"
        color="error"
        startIcon={<DeleteOutlineOutlinedIcon size="small" />}
        sx={{
          p: '0 !important',
          display: (status === 0 || status === 3 || isCloseDay || sign) && 'none',
        }}
        onClick={() => deleteClick()}
      >
        刪除
      </Button>
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
}
