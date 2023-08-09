import { SignIn } from '../pages/SignIn'
import { Routes, Route } from 'react-router-dom'

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  )
}
