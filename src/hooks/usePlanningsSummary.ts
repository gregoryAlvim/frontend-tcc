import { useIncomesSummary } from './useIncomesSummary'
import { useExpensesSummary } from './useExpenseSummary'
import { useContextSelector } from 'use-context-selector'
import { ExpenseContext } from '../contexts/expense/ExpenseContext'
import { IncomeContext } from '../contexts/income/IncomeContext'

export function usePlanningsSummary() {
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

  const incomesSummary = useIncomesSummary()

  return {
    incomesSummary,
    fetchTransactions,
  }
}
