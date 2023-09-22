import { useState } from 'react'
import * as S from './styles'

interface NavItemProps {
  title: string
  variant?: boolean
  redirectTo: string
  isMenuOpen: boolean
  onClick?: () => void
  icon: React.ReactNode
}

export function NavItem({
  icon,
  title,
  variant,
  onClick,
  redirectTo,
  isMenuOpen,
}: NavItemProps) {
  return (
    <S.NavItemContainer>
      <S.NavLink to={redirectTo} onClick={onClick} variant={`${variant}`}>
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
