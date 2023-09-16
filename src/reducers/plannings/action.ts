import { Planning } from '../../@types/mockes'

export enum ActionTypesToPlanning {
  FETCH_PLANNINGS = 'FETCH_PLANNINGS',
  DELETE_PLANNING_CATEGORY_BY_ID = 'DELETE_PLANNING',
}

export function fetchPlanningsAction(plannings: Planning[]) {
  return {
    type: ActionTypesToPlanning.FETCH_PLANNINGS,
    payload: {
      plannings,
    },
  }
}

export function deletePlanningCategoryAction(
  planningId: string,
  planningCategoryIdToRemove: string,
) {
  return {
    type: ActionTypesToPlanning.DELETE_PLANNING_CATEGORY_BY_ID,
    payload: {
      planningId,
      planningCategoryIdToRemove,
    },
  }
}
