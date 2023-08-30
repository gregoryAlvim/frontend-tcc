import { Income } from '../../@types/mockes'

export enum ActionTypesToIncome {
  FETCH_INCOMES = 'FETCH_INCOMES',
  DELETE_INCOME = 'DELETE_INCOME',
}

export function fetchIncomesAction(incomes: Income[]) {
  return {
    type: ActionTypesToIncome.FETCH_INCOMES,
    payload: {
      incomes,
    },
  }
}

export function deleteIncomeAction(incomeId: string) {
  return {
    type: ActionTypesToIncome.DELETE_INCOME,
    payload: {
      incomeId,
    },
  }
}
