import { createContext } from 'use-context-selector'
import { Income, Expense } from '../../@types/mockes'

export interface CreateTransactionInput {
  price: number
  category: string
  description: string
  type: 'income' | 'expense'
}

interface TransactionsContextType {
  transactions: (Income | Expense)[]
  fetchTransactions: (month?: string, year?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)
