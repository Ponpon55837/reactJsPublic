import React, { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { useImmer } from 'use-immer'
import { useLocales } from '@locales/index'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledForm, StyledTextField } from '@styles/styles_normal/Web/commonStyle'
import {
  COMMON_PURE_WHITE,
  WEB_COMMON_GREY,
  WEB_COMMON_WHITE_GREY,
  WEB_TASK_DIALOG_BTN,
  WEB_TASK_DIALOG_CONTENT_BG,
  WEB_TASK_DIALOG_TITLE_BG,
} from '@theme/colorManager'

export const StyledDetailCell = styled(TableCell)(() => ({
  color: COMMON_PURE_WHITE,
  borderCollapse: 'collapse',
  border: 'none',
  padding: 0,
  height: '29px',
  fontSize: '0.875rem',
  fontWeight: 300,
  letterSpacing: '0.05em',
  background: 'none',
}))

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  color: COMMON_PURE_WHITE,
  textAlign: 'left',
  padding: '15px 20px',
  backdropFilter: 'blur(5px)',
  background: WEB_TASK_DIALOG_TITLE_BG,
}))

export const StyledDialogContent = styled(DialogContent)(() => ({
  background: WEB_TASK_DIALOG_CONTENT_BG,
  color: WEB_COMMON_WHITE_GREY,
  padding: '20px',
}))

export const StyledTypography = styled(Typography)(() => ({
  color: WEB_COMMON_WHITE_GREY,
  fontSize: '0.875rem',
  letterSpacing: '0.05rem',
}))

export const StyledDialogBtn = styled(Button)(() => ({
  border: `1px solid ${WEB_COMMON_GREY}`,
  borderRadius: '7px',
  width: '92px',
  padding: '8px 0',
  fontSize: '16px',
  color: COMMON_PURE_WHITE,
}))

const Transition = forwardRef(function Transition(props: any, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

interface DailyTaskReportDialogProps {
  openDialog?: boolean
  locationZoneId?: string | number
  locationSiteName?: string
  locationLevelName?: string
  locationZoneName?: string
  successFunc?: (note: string) => void
  cancelFunc?: () => void
}

const DailyTaskReportDialog: React.FC<DailyTaskReportDialogProps> = ({
  openDialog = false,
  locationZoneId,
  locationSiteName,
  locationLevelName,
  locationZoneName,
  successFunc = (string) => {},
  cancelFunc = () => {},
}) => {
  const [notesCount, setNotesCount] = React.useState(0)
  const { t } = useLocales()
  const [state, produce] = useImmer({
    notes: '',
  })

  const { notes } = state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...state },
  })

  const onSubmit = async () => {
    successFunc(notes)
    setNotesCount(0)
    produce((draft) => {
      draft.notes = ''
    })
  }

  return (
    <Dialog
      fullWidth={true}
      onClose={cancelFunc}
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      sx={{ zIndex: '2000', maxWidth: '360px', margin: '0 auto' }}
    >
      <StyledDialogTitle>{`${t('INSPECTION.inspecDialogTitle')}`}</StyledDialogTitle>
      <StyledDialogContent dividers>
        <Table size="small" sx={{ mb: 3 }}>
          <TableBody>
            <TableRow>
              <StyledDetailCell sx={{ width: '40%' }}>
                {`${t('GUARD_INSPECTION_VIEW.locationNumber')}`}
              </StyledDetailCell>
              <StyledDetailCell sx={{ width: '60%' }}>{locationZoneId}</StyledDetailCell>
            </TableRow>
          </TableBody>

          <TableBody>
            <TableRow>
              <StyledDetailCell sx={{ width: '40%' }}>
                {`${t('COMMON.areaLocation')}`}
              </StyledDetailCell>
              <StyledDetailCell sx={{ width: '60%' }}>
                {locationSiteName} - {locationLevelName} - {locationZoneName}
              </StyledDetailCell>
            </TableRow>
          </TableBody>
        </Table>

        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container>
            <Grid item xs={8}>
              <StyledTypography variant="caption">{`${t('INSPECTION.note')}`}</StyledTypography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'right' }}>
              <StyledTypography variant="caption">{notesCount}/200</StyledTypography>
            </Grid>
          </Grid>

          <StyledTextField
            fullWidth
            size="small"
            margin="dense"
            variant="outlined"
            multiline={true}
            value={notes}
            rows={5}
            inputProps={{ style: { color: WEB_COMMON_WHITE_GREY, fontSize: '18px' } }}
            {...register('notes', {
              onChange: (e) => {
                produce((draft) => {
                  draft.notes = e.target.value
                })
                setNotesCount(e.target.value.length)
              },
              maxLength: {
                value: 200,
                message: `${t('COMMON.maxLengthMessage', { count: 200 })}`,
              },
            })}
            InputLabelProps={{ shrink: true }}
            error={errors?.notes?.type === 'required' || errors?.notes?.type === 'maxLength'}
            helperText={errors?.notes?.type && errors?.notes?.message}
          />

          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <StyledDialogBtn
              sx={{ background: WEB_TASK_DIALOG_BTN, mr: 3 }}
              onClick={() => {
                setNotesCount(0)
                produce((draft) => {
                  draft.notes = ''
                })
                cancelFunc()
              }}
            >
              {`${t('COMMON.cancel')}`}
            </StyledDialogBtn>

            <StyledDialogBtn type="submit" sx={{ background: WEB_TASK_DIALOG_BTN }}>
              {`${t('DIALOG_WEB.finishDaily')}`}
            </StyledDialogBtn>
          </Box>
        </StyledForm>
      </StyledDialogContent>
    </Dialog>
  )
}

export default DailyTaskReportDialog
