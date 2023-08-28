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
    default:
      return state
  }
}
