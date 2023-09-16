import { Planning } from '../../@types/mockes'
import { ActionTypesToPlanning } from './action'

interface PlanningsState {
  plannings: Planning[]
}

function removePlanningCategoryFromMainPlanning(
  planning: Planning,
  planningCategoryToRemove: string,
) {
  return {
    ...planning,
    planningsByCategory: planning.planningsByCategory.filter(
      (planningCategory) => planningCategory.id !== planningCategoryToRemove,
    ),
  }
}

export function planningsReducer(state: PlanningsState, action: any) {
  switch (action.type) {
    case ActionTypesToPlanning.FETCH_PLANNINGS:
      return {
        ...state,
        plannings: [...action.payload.plannings],
      }
    case ActionTypesToPlanning.DELETE_PLANNING_CATEGORY_BY_ID: {
      const { planningId, planningCategoryIdToRemove } = action.payload

      const newPlannings = state.plannings.map((planning) => {
        if (planning.id === planningId) {
          return removePlanningCategoryFromMainPlanning(
            planning,
            planningCategoryIdToRemove,
          )
        }
        return planning
      })

      return {
        ...state,
        plannings: newPlannings,
      }
    }
    default:
      return state
  }
}
