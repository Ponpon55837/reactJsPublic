import { useLocales } from '@locales/index'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { Button } from '@mui/material'

const DateRangeButton = ({
  onClick,
  shortLabel,
  title = '點擊切換日期範圍',
}: {
  onClick?: () => void
  shortLabel?: string
  title?: string
}) => {
  const { t } = useLocales()

  return (
    <Button
      variant="contained"
      color="info"
      onClick={onClick}
      title={title}
      sx={{
        display: 'inline-flex',
        height: '40px',
      }}
      startIcon={<DateRangeIcon />}
    >
      {`${t('DATE_RANGE_PICKER.pickBtn')}`}： {shortLabel}
    </Button>
  )
}

export default DateRangeButton
