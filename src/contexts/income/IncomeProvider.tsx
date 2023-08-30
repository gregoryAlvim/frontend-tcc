import { toast } from 'react-toastify'
import { apiPrivate } from '../../lib/axios'
import { IncomeContext } from './IncomeContext'
import { incomesReducer } from '../../reducers/incomes/reducer'
import { fetchIncomesAction } from '../../reducers/incomes/actions'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { Income } from '../../@types/mockes'

interface IncomeProviderProps {
  children: ReactNode
}

function showToastError(message: string) {
  toast.error(message)
}

export function IncomeProvider({ children }: IncomeProviderProps) {
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

  async function createNewIncome(data: Income) {
    const { value, description, category, date, isReceived } = data

    await apiPrivate.post('incomes/create-income', {
      category_uuid: category.id,
      description,
      isReceived,
      value,
      date,
    })

    fetchIncomes()
  }

  async function updateIncome(data: Income) {
    const { id, value, description, category, date, isReceived } = data

    const response = await apiPrivate.patch(`incomes/update-income-by/${id}`, {
      category_uuid: category.id,
      description,
      isReceived,
      value,
      date,
    })

    toast.success(response.data.message)

    fetchIncomes()
  }

  useEffect(() => {
    fetchIncomes()
  }, [fetchIncomes])

  return (
    <IncomeContext.Provider
      value={{ incomes, fetchIncomes, createNewIncome, updateIncome }}
    >
      {children}
    </IncomeContext.Provider>
  )
}
