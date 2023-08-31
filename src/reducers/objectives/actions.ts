import { Objective } from '../../@types/mockes'

export enum ActionTypesToObjective {
  FETCH_OBJECTIVES = 'FETCH_OBJECTIVES',
  DELETE_OBJECTIVE = 'DELETE_OBJECTIVE',
}

export function fetchObjectivesAction(objectives: Objective[]) {
  return {
    type: ActionTypesToObjective.FETCH_OBJECTIVES,
    payload: {
      objectives,
    },
  }
}

export function deleteObjectiveAction(objectiveId: string) {
  return {
    type: ActionTypesToObjective.DELETE_OBJECTIVE,
    payload: {
      objectiveId,
    },
  }
}
