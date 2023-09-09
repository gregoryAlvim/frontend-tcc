import { TransactionsContext } from './TransactionsContext'
import { apiPrivate } from '../../lib/axios'
import { Income, Expense } from '../../@types/mockes'
import { ReactNode, useState, useCallback, useEffect } from 'react'

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<(Income | Expense)[]>([])

  const fetchTransactions = useCallback(
    async (month?: string, year?: string) => {
      const responseIncome = await apiPrivate.get('incomes/get-all', {
        params: {
          month,
          year,
        },
      })

      const responseExpense = await apiPrivate.get('expenses/get-all', {
        params: {
          month,
          year,
        },
      })

      const transactions = [...responseIncome.data, ...responseExpense.data]

      setTransactions(transactions)
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
