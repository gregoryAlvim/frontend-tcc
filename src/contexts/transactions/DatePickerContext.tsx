import { createContext } from 'use-context-selector'
import { Income, Expense } from '../../@types/mockes'

interface DatePickerContextType {
  selectedDate: Date
  handleChangeSelectedDate: (date: any) => void
}

export const DatePickerContext = createContext({} as DatePickerContextType)
