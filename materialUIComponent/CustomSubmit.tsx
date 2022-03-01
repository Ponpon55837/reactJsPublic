import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import PropTypes from 'prop-types'

interface Props {
  onClick?: () => void
  subLoading?: boolean
}

const CustomSubmit = ({ onClick = () => {}, subLoading = false }: Props) => {
  const useStyles = makeStyles(() => ({
    stack: {
      justifyContent: 'flex-end',
    },
    baseBtn: {
      display: subLoading ? 'none' : 'flex',
    },
  }))

  const classes = useStyles()

  return (
    <>
      <Stack direction="row" spacing={1} className={classes.stack}>
        <Button variant="outlined" color="error" className={classes.baseBtn} onClick={onClick}>
          取消
        </Button>
        <Button variant="outlined" color="primary" type="submit" className={classes.baseBtn}>
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
