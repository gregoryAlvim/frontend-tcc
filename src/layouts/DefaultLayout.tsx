import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles'
import { Sidebar } from '../components/Sidebar'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Sidebar />
      <Outlet />
    </LayoutContainer>
  )
}
