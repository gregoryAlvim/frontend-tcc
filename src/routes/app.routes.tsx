import Compose from '../contexts/Compose'
import { Incomes } from '../pages/Incomes'
import { Expenses } from '../pages/Expenses'
import { Dashboard } from '../pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Objectives } from '../pages/Objectives'
import { Transactions } from '../pages/Transactions'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { IncomeProvider } from '../contexts/income/IncomeProvider'
import { ExpenseProvider } from '../contexts/expense/ExpenseProvider'
import { CategoriesProvider } from '../contexts/categories/CategoriesProvider'
import { TransactionsProvider } from '../contexts/transactions/TransactionsProvider'
import { ObjectiveProvider } from '../contexts/objectives/ObjectiveProvider'
import { Plannings } from '../pages/Plannings'
import { Configs } from '../pages/Configs'

export function AppRoutes() {
  return (
    <Compose components={[TransactionsProvider, CategoriesProvider]}>
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
          <Route
            path="/objectives"
            element={
              <ObjectiveProvider>
                <Objectives />
              </ObjectiveProvider>
            }
          />
          <Route path="/plannings" element={<Plannings />} />
          <Route path="/configs" element={<Configs />} />
        </Route>
      </Routes>
    </Compose>
  )
}
