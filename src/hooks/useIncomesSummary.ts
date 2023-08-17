import { useContextSelector } from 'use-context-selector'
import { IncomeContext } from '../contexts/income/IncomeContext'

export function useIncomesSummary() {
  const incomes = useContextSelector(IncomeContext, (context) => {
    return context.incomes
  })

  const summary = incomes?.reduce(
    (acc, income) => {
      if (income.isReceived) {
        acc.recebidas += income.value
        acc.previsto += income.value
      } else {
        acc.pendentes += income.value
        acc.previsto += income.value
      }

      return acc
    },
    { pendentes: 0, recebidas: 0, previsto: 0 },
  )

  return summary
}
