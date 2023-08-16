import { apiPrivate } from '../../lib/axios'
import { Expense } from '../../@types/mockes'
import { ExpenseContext } from './ExpenseContext'
import { ReactNode, useCallback, useEffect, useState } from 'react'

interface ExpenseProviderProps {
  children: ReactNode
}

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const fetchExpenses = useCallback(async (month?: string, year?: string) => {
    const response = await apiPrivate.get('expenses/get-all', {
      params: {
        month,
        year,
      },
    })

    setExpenses(response.data)
  }, [])

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  return (
    <ExpenseContext.Provider value={{ expenses, fetchExpenses }}>
      {children}
    </ExpenseContext.Provider>
  )
}
