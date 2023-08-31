import { Objective } from '../../@types/mockes'
import { createContext } from 'use-context-selector'

interface ObjectiveContextType {
  objectives: Objective[]
  fetchObjectives: () => void
  // createNewIncome: (data: Income) => void
  // updateIncome: (data: Income) => void
  // deleteIncome: (incomeId: string) => void
}

export const ObjectiveContext = createContext({} as ObjectiveContextType)
