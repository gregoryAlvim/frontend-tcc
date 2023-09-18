import {
  PlanningProps,
  PlanningContext,
  PlanningsByCategoryProps,
} from './PlanningContext'
import {
  fetchPlanningsAction,
  deletePlanningCategoryAction,
} from '../../reducers/plannings/action'
import { apiPrivate } from '../../lib/axios'
import { ToastMessages } from '../../utils/ToastMessages'
import { planningsReducer } from '../../reducers/plannings/reducer'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { PlanningByCategory } from '../../@types/mockes'
import { id } from 'date-fns/locale'
import { date } from 'zod'

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

  async function updatePlanningByCategory(
    subPlanningId: string,
    data: PlanningsByCategoryProps,
  ) {
    console.log(data)
    const response = await apiPrivate.patch(
      `plannings-by-category/update-planning-by-category-by/${subPlanningId}`,
      {
        goal: data.goal,
        category_uuid: data.category_uuid,
      },
    )

    ToastMessages.showToastSuccess(response.data.message)

    fetchPlannings()
  }

  async function deletePlanningCategory(
    planningId: string,
    planningCategoryIdToRemove: string,
  ) {
    const response = await apiPrivate.delete(
      `plannings-by-category/delete-planning-by-category-by/${planningCategoryIdToRemove}`,
    )

    dispatch(
      deletePlanningCategoryAction(planningId, planningCategoryIdToRemove),
    )

    ToastMessages.showToastSuccess(response.data.message)
  }

  useEffect(() => {
    fetchPlannings()
  }, [fetchPlannings])

  return (
    <PlanningContext.Provider
      value={{
        plannings,
        fetchPlannings,
        createNewPlanning,
        deletePlanningCategory,
        updatePlanningByCategory,
      }}
    >
      {children}
    </PlanningContext.Provider>
  )
}
