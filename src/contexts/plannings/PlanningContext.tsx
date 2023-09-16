import { Planning } from '../../@types/mockes'
import { createContext } from 'use-context-selector'

export interface PlanningProps {
  goal: number
  month: string
}

export interface PlanningsByCategoryProps {
  category_uuid: string
  goal: number
}

interface PlanningContextType {
  plannings: Planning[]
  fetchPlannings: () => void
  createNewPlanning: (
    planning: PlanningProps,
    planningsByCategory: PlanningsByCategoryProps[],
  ) => void
  deletePlanningCategory: (
    planningId: string,
    planningCategoryIdToRemove: string,
  ) => void
  updatePlanningByCategory: (data: PlanningsByCategoryProps) => void
}

export const PlanningContext = createContext({} as PlanningContextType)
