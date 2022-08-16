import Button from '@mui/material/Button'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import PropTypes from 'prop-types'

interface Props {
  btnName?: string
  onClick?: () => void
}

const AddBtn = ({ btnName = '新增一筆', onClick = () => {} }: Props) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={() => onClick()}
      sx={{ display: 'inline-flex', mr: 1, px: 1, mb: 1, height: '2.3rem' }}
    >
      <AddCircleSharpIcon sx={{ mr: 1 }} />
      {btnName}
    </Button>
  )
}

export default AddBtn

AddBtn.propTypes = {
  btnName: PropTypes.string,
  onClick: PropTypes.func,
}
