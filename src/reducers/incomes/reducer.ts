import { Income } from '../../@types/mockes'
import { ActionTypesToIncome } from './actions'

interface IncomesState {
  incomes: Income[]
}

export function incomesReducer(state: IncomesState, action: any) {
  switch (action.type) {
    case ActionTypesToIncome.FETCH_INCOMES:
      return {
        ...state,
        incomes: [...action.payload.incomes],
      }
    case ActionTypesToIncome.DELETE_INCOME:
      return {
        ...state,
        incomes: [
          ...state.incomes.filter(
            (income) => income.id !== action.payload.incomeId,
          ),
        ],
      }
    default:
      return state
  }
}
