import {
  deleteObjectiveAction,
  fetchObjectivesAction,
} from '../../reducers/objectives/actions'
import { apiPrivate } from '../../lib/axios'
import { ObjectiveContext } from './ObjectiveContext'
import { ToastMessages } from '../../utils/ToastMessages'
import { objectivesReducer } from '../../reducers/objectives/reducer'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { ObjectivePreview, Suggestion } from '../../@types/mockes'

interface ObjectiveProviderProps {
  children: ReactNode
}

export function ObjectiveProvider({ children }: ObjectiveProviderProps) {
  const [objectivesState, dispatch] = useReducer(objectivesReducer, {
    objectives: [],
  })

  const { objectives } = objectivesState

  const fetchObjectives = useCallback(async () => {
    try {
      const response = await apiPrivate.get('objectives/get-all')

      dispatch(fetchObjectivesAction(response.data))
    } catch (error: any) {
      if (error.response.status) {
        ToastMessages.showToastError(error.response.data.message)
      } else {
        ToastMessages.showToastError('Algo deu errado, tente novamente!')
      }
    }
  }, [])

  async function createNewObjective(
    preObjective: ObjectivePreview,
    suggestion: Suggestion,
  ) {
    const response = await apiPrivate.post('objectives/create-objective', {
      ...preObjective,
      suggestion,
    })

    ToastMessages.showToastSuccess(response.data.message)

    fetchObjectives()
  }

  async function deleteObjective(objectiveId: string) {
    const response = await apiPrivate.delete(
      `/objectives/delete-objective-by/${objectiveId}`,
    )

    dispatch(deleteObjectiveAction(objectiveId))

    ToastMessages.showToastSuccess(response.data.message)
  }

  useEffect(() => {
    fetchObjectives()
  }, [fetchObjectives])

  return (
    <ObjectiveContext.Provider
      value={{
        objectives,
        fetchObjectives,
        createNewObjective,
        deleteObjective,
      }}
    >
      {children}
    </ObjectiveContext.Provider>
  )
}
