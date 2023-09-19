import { Outlet } from 'react-router-dom'
import { LayoutContainer, OutletContainer } from './styles'
import { Sidebar } from '../components/Sidebar'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Sidebar />

      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </LayoutContainer>
  )
}
