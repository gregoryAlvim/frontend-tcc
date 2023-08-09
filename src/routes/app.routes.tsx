import { Dashboard } from '../pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Transactions } from '../pages/Transactions'
import { DefaultLayout } from '../layouts/DefaultLayout'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  )
}
