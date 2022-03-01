import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import PropTypes from 'prop-types'

interface Props {
  deleteCheck?: boolean
  editCheck?: boolean
  deleteLabel?: string
  hideLabel?: string
  editLabel?: string
  closeFunc?: () => void
  editFunc?: () => void
  deleteFunc?: () => void
  subLoading?: boolean
}

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
}: Props) => {
  const useStyles = makeStyles(() => ({
    root: { justifyContent: 'flex-end' },
    delete: {
      display: subLoading || !deleteCheck ? 'none' : 'flex',
    },
    edit: { display: subLoading || !editCheck ? 'none' : 'flex' },
    hide: { display: subLoading ? 'none' : 'flex', color: 'text.secondary' },
  }))

  const classes = useStyles()

  return (
    <>
      <Stack direction="row" spacing={1} className={classes.root}>
        <Button variant="outlined" color="error" onClick={deleteFunc} className={classes.delete}>
          {deleteLabel}
        </Button>
        <Button variant="outlined" color="warning" onClick={editFunc} className={classes.edit}>
          {editLabel}
        </Button>
        <Button variant="outlined" onClick={closeFunc} className={classes.hide}>
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
