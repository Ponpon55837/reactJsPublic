import { styled } from '@mui/material/styles'
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
  const EditButton = styled(
    Button,
    {},
  )(({}) => ({
    margin: `${m}px`,
    padding: `${p}px`,
    color: `${firstColor} !important`,
    backgroundColor: '#ffffff',
  }))

  const DeleteButton = styled(
    Button,
    {},
  )(({}) => ({
    margin: `${m}px`,
    padding: `${p}px`,
    color: `${secondColor} !important`,
    backgroundColor: '#ffffff',
  }))

  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <EditButton variant="contained" onClick={editClick}>
        {firstName}
      </EditButton>
      <DeleteButton variant="contained" onClick={deleteClick}>
        {secondName}
      </DeleteButton>
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
