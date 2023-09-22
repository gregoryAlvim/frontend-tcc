import { useIncomesSummary } from './useIncomesSummary'
import { useExpensesSummary } from './useExpenseSummary'
import { useContextSelector } from 'use-context-selector'
import { IncomeContext } from '../contexts/income/IncomeContext'
import { ExpenseContext } from '../contexts/expense/ExpenseContext'

export function useSummary() {
  const fetchExpenses = useContextSelector(ExpenseContext, (context) => {
    return context.fetchExpenses
  })

  const fetchIncomes = useContextSelector(IncomeContext, (context) => {
    return context.fetchIncomes
  })

  function fetchTransactions(month: string, year: string) {
    fetchExpenses(month, year)
    fetchIncomes(month, year)
  }

  const summaryIncome = useIncomesSummary()
  const summaryExpense = useExpensesSummary()

  const summary = {
    income: summaryIncome.previsto,
    expense: summaryExpense.previsto,
    total: summaryIncome.previsto - summaryExpense.previsto,
  }

  return {
    summary,
    fetchTransactions,
  }
}
