import { toast } from 'react-toastify'
import { apiPrivate } from '../../lib/axios'
import { Expense } from '../../@types/mockes'
import { ExpenseContext } from './ExpenseContext'
import { ReactNode, useCallback, useEffect, useState } from 'react'

interface ExpenseProviderProps {
  children: ReactNode
}

function showToastError(message: string) {
  toast.error(message)
}

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const fetchExpenses = useCallback(async (month?: string, year?: string) => {
    try {
      const response = await apiPrivate.get('expenses/get-all', {
        params: {
          month,
          year,
        },
      })

      setExpenses(response.data)
    } catch (error: any) {
      if (error.response.status) {
        showToastError(error.response.data.message)
      } else {
        showToastError(
          'Não foi possível acessar sua conta, tente novamente mais tarde!',
        )
      }
    }
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
