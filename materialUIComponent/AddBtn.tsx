import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'

interface Props {
  btnName?: string
  onClick?: () => void
}

const AddBtn = ({ btnName = '新增', onClick = () => {} }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        ml: 1,
        mb: 1,
        p: 0,
        bgcolor: 'background.paper',
      }}
    >
      <Button variant="outlined" onClick={() => onClick()}>
        {btnName}
      </Button>
    </Box>
  )
}

export default AddBtn

AddBtn.propTypes = {
  btnName: PropTypes.string,
  onClick: PropTypes.func,
}
