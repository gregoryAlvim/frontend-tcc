import { useContextSelector } from 'use-context-selector'
import { ObjectiveContext } from '../contexts/objectives/ObjectiveContext'

export function useObjectivesSummary() {
  const objectives = useContextSelector(ObjectiveContext, (context) => {
    return context.objectives
  })

  const summary = objectives?.reduce(
    (acc, objective) => {
      acc.previsto += objective.goal
      if (objective.isActivated === true) {
        acc.ativos += 1
      }

      for (let i = 0; i < objective.parcels.length; i++) {
        if (objective.parcels[i].isPaid === true) {
          acc.realizado += objective.parcels[i].value
        }
      }

      return acc
    },
    { ativos: 0, realizado: 0, previsto: 0 },
  )
  return summary
}
