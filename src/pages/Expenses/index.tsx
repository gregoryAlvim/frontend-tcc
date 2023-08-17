import * as S from './styles'
import { Menu } from '../../components/Menu'
import { useExpensesSummary } from '../../hooks/useExpenseSummary'
import { ArrowCircleUp, CurrencyDollar, Hourglass, Plus } from 'phosphor-react'
import { Summary } from '../../components/Summary'

export function Expenses() {
  const summary = useExpensesSummary()

  const cardsToSummary = [
    {
      title: 'Pendentes',
      icon: <Hourglass size={32} color="#F75A68" />,
      value: summary.pendentes,
    },
    {
      title: 'Pagas',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: summary.pagas,
    },
    {
      title: 'Previsto',
      icon: <CurrencyDollar size={32} color="#fff" />,
      value: summary.previsto,
    },
  ]

  return (
    <S.ExpensesContainer>
      <S.ExpensesHeader>
        <Menu initialIndexSelected={2} />

        <S.NewExpenseButton>
          <Plus size={18} />
          Nova despesa
        </S.NewExpenseButton>
      </S.ExpensesHeader>

      <Summary cards={cardsToSummary} />
    </S.ExpensesContainer>
  )
}
