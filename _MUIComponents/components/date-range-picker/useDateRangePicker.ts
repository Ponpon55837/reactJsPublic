import { getYear, isBefore, isSameDay, isSameMonth } from 'date-fns'
import { useState } from 'react'
import { DateRangePickerProps } from '@components/date-range-picker/types'
import { fDate } from '@utils/rangeDateTimePickerFormat'

type ReturnType = DateRangePickerProps

export default function useDateRangePicker(start: Date | null, end: Date | null): ReturnType {
  const [open, setOpen] = useState(false)

  const [endDate, setEndDate] = useState(end)

  const [startDate, setStartDate] = useState(start)

  const isError =
    (startDate && endDate && isBefore(new Date(endDate), new Date(startDate))) || false

  const currentYear = new Date().getFullYear()

  const startDateYear = startDate ? getYear(startDate) : null

  const endDateYear = endDate ? getYear(endDate) : null

  const isCurrentYear = currentYear === startDateYear && currentYear === endDateYear

  const isSameDays =
    startDate && endDate ? isSameDay(new Date(startDate), new Date(endDate)) : false

  const isSameMonths =
    startDate && endDate ? isSameMonth(new Date(startDate), new Date(endDate)) : false

  const standardLabel = `${fDate(startDate)} - ${fDate(endDate)}`

  const getShortLabel = () => {
    if (isCurrentYear) {
      if (isSameMonths) {
        if (isSameDays) {
          return `${fDate(startDate, 'MM/dd')} ~ ${fDate(endDate, 'MM/dd')}`
        }
        return `${fDate(startDate, 'MM/dd')} ~ ${fDate(endDate, 'MM/dd')}`
      }
      return `${fDate(startDate, 'MM/dd')} ~ ${fDate(endDate, 'MM/dd')}`
    }
    return `${fDate(startDate, 'MM/dd')} ~ ${fDate(endDate, 'MM/dd')}`
  }

  const onChangeStartDate = (newValue: Date | null) => {
    setStartDate(newValue)
  }

  const onChangeEndDate = (newValue: Date | null) => {
    if (isError) {
      setEndDate(null)
    }
    setEndDate(newValue)
  }

  const onReset = () => {
    setStartDate(null)
    setEndDate(null)
  }

  return {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    //
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onReset,
    //
    isSelected: !!startDate && !!endDate,
    isError,
    //
    label: standardLabel || '',
    shortLabel: getShortLabel() || '',
    //
    setStartDate,
    setEndDate,
  }
}
