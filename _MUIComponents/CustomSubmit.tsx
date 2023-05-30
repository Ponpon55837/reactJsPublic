import { useLocales } from '@locales/index'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Stack } from '@mui/material'
import { COMPONENTS_COMMON_DEEP_BLUE } from '@theme/colorManager'

interface Props {
  viewDialog: boolean
  closeFunc: () => void
  deleteFunc?: () => void
  deleteDialog?: boolean
}

const CustomSubmit = ({ viewDialog, closeFunc, deleteFunc, deleteDialog }: Props) => {
  const { t } = useLocales()

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        {deleteDialog && (
          <Button
            variant="outlined"
            color="error"
            type="submit"
            startIcon={<DeleteIcon fontSize="large" />}
            size="small"
            sx={{ height: '36px' }}
            onClick={deleteFunc}
          >
            {`${t('DIALOG.deleteBtn')}`}
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          startIcon={<CloseIcon fontSize="large" />}
          size="small"
          sx={{ height: '36px' }}
          onClick={closeFunc}
        >
          {viewDialog ? `${t('DIALOG.closeBtn')}` : `${t('COMMON.cancel')}`}
        </Button>
        <Button
          form="submitForm"
          variant="contained"
          type="submit"
          size="small"
          startIcon={<CheckIcon fontSize="large" />}
          sx={{
            backgroundColor: COMPONENTS_COMMON_DEEP_BLUE,
            '&:hover': {
              backgroundColor: COMPONENTS_COMMON_DEEP_BLUE,
              opacity: 0.9,
            },
            display: viewDialog ? 'none' : 'flex',
            height: '36px',
          }}
        >
          {`${t('DIALOG.successBtn')}`}
        </Button>
      </Stack>
    </>
  )
}

export default CustomSubmit
