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
import { DatePickerProvider } from '../contexts/transactions/DatePickerProvider'

export function AppRoutes() {
  return (
    <Compose
      components={[
        DatePickerProvider,
        CategoriesProvider,
        IncomeProvider,
        ExpenseProvider,
      ]}
    >
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route
            path="/"
            element={
              <PlanningProvider>
                <Dashboard />
              </PlanningProvider>
            }
          />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/receitas" element={<Incomes />} />
          <Route path="/transactions/despesas" element={<Expenses />} />
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
                <Plannings />
              </PlanningProvider>
            }
          />
          <Route path="/configs" element={<Configs />} />
        </Route>
      </Routes>
    </Compose>
  )
}
