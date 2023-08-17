import {
  Plus,
  ArrowCircleUp,
  CurrencyDollar,
  ArrowCircleDown,
  Hourglass,
} from 'phosphor-react'
import * as S from './styles'
import { Menu } from '../../components/Menu'
import { useIncomesSummary } from '../../hooks/useIncomesSummary'
import { Summary } from '../../components/Summary'

export function Incomes() {
  const summary = useIncomesSummary()

  const cardsToSummary = [
    {
      title: 'Pendentes',
      icon: <Hourglass size={32} color="#FFA500" />,
      value: summary.pendentes,
    },
    {
      title: 'Recebidas',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: summary.recebidas,
    },
    {
      title: 'Previsto',
      icon: <CurrencyDollar size={32} color="#fff" />,
      value: summary.previsto,
    },
  ]

  return (
    <S.IncomesContainer>
      <S.IncomesHeader>
        <Menu initialIndexSelected={1} />

        <S.NewIncomeButton>
          <Plus size={18} />
          Nova receita
        </S.NewIncomeButton>
      </S.IncomesHeader>
      <Summary cards={cardsToSummary} />
    </S.IncomesContainer>
  )
}
