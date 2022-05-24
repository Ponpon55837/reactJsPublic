import { Button, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import PropTypes from 'prop-types'

interface Props {
  onClick?: () => void
  subLoading?: boolean
  cancelLabel?: string
  successLabel?: string
}

const CustomSubmit = ({
  onClick,
  subLoading = false,
  cancelLabel = '取消',
  successLabel = '送出',
}: Props) => {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="error"
          sx={{ display: subLoading ? 'none' : 'flex' }}
          onClick={onClick}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          sx={{ display: subLoading ? 'none' : 'flex' }}
        >
          {successLabel}
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
  cancelLabel: PropTypes.bool,
  successLabel: PropTypes.bool,
}
