import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import PropTypes from 'prop-types'

interface Props {
  onClick?: () => void
  subLoading?: boolean
}

const CustomStack = styled(Stack)(() => ({
  justifyContent: 'flex-end',
}))

const CustomSubmit = ({ onClick = () => {}, subLoading = false }: Props) => {
  return (
    <>
      <CustomStack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="error"
          onClick={onClick}
          sx={{ display: subLoading ? 'none' : 'flex' }}
        >
          取消
        </Button>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          sx={{ display: subLoading ? 'none' : 'flex' }}
        >
          送出
        </Button>
        {subLoading && (
          <LoadingButton loading={subLoading} variant="outlined" color="secondary">
            Submit
          </LoadingButton>
        )}
      </CustomStack>
    </>
  )
}

export default CustomSubmit

CustomSubmit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  subLoading: PropTypes.bool,
}
