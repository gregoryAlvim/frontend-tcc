import { Dashboard } from '../pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Transactions } from '../pages/Transactions'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { TransactionsProvider } from '../contexts/transactions/TransactionsProvider'
import { Incomes } from '../pages/Incomes'
import { Expenses } from '../pages/Expenses'
import { IncomeProvider } from '../contexts/income/IncomeProvider'
import { ExpenseProvider } from '../contexts/expense/ExpenseProvider'

export function AppRoutes() {
  return (
    <TransactionsProvider>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route
            path="/transactions/receitas"
            element={
              <IncomeProvider>
                <Incomes />
              </IncomeProvider>
            }
          />
          <Route
            path="/transactions/despesas"
            element={
              <ExpenseProvider>
                <Expenses />
              </ExpenseProvider>
            }
          />
        </Route>
      </Routes>
    </TransactionsProvider>
  )
}
