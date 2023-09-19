import Compose from '../contexts/Compose'
import { Configs } from '../pages/Configs'
import { Incomes } from '../pages/Incomes'
import { Expenses } from '../pages/Expenses'
import { Dashboard } from '../pages/Dashboard'
import { Plannings } from '../pages/Plannings'
import { Route, Routes } from 'react-router-dom'
import { Objectives } from '../pages/Objectives'
import { Transactions } from '../pages/Transactions'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { IncomeProvider } from '../contexts/income/IncomeProvider'
import { ExpenseProvider } from '../contexts/expense/ExpenseProvider'
import { PlanningProvider } from '../contexts/plannings/PlanningProvider'
import { ObjectiveProvider } from '../contexts/objectives/ObjectiveProvider'
import { CategoriesProvider } from '../contexts/categories/CategoriesProvider'
import { TransactionsProvider } from '../contexts/transactions/TransactionsProvider'

export function AppRoutes() {
  return (
    <Compose components={[TransactionsProvider, CategoriesProvider]}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route
            path="/"
            element={
              <PlanningProvider>
                <ExpenseProvider>
                  <Dashboard />
                </ExpenseProvider>
              </PlanningProvider>
            }
          />
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
          <Route
            path="/plannings"
            element={
              <PlanningProvider>
                <IncomeProvider>
                  <ExpenseProvider>
                    <Plannings />
                  </ExpenseProvider>
                </IncomeProvider>
              </PlanningProvider>
            }
          />
          <Route path="/configs" element={<Configs />} />
        </Route>
      </Routes>
    </Compose>
  )
}
