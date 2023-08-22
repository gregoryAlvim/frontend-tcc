import { toast } from 'react-toastify'
import { apiPrivate } from '../../lib/axios'
import { IncomeContext } from './IncomeContext'
import { incomesReducer } from '../../reducers/incomes/reducer'
import { fetchIncomesAction } from '../../reducers/incomes/actions'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'

interface IncomeProviderProps {
  children: ReactNode
}

function showToastError(message: string) {
  toast.error(message)
}

export function IncomeProvider({ children }: IncomeProviderProps) {
  // const [incomes, setIncomes] = useState<Income[]>([])

  const [incomesState, dispatch] = useReducer(incomesReducer, {
    incomes: [],
  })

  const { incomes } = incomesState

  const fetchIncomes = useCallback(async (month?: string, year?: string) => {
    try {
      const response = await apiPrivate.get('incomes/get-all', {
        params: {
          month,
          year,
        },
      })

      dispatch(fetchIncomesAction(response.data))
    } catch (error: any) {
      if (error.response.status) {
        showToastError(error.response.data.message)
      } else {
        showToastError('Algo deu errado, tente novamente!')
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
