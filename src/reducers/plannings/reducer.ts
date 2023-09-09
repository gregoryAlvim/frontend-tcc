import { Planning } from '../../@types/mockes'
import { ActionTypesToPlanning } from './action'

interface PlanningsState {
  plannings: Planning[]
}

export function planningsReducer(state: PlanningsState, action: any) {
  switch (action.type) {
    case ActionTypesToPlanning.FETCH_PLANNINGS:
      return {
        ...state,
        plannings: [...action.payload.plannings],
      }
    case ActionTypesToPlanning.DELETE_PLANNING:
      return {
        ...state,
        plannings: [
          ...state.plannings.filter(
            (planning) => planning.id !== action.payload.planningId,
          ),
        ],
      }
    default:
      return state
  }
}
