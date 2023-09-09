import { apiPrivate } from '../../lib/axios'
import { PlanningContext } from './PlanningContext'
import { ToastMessages } from '../../utils/ToastMessages'
import { planningsReducer } from '../../reducers/plannings/reducer'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { fetchPlanningsAction } from '../../reducers/plannings/action'

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

  useEffect(() => {
    fetchPlannings()
  }, [fetchPlannings])

  return (
    <PlanningContext.Provider value={{ plannings, fetchPlannings }}>
      {children}
    </PlanningContext.Provider>
  )
}
