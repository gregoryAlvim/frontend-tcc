import { toast } from 'react-toastify'
import { Income } from '../../@types/mockes'
import { apiPrivate } from '../../lib/axios'
import { IncomeContext } from './IncomeContext'
import { ReactNode, useCallback, useEffect, useState } from 'react'

interface IncomeProviderProps {
  children: ReactNode
}

function showToastError(message: string) {
  toast.error(message)
}

export function IncomeProvider({ children }: IncomeProviderProps) {
  const [incomes, setIncomes] = useState<Income[]>([])

  const fetchIncomes = useCallback(async (month?: string, year?: string) => {
    try {
      const response = await apiPrivate.get('incomes/get-all', {
        params: {
          month,
          year,
        },
      })

      setIncomes(response.data)
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
    fetchIncomes()
  }, [fetchIncomes])

  return (
    <IncomeContext.Provider value={{ incomes, fetchIncomes }}>
      {children}
    </IncomeContext.Provider>
  )
}
