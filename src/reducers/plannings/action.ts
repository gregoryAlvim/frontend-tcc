import { Planning } from '../../@types/mockes'

export enum ActionTypesToPlanning {
  FETCH_PLANNINGS = 'FETCH_PLANNINGS',
  DELETE_PLANNING = 'DELETE_PLANNING',
}

export function fetchPlanningsAction(plannings: Planning[]) {
  return {
    type: ActionTypesToPlanning.FETCH_PLANNINGS,
    payload: {
      plannings,
    },
  }
}

export function deletePlanningAction(planningId: string) {
  return {
    type: ActionTypesToPlanning.DELETE_PLANNING,
    payload: {
      planningId,
    },
  }
}
