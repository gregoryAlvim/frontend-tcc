import { apiPrivate } from '../../lib/axios'
import { Expense } from '../../@types/mockes'
import { ExpenseContext } from './ExpenseContext'
import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'
import { expensesReducer } from '../../reducers/expenses/reducer'
import { fetchExpensesAction } from '../../reducers/expenses/actions'
import { ToastMessages } from '../../utils/ToastMessages'

interface ExpenseProviderProps {
  children: ReactNode
}

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, {
    expenses: [],
  })

  const { expenses } = expensesState

  const fetchExpenses = useCallback(async (month?: string, year?: string) => {
    try {
      const response = await apiPrivate.get('expenses/get-all', {
        params: {
          month,
          year,
        },
      })

      dispatch(fetchExpensesAction(response.data))
    } catch (error: any) {
      if (error.response.status) {
        ToastMessages.showToastError(error.response.data.message)
      } else {
        ToastMessages.showToastError('Algo deu errado, tente novamente!')
      }
    }
  }, [])

  async function createNewExpense(data: Expense) {
    const { value, description, category, date, isPay } = data

    const response = await apiPrivate.post('expenses/create-expense', {
      category_uuid: category.id,
      description,
      isPay,
      value,
      date,
    })

    ToastMessages.showToastSuccess(response.data.message)

    fetchExpenses()
  }

  async function updateExpense(data: Expense) {
    const { id, value, description, category, date, isPay } = data

    const response = await apiPrivate.patch(
      `expenses/update-expense-by/${id}`,
      {
        category_uuid: category.id,
        description,
        isPay,
        value,
        date,
      },
    )

    ToastMessages.showToastSuccess(response.data.message)

    fetchExpenses()
  }

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  return (
    <ExpenseContext.Provider
      value={{ expenses, fetchExpenses, createNewExpense, updateExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
