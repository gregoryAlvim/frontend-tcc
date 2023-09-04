import { createContext } from 'use-context-selector'
import { Objective, ObjectivePreview, Suggestion } from '../../@types/mockes'

interface ObjectiveContextType {
  objectives: Objective[]
  fetchObjectives: () => void
  createNewObjective: (
    preObjective: ObjectivePreview,
    suggestion: Suggestion,
  ) => void
  // updateIncome: (data: Income) => void
  // deleteIncome: (incomeId: string) => void
}

export const ObjectiveContext = createContext({} as ObjectiveContextType)
