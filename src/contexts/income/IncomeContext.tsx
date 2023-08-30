import { Income } from '../../@types/mockes'
import { createContext } from 'use-context-selector'

interface IncomeContextType {
  incomes: Income[]
  fetchIncomes: (month: string, year: string) => void
  createNewIncome: (data: Income) => void
  updateIncome: (data: Income) => void
  deleteIncome: (incomeId: string) => void
}

export const IncomeContext = createContext({} as IncomeContextType)
