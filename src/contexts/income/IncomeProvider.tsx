import { ReactNode, useCallback, useEffect, useState } from 'react'
import { IncomeContext } from './IncomeContext'
import { apiPrivate } from '../../lib/axios'
import { Income } from '../../@types/mockes'

interface IncomeProviderProps {
  children: ReactNode
}

export function IncomeProvider({ children }: IncomeProviderProps) {
  const [incomes, setIncomes] = useState<Income[]>([])

  const fetchIncomes = useCallback(async (month?: string, year?: string) => {
    const response = await apiPrivate.get('incomes/get-all', {
      params: {
        month,
        year,
      },
    })

    setIncomes(response.data)
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
