import { makeStyles, styled } from '@mui/styles'
import { ButtonGroup, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PropTypes from 'prop-types'

const CustomBtn = ({
  firstName = <EditIcon fontSize="small" />,
  secondName = <DeleteIcon fontSize="small" />,
  firstColor = '#E3C375',
  secondColor = '#C02F46',
  editClick = () => {},
  deleteClick = () => {},
}) => {
  const useStyles = makeStyles(({ m = 0, p = 1 }) => ({
    edit: {
      margin: `${m}px`,
      padding: `${p}px`,
      color: `${firstColor} !important`,
      backgroundColor: '#ffffff',
    },
    delete: {
      margin: `${m}px`,
      padding: `${p}px`,
      color: `${secondColor} !important`,
      backgroundColor: '#ffffff',
    },
  }))

  const classes = useStyles()

  return (
    <ButtonGroup
      className={classes.btnGroup}
      color="primary"
      aria-label="outlined primary button group"
    >
      <Button variant="contained" className={classes.edit} onClick={editClick}>
        {firstName}
      </Button>
      <Button variant="contained" className={classes.delete} onClick={deleteClick}>
        {secondName}
      </Button>
    </ButtonGroup>
  )
}

export default CustomBtn

CustomBtn.propTypes = {
  firstName: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  secondName: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  firstColor: PropTypes.string,
  secondColor: PropTypes.string,
  editClick: PropTypes.func,
  deleteClick: PropTypes.func,
}
