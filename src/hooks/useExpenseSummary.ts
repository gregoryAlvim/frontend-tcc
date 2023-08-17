import { useContextSelector } from 'use-context-selector'
import { ExpenseContext } from '../contexts/expense/ExpenseContext'

export function useExpensesSummary() {
  const expenses = useContextSelector(ExpenseContext, (context) => {
    return context.expenses
  })

  const summary = expenses?.reduce(
    (acc, expense) => {
      if (expense.isPay) {
        acc.pagas += expense.value
        acc.previsto += expense.value
      } else {
        acc.pendentes += expense.value
        acc.previsto += expense.value
      }

      return acc
    },
    { pendentes: 0, pagas: 0, previsto: 0 },
  )

  return summary
}
