import {
  X,
  List,
  SignOut,
  ListBullets,
  PresentationChart,
  Target,
} from 'phosphor-react'
import * as S from './styles'
import { useState } from 'react'
import { NavItem } from './components/NavItem'
import { useAuth } from '../../contexts/auth/AuthProvider'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { signOut } = useAuth()
  function handleToggleMenuBar() {
    setIsOpen((state) => !state)
  }

  return (
    <S.SidebarContainer variant={isOpen.toString()}>
      <S.DropdownMenuButton onClick={handleToggleMenuBar}>
        {isOpen ? <X size={24} /> : <List size={24} />}
      </S.DropdownMenuButton>

      <S.NavBarContainer variant={isOpen.toString()}>
        <NavItem
          redirectTo="/"
          title="Dashboard"
          isMenuOpen={isOpen}
          icon={<PresentationChart size={30} />}
        />

        <NavItem
          title="Transações"
          isMenuOpen={isOpen}
          icon={<ListBullets size={30} />}
          redirectTo="/transactions"
        />

        <NavItem
          title="Objetivos"
          redirectTo="/objectives"
          isMenuOpen={isOpen}
          icon={<Target size={30} />}
        />

        <NavItem
          title="Sair"
          redirectTo="/"
          isMenuOpen={isOpen}
          icon={<SignOut size={30} />}
          onClick={signOut}
        />
      </S.NavBarContainer>
    </S.SidebarContainer>
  )
}
