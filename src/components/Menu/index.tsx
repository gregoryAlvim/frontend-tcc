import * as S from './styles'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Separator from '@radix-ui/react-separator'

interface MenuProps {
  initialIndexSelected: number
}

export function Menu({ initialIndexSelected }: MenuProps) {
  const [isSelected, setIsSelected] = useState(initialIndexSelected)

  const navItemKeys = [0, 1, 2]
  function handleItemClick(index: number) {
    setIsSelected(index)
  }

  return (
    <S.TransactionsMenu>
      <Link to="/transactions">
        <S.TransactionsNavItem
          key={navItemKeys[0]}
          variante={`${isSelected === navItemKeys[0]}`}
          onClick={() => handleItemClick(navItemKeys[0])}
        >
          Transações
        </S.TransactionsNavItem>
      </Link>
      <Separator.Root className="SeparatorRoot" orientation="vertical" />
      <Link to="/transactions/receitas">
        <S.TransactionsNavItem
          key={navItemKeys[1]}
          variante={`${isSelected === navItemKeys[1]}`}
          onClick={() => handleItemClick(navItemKeys[1])}
        >
          Receitas
        </S.TransactionsNavItem>
      </Link>
      <Separator.Root className="SeparatorRoot" orientation="vertical" />
      <Link to="/transactions/despesas">
        <S.TransactionsNavItem
          key={navItemKeys[2]}
          variante={`${isSelected === navItemKeys[2]}`}
          onClick={() => handleItemClick(navItemKeys[2])}
        >
          Despesas
        </S.TransactionsNavItem>
      </Link>
    </S.TransactionsMenu>
  )
}
