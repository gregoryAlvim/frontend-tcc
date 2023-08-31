import { Objective } from '../../@types/mockes'
import { ActionTypesToObjective } from './actions'

interface ObjectivesState {
  objectives: Objective[]
}

export function objectivesReducer(state: ObjectivesState, action: any) {
  switch (action.type) {
    case ActionTypesToObjective.FETCH_OBJECTIVES:
      return {
        ...state,
        objectives: [...action.payload.objectives],
      }
    case ActionTypesToObjective.DELETE_OBJECTIVE:
      return {
        ...state,
        objectives: [
          ...state.objectives.filter(
            (objective) => objective.id !== action.payload.objectiveId,
          ),
        ],
      }
    default:
      return state
  }
}
