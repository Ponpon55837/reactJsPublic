import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import Button from '@mui/material/Button'

interface Props {
  actionSet: string[]
  btnName?: string
  onClick?: () => void
  style?: any
}

const AddBtn = ({ actionSet, btnName = '新增一筆', onClick = () => {}, style }: Props) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={() => onClick()}
      sx={{ display: 'inline-flex', mr: 1, px: 1, height: '40px', mb: { xs: 1, sm: 0 } }}
      style={style}
      startIcon={<AddCircleSharpIcon />}
      disabled={!actionSet?.includes('Create')}
    >
      {btnName}
    </Button>
  )
}

export default AddBtn
