import { Button, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import PropTypes from 'prop-types'
import useMiddleWare from '@hooks/use-middleware'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
  subLoading?: boolean
  successLabel?: string
}

const CustomSubmit = ({ subLoading = false, successLabel = '送出' }: Props) => {
  const { extendState, dialogSizeState } = useMiddleWare()
  const matches = useMediaQuery('(max-width:700px)', { noSsr: true })

  const getSubBtnSize = () => {
    if (extendState && matches) return '100%'
    if (extendState) return '50%'

    switch (dialogSizeState) {
      case 'sm':
        return '100%'
      case 'md':
        return '80%'
      case 'lg':
        return '60%'
    }
  }

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            backgroundColor: '#1b2c37',
            '&:hover': {
              backgroundColor: '#32404F',
            },
            display: subLoading ? 'none' : 'flex',
            width: getSubBtnSize(),
            height: '3rem',
            fontSize: '1.2rem',
          }}
        >
          {successLabel}
        </Button>
        {subLoading && (
          <LoadingButton
            loading={subLoading}
            variant="outlined"
            color="secondary"
            style={{ width: getSubBtnSize(), height: '3rem', fontSize: '1.2rem' }}
          >
            Submit
          </LoadingButton>
        )}
      </Stack>
    </>
  )
}

export default CustomSubmit

CustomSubmit.propTypes = {
  subLoading: PropTypes.bool,
  successLabel: PropTypes.bool,
}
