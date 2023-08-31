import { apiPrivate } from '../../lib/axios'
import { Income } from '../../@types/mockes'
import {
  deleteIncomeAction,
  fetchIncomesAction,
} from '../../reducers/incomes/actions'
import { IncomeContext } from './IncomeContext'
import { ToastMessages } from '../../utils/ToastMessages'
import { incomesReducer } from '../../reducers/incomes/reducer'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'

interface IncomeProviderProps {
  children: ReactNode
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
        ToastMessages.showToastError(error.response.data.message)
      } else {
        ToastMessages.showToastError('Algo deu errado, tente novamente!')
      }
    }
  }, [])

  async function createNewIncome(data: Income) {
    const { value, description, category, date, isReceived } = data

    const response = await apiPrivate.post('incomes/create-income', {
      category_uuid: category.id,
      description,
      isReceived,
      value,
      date,
    })

    ToastMessages.showToastSuccess(response.data.message)

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

    ToastMessages.showToastSuccess(response.data.message)

    fetchIncomes()
  }

  async function deleteIncome(incomeId: string) {
    const response = await apiPrivate.delete(
      `/incomes/delete-income-by/${incomeId}`,
    )

    dispatch(deleteIncomeAction(incomeId))

    ToastMessages.showToastSuccess(response.data.message)
  }

  useEffect(() => {
    fetchIncomes()
  }, [fetchIncomes])

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        fetchIncomes,
        createNewIncome,
        updateIncome,
        deleteIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  )
}
