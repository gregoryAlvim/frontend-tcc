import { Expense } from '../../@types/mockes'

export enum ActionTypesToExpense {
  FETCH_EXPENSES = 'FETCH_EXPENSES',
  DELETE_EXPENSE = 'DELETE_EXPENSE',
}

export function fetchExpensesAction(expenses: Expense[]) {
  return {
    type: ActionTypesToExpense.FETCH_EXPENSES,
    payload: {
      expenses,
    },
  }
}

export function deleteExpenseAction(expenseId: string) {
  return {
    type: ActionTypesToExpense.DELETE_EXPENSE,
    payload: {
      expenseId,
    },
  }
}
