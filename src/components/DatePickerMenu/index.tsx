import * as S from './styles'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useContextSelector } from 'use-context-selector'
import { IncomeContext } from '../../contexts/income/IncomeContext'

interface DatePickerMenuProps {
  handleDateChange: (date: any) => void
  selectedDate: Date
  noBackground?: boolean
}

export function DatePickerMenu({
  selectedDate,
  handleDateChange,
  noBackground = false,
}: DatePickerMenuProps) {
  return (
    <S.MenuTable variant={`${noBackground}`}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        className="custom-datepicker"
      />
    </S.MenuTable>
  )
}
