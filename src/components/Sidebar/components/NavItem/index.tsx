import { useState } from 'react'
import * as S from './styles'

interface NavItemProps {
  title: string
  redirectTo: string
  isMenuOpen: boolean
  icon: React.ReactNode
  onClick?: () => void
}

export function NavItem({
  icon,
  title,
  redirectTo,
  isMenuOpen,
  onClick,
}: NavItemProps) {
  return (
    <S.NavItemContainer>
      <S.NavLink to={redirectTo} onClick={onClick}>
        {icon}
        {isMenuOpen ? (
          <S.NavTitle
            className={isMenuOpen ? 'nav-title-appear' : 'nav-title-disappear'}
          >
            {title}
          </S.NavTitle>
        ) : (
          ''
        )}
      </S.NavLink>
    </S.NavItemContainer>
  )
}
