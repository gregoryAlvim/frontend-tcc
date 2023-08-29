import { Expense } from '../../@types/mockes'

export enum ActionTypesToExpense {
  FETCH_EXPENSES = 'FETCH_EXPENSES',
}

export function fetchExpensesAction(expenses: Expense[]) {
  return {
    type: ActionTypesToExpense.FETCH_EXPENSES,
    payload: {
      expenses,
    },
  }
}
