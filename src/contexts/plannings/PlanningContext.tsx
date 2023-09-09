import { Planning } from '../../@types/mockes'
import { createContext } from 'use-context-selector'

interface PlanningContextType {
  plannings: Planning[]
  fetchPlannings: () => void
}

export const PlanningContext = createContext({} as PlanningContextType)
