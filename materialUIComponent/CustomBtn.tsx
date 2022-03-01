import { makeStyles } from '@mui/styles'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PropTypes from 'prop-types'

interface Props {
  firstName?: string | React.ReactElement
  secondName?: string | React.ReactElement
  firstColor?: string
  secondColor?: string
  editClick?: () => void
  deleteClick?: () => void
  m?: number | string
  p?: number | string
}

const CustomBtn = ({
  firstName = <EditIcon fontSize="small" />,
  secondName = <DeleteIcon fontSize="small" />,
  firstColor = '#E3C375',
  secondColor = '#C02F46',
  editClick = () => {},
  deleteClick = () => {},
  m = 0,
  p = 1,
}: Props) => {
  const useStyles = makeStyles(() => ({
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
    <ButtonGroup color="primary" aria-label="outlined primary button group">
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
  m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
