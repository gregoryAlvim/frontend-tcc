import * as S from './styles'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useContextSelector } from 'use-context-selector'
import { IncomeContext } from '../../contexts/income/IncomeContext'

interface DatePickerMenuProps {
  handleDateChange: (date: any) => void
  selectedDate: Date
}

export function DatePickerMenu({
  selectedDate,
  handleDateChange,
}: DatePickerMenuProps) {
  return (
    <S.MenuTable>
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
