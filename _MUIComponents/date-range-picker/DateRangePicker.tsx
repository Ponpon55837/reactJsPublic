import { DateRangePickerProps } from '@components/date-range-picker/types'
import useMiddleware from '@hooks/use-middleware'
import useResponsive from '@hooks/useResponsive'
import { useLocales } from '@locales/index'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Paper,
  Stack,
  TextField,
} from '@mui/material'
import { CalendarPicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { HandlePickerLanguage } from '@utils/utilsFunction'

export default function DateRangePicker({
  title = '選擇日期範圍',
  variant = 'input',
  //
  startDate,
  endDate,
  //
  onChangeStartDate,
  onChangeEndDate,
  //
  open,
  onClose,
  //
  isError,
  //
  disableFuture = true,
}: DateRangePickerProps) {
  const { t, currentLang } = useLocales()
  const isDesktop = useResponsive('up', 'md')
  const { defaultTheme } = useMiddleware()
  const isCalendarView = variant === 'calendar'

  const closeFunc = () => {
    if (isError === true) return
    onClose()
  }

  return (
    <Dialog
      fullWidth
      maxWidth={isCalendarView ? false : 'xs'}
      open={open}
      onClose={() => closeFunc()}
      PaperProps={{
        sx: {
          ...(isCalendarView && {
            maxWidth: 720,
          }),
        },
      }}
    >
      <DialogTitle
        sx={{ pb: 2, textAlign: 'center', backgroundColor: defaultTheme, color: '#DDDDDD' }}
      >
        {title}
      </DialogTitle>

      <DialogContent
        sx={{
          ...(isCalendarView &&
            isDesktop && {
              overflow: 'unset',
            }),
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={HandlePickerLanguage(currentLang.value)}
        >
          <Stack
            spacing={isCalendarView ? 3 : 2}
            direction={isCalendarView && isDesktop ? 'row' : 'column'}
            justifyContent="center"
            sx={{
              pt: 1,
              '& .MuiCalendarPicker-root': {
                ...(!isDesktop && {
                  width: 'auto',
                }),
              },
            }}
          >
            {isCalendarView ? (
              <>
                <Paper
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    borderColor: 'divider',
                    borderStyle: 'dashed',
                    textAlign: 'center',
                    pt: 2,
                    fontWeight: 600,
                  }}
                >
                  <Box>{`${t('DATE_RANGE_PICKER.startDate')}`}</Box>
                  <CalendarPicker
                    date={startDate}
                    onChange={onChangeStartDate}
                    disableFuture={disableFuture}
                  />
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    borderColor: 'divider',
                    borderStyle: 'dashed',
                    textAlign: 'center',
                    pt: 2,
                    fontWeight: 600,
                  }}
                >
                  <Box>{`${t('DATE_RANGE_PICKER.endDate')}`}</Box>
                  <CalendarPicker
                    date={endDate}
                    onChange={onChangeEndDate}
                    disableFuture={disableFuture}
                  />
                </Paper>
              </>
            ) : (
              <>
                <DatePicker
                  label={`${t('DATE_RANGE_PICKER.startDate')}`}
                  value={startDate}
                  onChange={onChangeStartDate}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DatePicker
                  label={`${t('DATE_RANGE_PICKER.endDate')}`}
                  value={endDate}
                  onChange={onChangeEndDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </>
            )}
          </Stack>
        </LocalizationProvider>

        {isError && (
          <FormHelperText error sx={{ px: 2 }}>
            {`${t('DATE_RANGE_PICKER.dateLimit')}`}
          </FormHelperText>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="outlined" disabled={isError} color="inherit" onClick={onClose}>
          {`${t('DIALOG.closeBtn')}`}
        </Button>

        {/* <Button disabled={isError} variant="contained" onClick={onClose}>
          Apply
        </Button> */}
      </DialogActions>
    </Dialog>
  )
}
