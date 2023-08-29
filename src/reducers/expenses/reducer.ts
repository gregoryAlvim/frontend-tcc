import { Expense } from '../../@types/mockes'
import { ActionTypesToExpense } from './actions'

interface ExpensesState {
  expenses: Expense[]
}

export function expensesReducer(state: ExpensesState, action: any) {
  switch (action.type) {
    case ActionTypesToExpense.FETCH_EXPENSES:
      return {
        ...state,
        expenses: [...action.payload.expenses],
      }
    default:
      return state
  }
}
