import { apiPrivate } from '../../lib/axios'
import {
  PlanningContext,
  PlanningProps,
  PlanningsByCategoryProps,
} from './PlanningContext'
import { ToastMessages } from '../../utils/ToastMessages'
import { planningsReducer } from '../../reducers/plannings/reducer'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { fetchPlanningsAction } from '../../reducers/plannings/action'
import { Planning } from '../../@types/mockes'

interface PlanningProviderProps {
  children: ReactNode
}

export function PlanningProvider({ children }: PlanningProviderProps) {
  const [planningsState, dispatch] = useReducer(planningsReducer, {
    plannings: [],
  })

  const { plannings } = planningsState

  const fetchPlannings = useCallback(async () => {
    try {
      const response = await apiPrivate.get('plannings/get-all')

      dispatch(fetchPlanningsAction(response.data))
    } catch (error: any) {
      if (error.response.status) {
        ToastMessages.showToastError(error.response.data.message)
      } else {
        ToastMessages.showToastError('Algo deu errado, tente novamente!')
      }
    }
  }, [])

  async function createNewPlanning(
    planning: PlanningProps,
    planningsByCategory: PlanningsByCategoryProps[],
  ) {
    const response = await apiPrivate.post('plannings/create-planning', {
      ...planning,
      planningsByCategory,
    })

    ToastMessages.showToastSuccess(response.data.message)

    fetchPlannings()
  }

  useEffect(() => {
    fetchPlannings()
  }, [fetchPlannings])

  return (
    <PlanningContext.Provider
      value={{ plannings, fetchPlannings, createNewPlanning }}
    >
      {children}
    </PlanningContext.Provider>
  )
}
