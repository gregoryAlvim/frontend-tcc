import { useContextSelector } from 'use-context-selector'
import { IncomeContext } from '../contexts/income/IncomeContext'
import { ExpenseContext } from '../contexts/expense/ExpenseContext'
import { TransactionsContext } from '../contexts/transactions/TransactionsContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = transactions?.reduce(
    (acc, transaction) => {
      if (transaction.category.type === 'income') {
        acc.income += transaction.value
        acc.total += transaction.value
      } else {
        acc.expense += transaction.value
        acc.total -= transaction.value
      }

      return acc
    },
    { income: 0, expense: 0, total: 0 },
  )

  return summary
}
