import { useExpensesSummary } from './useExpenseSummary'
import { useIncomesSummary } from './useIncomesSummary'

export function useSummary() {
  const summaryIncome = useIncomesSummary()
  const summaryExpense = useExpensesSummary()

  const summary = {
    income: summaryIncome.previsto,
    expense: summaryExpense.previsto,
    total: summaryIncome.previsto - summaryExpense.previsto,
  }

  return summary
}
