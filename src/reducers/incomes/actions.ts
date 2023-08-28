import { Income } from '../../@types/mockes'

export enum ActionTypesToIncome {
  FETCH_INCOMES = 'FETCH_INCOMES',
  ADD_NEW_INCOME = 'ADD_NEW_INCOME',
}

export function fetchIncomesAction(incomes: Income[]) {
  return {
    type: ActionTypesToIncome.FETCH_INCOMES,
    payload: {
      incomes,
    },
  }
}
