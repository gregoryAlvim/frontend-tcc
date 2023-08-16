import { Income } from '../../@types/mockes'
import { createContext } from 'use-context-selector'

interface IncomeContextType {
  incomes: Income[]
  fetchIncomes: (month: string, year: string) => void
}

export const IncomeContext = createContext({} as IncomeContextType)
