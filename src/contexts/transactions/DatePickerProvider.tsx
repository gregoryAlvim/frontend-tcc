import { ReactNode, useState, useCallback, useEffect } from 'react'
import { DatePickerContext } from './DatePickerContext'

interface DatePickerProps {
  children: ReactNode
}

export function DatePickerProvider({ children }: DatePickerProps) {
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(currentDate)

  function handleChangeSelectedDate(date: any) {
    setSelectedDate(date)
  }

  return (
    <DatePickerContext.Provider
      value={{ selectedDate, handleChangeSelectedDate }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}
