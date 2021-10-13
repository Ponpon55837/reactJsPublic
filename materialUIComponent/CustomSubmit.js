import {
  Button, Stack
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'

const CustomSubmit = ({ id, onClick, subLoading = false }) => {
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          sx={{ display: subLoading && 'none' }}
        >
          { id.length === 0 ? '新增' : '更新' }
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ display: subLoading && 'none' }}
          onClick={() => onClick()}
        >
          取消
        </Button>
        {subLoading &&
          <LoadingButton loading={subLoading} variant="outlined" color="secondary">
            Submit
          </LoadingButton>
        }
      </Stack>
    </>
  )
}

export default CustomSubmit
