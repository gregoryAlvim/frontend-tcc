import { createContext } from 'use-context-selector'
import { Income, Expense } from '../../@types/mockes'

interface TransactionsContextType {
  transactions: (Income | Expense)[]
  fetchTransactions: (month?: string, year?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)
