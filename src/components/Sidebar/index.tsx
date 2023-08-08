import * as S from './styles'
import { useState } from 'react'
import { List, PresentationChart, X } from 'phosphor-react'
import { NavItem } from './components/NavItem'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
          title="Login teste"
          isMenuOpen={isOpen}
          icon={<X size={30} />}
          redirectTo="/login"
        />

        <NavItem
          title="Transações"
          isMenuOpen={isOpen}
          icon={<X size={30} />}
          redirectTo="/transactions"
        />
      </S.NavBarContainer>
    </S.SidebarContainer>
  )
}
