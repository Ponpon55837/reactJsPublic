import {
  Button, Stack
} from '@mui/material'

const CustomSubmit = ({ id, onClick }) => {
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
        >
          { id.length === 0 ? '新增' : '更新' }
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onClick()}
        >
          取消
        </Button>
      </Stack>
    </>
  )
}

export default CustomSubmit
