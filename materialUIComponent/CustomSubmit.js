import { Button, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import PropTypes from 'prop-types'

const CustomSubmit = ({ onClick, subLoading = false }) => {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="error"
          sx={{ display: subLoading && 'none' }}
          onClick={() => onClick()}
        >
          取消
        </Button>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          sx={{ display: subLoading && 'none' }}
        >
          送出
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

export default CustomSubmit

CustomSubmit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  subLoading: PropTypes.bool,
}
