import { Button, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import PropTypes from 'prop-types'

const CustomViewBtn = ({
  deleteCheck = true,
  editCheck = true,
  deleteLabel = '刪除',
  hideLabel = '關閉',
  editLabel = '編輯',
  closeFunc = () => {},
  editFunc = () => {},
  deleteFunc = () => {},
  subLoading = false,
}) => {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteFunc()}
          sx={{ display: (subLoading || !deleteCheck) && 'none' }}
        >
          {deleteLabel}
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => editFunc()}
          sx={{ display: (subLoading || !editCheck) && 'none' }}
        >
          {editLabel}
        </Button>
        <Button
          variant="outlined"
          sx={{ display: subLoading && 'none', color: 'text.secondary' }}
          onClick={() => closeFunc()}
        >
          {hideLabel}
        </Button>
        {subLoading && (
          <LoadingButton loading={subLoading} variant="outlined" color="secondary">
            Submit
          </LoadingButton>
        )}
      </Stack>
    </>
  )
}

export default CustomViewBtn

CustomViewBtn.propTypes = {
  deleteCheck: PropTypes.bool,
  editCheck: PropTypes.bool,
  deleteLabel: PropTypes.string,
  hideLabel: PropTypes.string,
  editLabel: PropTypes.string,
  closeFunc: PropTypes.func,
  editFunc: PropTypes.func,
  deleteFunc: PropTypes.func,
  subLoading: PropTypes.bool,
}
