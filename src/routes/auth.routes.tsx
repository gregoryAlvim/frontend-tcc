import { SignIn } from '../pages/SignIn'
import { Routes, Route } from 'react-router-dom'
import { SignUp } from '../pages/SignUp'

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/cadastro" element={<SignUp />} />
    </Routes>
  )
}
