import { apiPrivate } from '../../lib/axios'
import { ObjectiveContext } from './ObjectiveContext'
import { ToastMessages } from '../../utils/ToastMessages'
import { objectivesReducer } from '../../reducers/objectives/reducer'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { fetchObjectivesAction } from '../../reducers/objectives/actions'

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

  useEffect(() => {
    fetchObjectives()
  }, [fetchObjectives])

  return (
    <ObjectiveContext.Provider value={{ objectives, fetchObjectives }}>
      {children}
    </ObjectiveContext.Provider>
  )
}
