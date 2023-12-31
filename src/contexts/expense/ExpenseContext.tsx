import { Expense } from '../../@types/mockes'
import { createContext } from 'use-context-selector'

interface ExpenseContextType {
  expenses: Expense[]
  fetchExpenses: (month: string, year: string) => void
  createNewExpense: (data: Expense) => void
  updateExpense: (data: Expense) => void
  deleteExpense: (expenseId: string) => void
}

export const ExpenseContext = createContext({} as ExpenseContextType)
